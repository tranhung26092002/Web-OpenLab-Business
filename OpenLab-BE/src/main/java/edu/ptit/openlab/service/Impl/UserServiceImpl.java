package edu.ptit.openlab.service.Impl;

import edu.ptit.openlab.DTO.CourseResponseDTO;
import edu.ptit.openlab.entity.Course;
import edu.ptit.openlab.entity.User;
import edu.ptit.openlab.mapper.CourseMapper;
import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.repository.CourseRepository;
import edu.ptit.openlab.repository.UserRepository;
import edu.ptit.openlab.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private CourseMapper courseMapper;

    @Override
    public BaseResponse getAllCourse(Long userId) {
        try {
            User user = userRepository.findById(userId).orElse(null);

            if (user == null) {
                return new BaseResponse(404, "User not found", null);
            }

            List<Course> userCourses = user.getCourses();

            if (userCourses.isEmpty()) {
                return new BaseResponse(404, "Courses not found", null);
            }

            List<CourseResponseDTO> userCoursesDTO = userCourses.stream()
                    .map(courseMapper::courseToCourseDTO)
                    .collect(Collectors.toList());

            return new BaseResponse(200, "Course registered successfully", userCoursesDTO);
        } catch (Exception e) {
            return new BaseResponse(500, "Error registering course to user", null);
        }
    }

    @Override
    public BaseResponse registerCourse(Long userId, Long courseId) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            Course course = courseRepository.findById(courseId).orElse(null);
            if (user == null) {
                return new BaseResponse(404, "User not found", null);
            }
            if (course == null) {
                return new BaseResponse(404, "Course not found", null);
            }

            List<Course> userCourses = user.getCourses();
            boolean courseExists = userCourses.stream().anyMatch(c -> c.getId().equals(courseId));

            if (courseExists) {
                return new BaseResponse(400, "The course already exists in the user's course list", null);
            }

            user.registerCourse(course);
            userRepository.save(user);

            return new BaseResponse(200, "Course registered successfully", user);
        } catch (Exception e) {
            return new BaseResponse(500, "Error registering course to user", null);
        }
    }

    @Override
    public BaseResponse registerCourseBySubId(Long userId, String subId) {
        try {
            User user = userRepository.findById(userId).orElse(null);
            Course course = courseRepository.findBySubId(subId).orElse(null);
            if (user == null) {
                return new BaseResponse(404, "User not found", null);
            }
            if (course == null) {
                return new BaseResponse(404, "Course not found", null);
            }

            List<Course> userCourses = user.getCourses();
            boolean courseExists = userCourses.stream().anyMatch(c -> c.getId().equals(course.getId()));

            if (courseExists) {
                return new BaseResponse(400, "The course already exists in the user's course list", null);
            }

            user.registerCourse(course);
            userRepository.save(user);

            return new BaseResponse(200, "Course registered successfully", user);
        } catch (Exception e) {
            return new BaseResponse(500, "Error registering course to user", null);
        }
    }

    @Override
    public BaseResponse updateCourse(Long userId, Long courseId) {
        try {
            User user = userRepository.findById(userId).orElse(null);

            if (user == null) {
                return new BaseResponse(404, "User not found", null);
            }

            Course course = user.getCourses().stream()
                    .filter(c -> c.getId().equals(courseId))
                    .findFirst()
                    .orElse(null);

            if (course == null) {
                return new BaseResponse(404, "Course not found in user's courses", null);
            }

            course.setIsCompleted(true);

            courseRepository.save(course);

            return new BaseResponse(200, "Course updated successfully", course);
        } catch (Exception e) {
            return new BaseResponse(500, "Error updating course", null);
        }
    }

    @Override
    public BaseResponse deleteCourse(Long userId, Long courseId) {
        try {
            User user = userRepository.findById(userId).orElse(null);

            if (user == null) {
                return new BaseResponse(404, "User not found", null);
            }

            Course course = user.getCourses().stream()
                    .filter(c -> c.getId().equals(courseId))
                    .findFirst()
                    .orElse(null);

            if (course == null) {
                return new BaseResponse(404, "Course not found in user's courses", null);
            }

            user.getCourses().remove(course);
            userRepository.save(user);

            return new BaseResponse(200, "Course deleted successfully", null);
        } catch (Exception e) {
            return new BaseResponse(500, "Error deleting course", null);
        }
    }
}
