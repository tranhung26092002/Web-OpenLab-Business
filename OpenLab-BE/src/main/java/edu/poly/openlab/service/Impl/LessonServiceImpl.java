package edu.poly.openlab.service.Impl;

import edu.poly.openlab.DTO.LessonDTO;
import edu.poly.openlab.entity.Course;
import edu.poly.openlab.entity.Lesson;
import edu.poly.openlab.payload.response.BaseResponse;
import edu.poly.openlab.repository.CourseRepository;
import edu.poly.openlab.repository.LessonRepository;
import edu.poly.openlab.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LessonServiceImpl implements LessonService {
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
    public BaseResponse createLesson(LessonDTO lessonDTO) {
        try {
            Course course = courseRepository.findById(lessonDTO.getCourseId()).orElse(null);
            if (course == null) {
                return new BaseResponse(404, "Course not found", null);
            }

            Lesson lesson = new Lesson();
            lesson.setTitleLesson(lessonDTO.getTitleLesson());
            lesson.setUrlVideo(lessonDTO.getUrlVideo());
            lesson.setIsCompleted(false);
            lesson.setCourse(course);

            lessonRepository.save(lesson);

            return new BaseResponse(200, "Lesson created successfully", lesson);
        } catch (Exception e) {
            return new BaseResponse(500, "Error creating lesson", null);
        }
    }

    public BaseResponse updateLesson(Long id, LessonDTO lessonDTO) {
        try {
            Lesson lesson = lessonRepository.findById(id).orElse(null);
            if (lesson == null) {
                return new BaseResponse(404, "Lesson not found", null);
            }

            Course course = courseRepository.findById(lessonDTO.getCourseId()).orElse(null);
            if (course == null) {
                return new BaseResponse(404, "Course not found", null);
            }

            lesson.setTitleLesson(lessonDTO.getTitleLesson());
            lesson.setUrlVideo(lessonDTO.getUrlVideo());
            lesson.setIsCompleted(lessonDTO.getIsCompleted());
            lesson.setCourse(course);

            lessonRepository.save(lesson);
            return new BaseResponse(200, "Lesson updated successfully", lesson);
        } catch (Exception e) {
            return new BaseResponse(500, "Error updating lesson", null);
        }
    }

    @Override
    public BaseResponse deleteLesson(Long id) {
        try {
            // Kiểm tra xem bài học có tồn tại không
            Optional<Lesson> optionalLesson = lessonRepository.findById(id);
            if (optionalLesson.isPresent()) {
                // Xóa bài học nếu tồn tại
                lessonRepository.deleteById(id);
                return new BaseResponse(200, "Lesson deleted successfully", null);
            } else {
                return new BaseResponse(404, "Lesson not found", null);
            }
        } catch (Exception e) {
            // Xử lý ngoại lệ và trả về phản hồi lỗi
            return new BaseResponse(500, "Error deleting lesson", null);
        }
    }
}
