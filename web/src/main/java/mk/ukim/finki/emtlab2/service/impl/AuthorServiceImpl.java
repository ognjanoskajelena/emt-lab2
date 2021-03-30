package mk.ukim.finki.emtlab2.service.impl;

import mk.ukim.finki.emtlab2.model.Author;
import mk.ukim.finki.emtlab2.model.Country;
import mk.ukim.finki.emtlab2.model.exceptions.AuthorNotFoundException;
import mk.ukim.finki.emtlab2.model.exceptions.CountryNotFoundException;
import mk.ukim.finki.emtlab2.model.exceptions.UnfilledArgumentsException;
import mk.ukim.finki.emtlab2.repository.AuthorRepository;
import mk.ukim.finki.emtlab2.service.AuthorService;
import mk.ukim.finki.emtlab2.service.CountryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AuthorServiceImpl implements AuthorService {

    private final AuthorRepository authorRepository;
    private final CountryService countryService;

    public AuthorServiceImpl(AuthorRepository authorRepository, CountryService countryService) {
        this.authorRepository = authorRepository;
        this.countryService = countryService;
    }

    @Override
    public List<Author> findAll() {
        return this.authorRepository.findAll();
    }

    @Override
    public Optional<Author> save(String name, String surname, Long countryId) {
        if(name.equals("") || surname.equals(""))
            throw new UnfilledArgumentsException();
        Optional<Country> country = this.countryService.findById(countryId);
        if(country.isEmpty())
            throw new CountryNotFoundException(countryId);

        Author author = new Author(name, surname, country.get());
        return Optional.of(this.authorRepository.save(author));
    }

    @Override
    public Optional<Author> findById(Long id) {
        return this.authorRepository.findById(id);
    }

    @Override
    public Optional<Author> update(Long id, String name, String surname, Long countryId) {
        Optional<Author> author = this.findById(id);
        if(author.isEmpty())
            throw new AuthorNotFoundException(id);

        Optional<Country> country = this.countryService.findById(countryId);
        if(country.isEmpty())
            throw new CountryNotFoundException(countryId);

        Author a = author.get();
        a.setName(name);
        a.setSurname(surname);
        a.setCountry(country.get());
        return Optional.of(this.authorRepository.save(a));
    }

    @Override
    public void deleteById(Long id) {
        if(this.findById(id).isEmpty())
            throw new AuthorNotFoundException(id);
        this.authorRepository.deleteById(id);
    }
}
