package mk.ukim.finki.emtlab2.service;

import mk.ukim.finki.emtlab2.model.enums.Category;

import java.util.List;

public interface CategoryService {
    List<Category> findAll();
}
