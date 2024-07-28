package edu.ptit.openlab.service;

import edu.ptit.openlab.DTO.LessonDTO;
import edu.ptit.openlab.payload.response.BaseResponse;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public interface LessonService {

    BaseResponse getAllLesson();

    BaseResponse getAllLessonOfCourse(Long courseId);

    BaseResponse createLesson(MultipartFile file, String title, Long courseId);

    BaseResponse updateLesson(MultipartFile file, String title, Long lessonId, Long courseId);

    BaseResponse deleteLesson(Long lessonId);
}
