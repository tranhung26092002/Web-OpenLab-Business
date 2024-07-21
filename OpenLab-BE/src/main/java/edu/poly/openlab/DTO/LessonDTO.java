package edu.poly.openlab.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LessonDTO {
    private Long courseId;
    private String titleLesson;
    private String urlVideo;
    private Boolean isCompleted;
}
