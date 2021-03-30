import './App.css';
import React, {Component} from "react";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import ELibraryService from "../../repository/libraryRepository"

import Header from "../Header/header";
import Categories from "../Categories/categories"
import Books from "../Books/BookList/bookList"
import BookAdd from "../Books/BookAdd/bookAdd";
import BookEdit from "../Books/BookEdit/bookEdit";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            authors: [],
            books: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                {/*Header*/}
                <Header/>

                <main>
                    <div className={"container"}>
                        <Route path={"/categories"} exact
                               render={() => <Categories categories={this.state.categories}/>}/>
                        <Route path={"/books/edit/:id"} exact
                               render={() => <BookEdit selectedBook={this.state.selectedBook}
                                                       categories={this.state.categories}
                                                       authors={this.state.authors} onBookEdit={this.editBook}/>}/>
                        <Route path={"/books/add"} exact
                               render={() => <BookAdd categories={this.state.categories} authors={this.state.authors}
                                                      onAddBook={this.addBook}/>}/>
                        <Route path={["/", "/books"]} exact
                               render={() => <Books books={this.state.books} onDelete={this.deleteBook}
                                                    onEdit={this.getBook} onMarkTaken={this.markTakenBook}/>}/>
                        <Redirect to={"/"}/>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadCategories();
        this.loadAuthors();
        this.loadBooks();
    }

    loadCategories = () => {
        ELibraryService.fetchCategories()
            .then((response) => {
                this.setState({
                    categories: response.data
                })
            });
    }

    loadAuthors = () => {
        ELibraryService.fetchAuthors()
            .then((response) => {
                this.setState({
                    authors: response.data
                })
            });
    }

    loadBooks = () => {
        ELibraryService.fetchBooks()
            .then((response) => {
                this.setState({
                    books: response.data
                })
            });
    }

    addBook = (name, category, authorId, availableCopies) => {
        ELibraryService.addBook(name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    deleteBook = (id) => {
        ELibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        ELibraryService.getBook(id)
            .then((response) => {
                this.setState({
                    selectedBook: response.data
                })
            });
    }
    editBook = (id, name, category, authorId, availableCopies) => {
        ELibraryService.editBook(id, name, category, authorId, availableCopies)
            .then(() => {
                this.loadBooks();
            });
    }

    markTakenBook = (id) => {
        ELibraryService.markTakenBook(id)
            .then(() => {
                this.loadBooks();
            });
    }
}

export default App;
