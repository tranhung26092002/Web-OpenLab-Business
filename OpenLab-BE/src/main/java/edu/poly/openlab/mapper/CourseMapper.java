package edu.poly.openlab.mapper;

import edu.poly.openlab.DTO.CourseResponseDTO;
import edu.poly.openlab.entity.Course;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseResponseDTO courseToCourseDTO(Course course);
}
