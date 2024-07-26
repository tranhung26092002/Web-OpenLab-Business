package edu.ptit.openlab.service;

import edu.ptit.openlab.DTO.CourseDTO;
import edu.ptit.openlab.entity.Course;
import edu.ptit.openlab.payload.response.BaseResponse;
import org.springframework.stereotype.Service;

@Service
public interface CourseService {

    BaseResponse getCourse(Long id);

    BaseResponse getAllCourse();

    BaseResponse getCoursePaginated(int page, int size);

    BaseResponse searchListCourse(String search);

    BaseResponse save(Course course);

    BaseResponse updateCourse(Long id, Course course);

    BaseResponse deleteCourse(Long id);
}

