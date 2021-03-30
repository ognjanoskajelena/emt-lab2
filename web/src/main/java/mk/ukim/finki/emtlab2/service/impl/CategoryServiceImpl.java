package mk.ukim.finki.emtlab2.service.impl;

import mk.ukim.finki.emtlab2.model.enums.Category;
import mk.ukim.finki.emtlab2.repository.CategoryRepository;
import mk.ukim.finki.emtlab2.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAll() {
        return this.categoryRepository.findAll();
    }
}
