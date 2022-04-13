package ru.mirea.horseWithOsteochondrose.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.mirea.horseWithOsteochondrose.entitys.Time;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TimeDto {
    protected  Long id;
    protected String time;

    public TimeDto(Time timeclass){
        this.id = timeclass.getId();
        this.time = timeclass.getTime();
    }
}
