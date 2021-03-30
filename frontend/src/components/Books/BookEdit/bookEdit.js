import React from "react";
import {Link, useHistory} from "react-router-dom";

const BookEdit = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: "",
        authorId: 1,
        availableCopies: 0
    });

    const handleChange = (event) => {
        updateFormData({
            ...formData, [event.target.name]: event.target.value.trim()
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const name = formData.name !== "" ? formData.name : props.selectedBook.name;
        const category = formData.category !== "" ? formData.category : props.selectedBook.category;
        const authorId = formData.authorId !== 1 ? formData.authorId : props.selectedBook.author.id;
        const availableCopies = formData.availableCopies !== 0 ? formData.availableCopies : props.selectedBook.availableCopies;

        props.onBookEdit(props.selectedBook.id, name, category, authorId, availableCopies);
        history.push("/books");
    }

    return (
        <div className="container">
            <div className={"row mt-5"}>
                <div className={"col-12"}>
                    <h3>Edit this book</h3>
                </div>
            </div>
            <div className="row mt-3">
                <div className="col md-5">
                    <form onSubmit={onFormSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Book name</label>
                            <input type="text"
                                   id="name"
                                   name="name"
                                   className="form-control mb-2"
                                   placeholder={props.selectedBook.name}
                                   onChange={handleChange}/>
                            <label htmlFor="category">Category</label>
                            <select className="form-control mb-2" id="category" name="category" onChange={handleChange}>
                                {props.categories.map((category) => {
                                        if (props.selectedBook.category !== undefined && category === props.selectedBook.category)
                                            return <option value={category}
                                                           selected={props.selectedBook.category}>{category}</option>
                                        else
                                            return <option value={category}>{category}</option>
                                    }
                                )}
                            </select>
                            <label htmlFor="authorId">Author</label>
                            <select className="form-control mb-2" id="authorId" name="authorId" onChange={handleChange}>
                                {props.authors.map((author) => {
                                        if (props.selectedBook.author !== undefined && author.id === props.selectedBook.author.id)
                                            return <option value={author.id}
                                                           selected={props.selectedBook.author.id}>{author.name} {author.surname}</option>
                                        else
                                            return <option value={author.id}>{author.name} {author.surname}</option>
                                    }
                                )}
                            </select>
                            <label htmlFor="availableCopies">Available copies</label>
                            <input type="number"
                                   id="availableCopies"
                                   name="availableCopies"
                                   className="form-control mb-2"
                                   placeholder={props.selectedBook.availableCopies}
                                   onChange={handleChange}/>
                        </div>
                        <div className="mb-2">
                            <button type="submit" id="submit" className="btn btn-primary">Submit</button>
                        </div>
                        <div className="">
                            <Link type="button" className="btn btn-info btn-sm" to={"/books"}>Back</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default BookEdit;