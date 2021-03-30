package mk.ukim.finki.emtlab2.model.exceptions;

public class AuthorNotFoundException extends RuntimeException {
    public AuthorNotFoundException(Long id) {
        super(String.format("Author with id: %d was not found.", id));
    }
}
