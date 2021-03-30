import React, {Component} from "react";
import ReactPaginate from "react-paginate";
import BookItem from "../BookItem/bookItem"
import {Link} from "react-router-dom";

class Books extends Component {

    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            size: 5
        }
    }

    render() {

        const offset = this.state.page * this.state.size;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const books = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"container mt-4"}>
                <div className={"row mb-4 text-center"}>
                    <div className={"col-12"}>
                        <h3>All books in library</h3>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <table className={"table table-hover"}>
                            <thead className={"thead-dark"}>
                            <tr>
                                <th scope={"col"}/>
                                <th scope={"col"}>Name</th>
                                <th scope={"col"}>Category</th>
                                <th scope={"col"}>Author</th>
                                <th scope={"col"}>Available copies</th>
                                <th scope={"col"}/>
                            </tr>
                            </thead>
                            <tbody>
                            {books}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <ReactPaginate previousLabel={"back"}
                                       nextLabel={"next"}
                                       breakLabel={<a href="/#">...</a>}
                                       breakClassName={"break-me"}
                                       pageClassName={"ml-1 mr-1"}
                                       pageCount={pageCount}
                                       marginPagesDisplayed={2}
                                       pageRangeDisplayed={5}
                                       onPageChange={this.handlePageChange}
                                       containerClassName={"pagination m-4 justify-content-center"}
                                       activeClassName={"active"}/>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col-12"}>
                        <Link className={"btn btn-block btn-dark"} to={"/books/add"}>
                            Add new book
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    handlePageChange = (data) => {
        this.setState({
            page: data.selected
        });
    }

    getBooksPage = (offset, nextPageOffset) => {
        return (
            this.props.books.map((book) => {
                return (
                    <BookItem book={book} onDelete={this.props.onDelete} onEdit={this.props.onEdit}
                              onMarkTaken={this.props.onMarkTaken}/>
                );
            }).filter((book, index) => {
                return index >= offset && index < nextPageOffset;
            })
        );
    }
}

export default Books;