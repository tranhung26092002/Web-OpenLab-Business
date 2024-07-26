package edu.ptit.openlab.service;

import edu.ptit.openlab.payload.response.BaseResponse;
import org.springframework.stereotype.Service;

@Service
public interface UserService {
    BaseResponse getAllCourse(Long userId);
    BaseResponse registerCourse(Long userId, Long courseId);

    BaseResponse registerCourseBySubId(Long userId, String subId);

    BaseResponse updateCourse(Long userId, Long courseId);

    BaseResponse deleteCourse(Long userId, Long courseId);

}
