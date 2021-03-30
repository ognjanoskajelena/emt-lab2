package mk.ukim.finki.emtlab2.service;

import mk.ukim.finki.emtlab2.model.Country;

import java.util.List;
import java.util.Optional;

public interface CountryService {
    List<Country> findAll();
    Optional<Country> save(String name, String continent);
    Optional<Country> findById(Long id);
    Optional<Country> update(Long id, String name, String continent);
    void deleteById(Long id);
}
