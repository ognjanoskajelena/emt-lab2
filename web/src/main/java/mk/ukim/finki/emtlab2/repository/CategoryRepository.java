package mk.ukim.finki.emtlab2.repository;

import mk.ukim.finki.emtlab2.model.enums.Category;
import org.springframework.stereotype.Repository;

import java.util.Arrays;
import java.util.List;

@Repository
public class CategoryRepository {
    public List<Category> findAll() {
        return Arrays.asList(Category.values().clone());
    }
}
