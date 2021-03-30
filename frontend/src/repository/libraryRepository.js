import axios from "../custom-axios/axios";

const ELibraryService = {
    fetchCategories: () => {
        return axios.get("/categories");
    },
    fetchAuthors: () => {
        return axios.get("/authors");
    },
    fetchBooks: () => {
        return axios.get("/books");
    },
    addBook: (name, category, authorId, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    editBook: (id, name, category, authorId, availableCopies) => {
        return axios.post(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "authorId": authorId,
            "availableCopies": availableCopies
        });
    },
    markTakenBook: (id) => {
        return axios.get(`/books/mark/${id}`);
    }
}

export default ELibraryService;