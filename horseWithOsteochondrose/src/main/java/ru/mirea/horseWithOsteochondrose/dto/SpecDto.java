package ru.mirea.horseWithOsteochondrose.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mirea.horseWithOsteochondrose.entitys.Spec;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SpecDto {
    protected Long id;
    protected String name;

    public SpecDto(Spec spec){
        this.id = spec.getId();
        this.name = spec.getName();
    }
}
