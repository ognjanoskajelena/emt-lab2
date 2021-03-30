package mk.ukim.finki.emtlab2.service;

import mk.ukim.finki.emtlab2.model.Author;

import java.util.List;
import java.util.Optional;

public interface AuthorService {
    List<Author> findAll();
    Optional<Author> save(String name, String surname, Long countryId);
    Optional<Author> findById(Long id);
    Optional<Author> update(Long id, String name, String surname, Long countryId);
    void deleteById(Long id);
}
