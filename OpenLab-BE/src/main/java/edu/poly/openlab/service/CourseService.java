package edu.poly.openlab.service;

import edu.poly.openlab.DTO.CourseDTO;
import edu.poly.openlab.payload.response.BaseResponse;
import org.springframework.stereotype.Service;

@Service
public interface CourseService {

    BaseResponse getCourse(Long id);

    BaseResponse getAllCourse();

    BaseResponse getCoursePaginated(int page, int size);

    BaseResponse searchListCourse(String search);

    BaseResponse createCourse(CourseDTO courseDTO);

    BaseResponse deleteCourse(Long id);

    BaseResponse updateCourse(Long id, CourseDTO courseDTO);
}
