package edu.ptit.openlab.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.web.multipart.MultipartFile;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class LessonDTO {
    private Long courseId;
    private String titleLesson;
    private MultipartFile urlVideo;
    private Boolean isCompleted;
}
