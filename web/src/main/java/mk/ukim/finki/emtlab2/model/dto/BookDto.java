package mk.ukim.finki.emtlab2.model.dto;

import lombok.Data;
import mk.ukim.finki.emtlab2.model.Author;
import mk.ukim.finki.emtlab2.model.enums.Category;

@Data
public class BookDto {
    private String name;

    private Category category;

    private Long authorId;

    private Integer availableCopies;

    public BookDto() {
    }

    public BookDto(String name, Category category, Long authorId, Integer availableCopies) {
        this.name = name;
        this.category = category;
        this.authorId = authorId;
        this.availableCopies = availableCopies;
    }
}
