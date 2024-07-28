package edu.ptit.openlab.service.Impl;

import edu.ptit.openlab.DTO.LessonDTO;
import edu.ptit.openlab.entity.Course;
import edu.ptit.openlab.entity.Lesson;
import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.repository.CourseRepository;
import edu.ptit.openlab.repository.LessonRepository;
import edu.ptit.openlab.service.LessonService;
import edu.ptit.openlab.service.StorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Service
public class LessonServiceImpl implements LessonService {
    @Autowired
    private StorageService storageService;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Override
    public BaseResponse getAllLesson() {
        try {
            List<Lesson> lessons = lessonRepository.findAll();
            return new BaseResponse(200, "Success", lessons);
        } catch (Exception e) {
            return new BaseResponse(500, "Error retrieving lessons", null);
        }
    }

    @Override
    public BaseResponse getAllLessonOfCourse(Long courseId) {
        try {
            List<Lesson> lessons = lessonRepository.findByCourseId(courseId);
            return new BaseResponse(200, "Success", lessons);
        } catch (Exception e) {
            return new BaseResponse(500, "Error retrieving lessons for course", null);
        }
    }


    @Override
    @Transactional
    public BaseResponse createLesson( MultipartFile file, String title, Long courseId) {
        if(!storageService.isVideoFileWithTika(file)) {
            return new BaseResponse(400, "File is not a valid video type", null);
        }

        String savedFilePath = storageService.saveFile(file);
        try {
            Course course = courseRepository.findById(courseId).orElse(null);

            if (course == null) {
                return new BaseResponse(404, "Course not found", null);
            }

            Lesson lesson = new Lesson();
            lesson.setTitleLesson(title);
            lesson.setUrlVideo(savedFilePath);
            lesson.setIsCompleted(false);
            lesson.setCourse(course);

            lessonRepository.save(lesson);

            return new BaseResponse(200, "Lesson created successfully", lesson);
        } catch (Exception e) {
            return new BaseResponse(500, "Error creating lesson", null);
        }
    }

    @Override
    @Transactional
    public BaseResponse updateLesson(MultipartFile file, String title, Long lessonId, Long courseId) {
        if(!storageService.isVideoFileWithTika(file)){
            return new BaseResponse(400, "File is not a valid video type", null);
        }
        String savedFilePath = storageService.saveFile(file);

        try {
            Lesson lesson = lessonRepository.findById(lessonId).orElse(null);
            if (lesson == null) {
                return new BaseResponse(404, "Lesson not found", null);
            }

            Course course = courseRepository.findById(courseId).orElse(null);
            if (course == null) {
                return new BaseResponse(404, "Course not found", null);
            }

            lesson.setTitleLesson(title);
            lesson.setUrlVideo(savedFilePath);
            lesson.setIsCompleted(false);

            lesson.setCourse(course);

            lessonRepository.save(lesson);
            return new BaseResponse(200, "Lesson updated successfully", lesson);
        } catch (Exception e) {
            return new BaseResponse(500, "Error updating lesson", null);
        }
    }

    @Override
    @Transactional
    public BaseResponse deleteLesson(Long lessonId) {
        try {
            Optional<Lesson> optionalLesson = lessonRepository.findById(lessonId);
            if (optionalLesson.isPresent()) {
                lessonRepository.deleteById(lessonId);
                return new BaseResponse(200, "Lesson deleted successfully", null);
            } else {
                return new BaseResponse(404, "Lesson not found", null);
            }
        } catch (Exception e) {
            return new BaseResponse(500, "Error deleting lesson", null);
        }
    }
}
