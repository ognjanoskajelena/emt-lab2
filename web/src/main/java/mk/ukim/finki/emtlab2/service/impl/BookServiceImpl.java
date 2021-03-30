package mk.ukim.finki.emtlab2.service.impl;

import mk.ukim.finki.emtlab2.model.Author;
import mk.ukim.finki.emtlab2.model.Book;
import mk.ukim.finki.emtlab2.model.dto.BookDto;
import mk.ukim.finki.emtlab2.model.enums.Category;
import mk.ukim.finki.emtlab2.model.exceptions.AuthorNotFoundException;
import mk.ukim.finki.emtlab2.model.exceptions.BookNotFoundException;
import mk.ukim.finki.emtlab2.model.exceptions.UnfilledArgumentsException;
import mk.ukim.finki.emtlab2.repository.BookRepository;
import mk.ukim.finki.emtlab2.service.AuthorService;
import mk.ukim.finki.emtlab2.service.BookService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository bookRepository;
    private final AuthorService authorService;

    public BookServiceImpl(BookRepository bookRepository, AuthorService authorService) {
        this.bookRepository = bookRepository;
        this.authorService = authorService;
    }

    @Override
    public List<Book> findAll() {
        return this.bookRepository.findAll();
    }

    @Override
    public Optional<Book> save(String name, Category category, Long authorId, Integer availableCopies) {
        if(name.equals(""))
            throw new UnfilledArgumentsException();
        Optional<Author> author = this.authorService.findById(authorId);
        if(author.isEmpty())
            throw new AuthorNotFoundException(authorId);

        Author a = author.get();
        Book book = new Book(name, category, a, availableCopies);
        return Optional.of(this.bookRepository.save(book));
    }

    @Override
    public Optional<Book> save(BookDto bookDto) {
        if(bookDto.getName().equals(""))
            throw new UnfilledArgumentsException();
        Optional<Author> author = this.authorService.findById(bookDto.getAuthorId());
        if(author.isEmpty())
            throw new AuthorNotFoundException(bookDto.getAuthorId());

        Author a = author.get();
        Book book = new Book(bookDto.getName(), bookDto.getCategory(), a, bookDto.getAvailableCopies());
        return Optional.of(this.bookRepository.save(book));
    }

    @Override
    public Optional<Book> findById(Long id) {
        return this.bookRepository.findById(id);
    }

    @Override
    public Optional<Book> update(Long id, String name, Category category, Long authorId, Integer availableCopies) {
        Optional<Author> author = this.authorService.findById(authorId);
        if(author.isEmpty())
            throw new AuthorNotFoundException(authorId);
        Author a = author.get();

        Optional<Book> book = this.findById(id);
        if(book.isEmpty())
            throw new BookNotFoundException(id);

        Book b = book.get();
        b.setName(name);
        b.setCategory(category);
        b.setAuthor(a);
        b.setAvailableCopies(availableCopies);
        return Optional.of(this.bookRepository.save(b));
    }

    @Override
    public Optional<Book> update(Long id, BookDto bookDto) {
        Optional<Author> author = this.authorService.findById(bookDto.getAuthorId());
        if(author.isEmpty())
            throw new AuthorNotFoundException(bookDto.getAuthorId());
        Author a = author.get();

        Optional<Book> book = this.findById(id);
        if(book.isEmpty())
            throw new BookNotFoundException(id);

        Book b = book.get();
        b.setName(bookDto.getName());
        b.setCategory(bookDto.getCategory());
        b.setAuthor(a);
        b.setAvailableCopies(bookDto.getAvailableCopies());
        return Optional.of(this.bookRepository.save(b));
    }

    @Override
    public void deleteById(Long id) {
        if(this.findById(id).isEmpty())
            throw new BookNotFoundException(id);
        this.bookRepository.deleteById(id);
    }

    @Override
    public Optional<Book> markAsTaken(Long id) {
        Optional<Book> book = this.findById(id);
        if(book.isEmpty())
            throw new BookNotFoundException(id);
        Book b = book.get();
        if(b.getAvailableCopies() > 0) {
            b.setAvailableCopies(b.getAvailableCopies() - 1);
            return Optional.of(this.bookRepository.save(b));
        }
        return book;
    }
}
