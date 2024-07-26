package edu.ptit.openlab.service;

import edu.ptit.openlab.DTO.LessonDTO;
import edu.ptit.openlab.payload.response.BaseResponse;
import org.springframework.stereotype.Service;

@Service
public interface LessonService {

    BaseResponse getAllLesson();

    BaseResponse getAllLessonOfCourse(Long courseId);

    BaseResponse createLesson(LessonDTO lessonDTO);

    BaseResponse updateLesson(Long id, LessonDTO lessonDTO);

    BaseResponse deleteLesson(Long id);
}
