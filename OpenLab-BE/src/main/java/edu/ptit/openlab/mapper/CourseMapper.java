package edu.ptit.openlab.mapper;

import edu.ptit.openlab.DTO.CourseResponseDTO;
import edu.ptit.openlab.entity.Course;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CourseMapper {
    CourseResponseDTO courseToCourseDTO(Course course);
}
