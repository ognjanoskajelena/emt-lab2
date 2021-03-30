import React from "react";
import {Link, useHistory} from "react-router-dom";

const BookAdd = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: props.categories[0],
        authorId: 1,
        availableCopies: 0
    });

    const handleChange = (event) => {
        updateFormData({
            ...formData,
            [event.target.name]: event.target.value.trim()
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();

        const name = formData.name;
        const category = formData.category;
        const authorId = formData.authorId;
        const availableCopies = formData.availableCopies;

        props.onAddBook(name, category, authorId, availableCopies);
        history.push("/books");
    }

    return (
        <div className="container">
            <div className={"row mt-5"}>
                <div className={"col-12"}>
                    <h3>Add new book</h3>
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
                                   placeholder="Enter book name"
                                   required
                                   onChange={handleChange}/>
                            <label htmlFor="category">Category</label>
                            <select className="form-control mb-2" id="category" name="category" onChange={handleChange}>
                                {props.categories.map((category) =>
                                    <option value={category}>{category}</option>
                                )}
                            </select>
                            <label htmlFor="authorId">Author</label>
                            <select className="form-control mb-2" id="authorId" name="authorId" onChange={handleChange}>
                                {props.authors.map((author) =>
                                    <option value={author.id}>{author.name} {author.surname}</option>
                                )}
                            </select>
                            <label htmlFor="availableCopies">Available copies</label>
                            <input type="number"
                                   id="availableCopies"
                                   name="availableCopies"
                                   className="form-control mb-2"
                                   placeholder={0}
                                   required
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

export default BookAdd;