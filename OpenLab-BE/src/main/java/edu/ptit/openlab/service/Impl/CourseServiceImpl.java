package edu.ptit.openlab.service.Impl;

import edu.ptit.openlab.DTO.CourseDTO;
import edu.ptit.openlab.DTO.CourseResponseDTO;
import edu.ptit.openlab.entity.Course;
import edu.ptit.openlab.mapper.CourseMapper;
import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.repository.CourseRepository;
import edu.ptit.openlab.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private CourseMapper courseMapper;

    @Override
    @Transactional
    public BaseResponse save(Course course){
        try {
            course = courseRepository.save(course);
            return new BaseResponse(200,"Saved successfully", course);
        } catch(Exception e){
            return new BaseResponse(400,"Failed save", null);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public BaseResponse getCourse(Long id) {
        Optional<Course> optionalCourse = courseRepository.findById(id);
        if(optionalCourse.isPresent()){
            return new BaseResponse(200, "Retrieved successfully", optionalCourse.get());
        }else{
            return new BaseResponse(404, "Course not found", null);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public BaseResponse getCoursePaginated(int page, int size) {
        try{
            Page<Course> courses = courseRepository.findAll(PageRequest.of(page, size));
            return new BaseResponse(200, "Retrieved successfully", courses);
        } catch (Exception e){
            return new BaseResponse(500, "Error retrieving Course", null);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public BaseResponse getAllCourse() {
        try{
            List<Course> courseList = courseRepository.findAll();

            List<CourseResponseDTO> courseDTOList = courseList.stream()
                    .map(courseMapper::courseToCourseDTO)
                    .collect(Collectors.toList());

            return new BaseResponse(200, "Retrieved successfully", courseDTOList);
        } catch (Exception e){
            return new BaseResponse(500, "Error retrieving all Course", null);
        }
    }

    @Override
    @Transactional
    public BaseResponse searchListCourse(String search) {
        try{
            List<Course> courseList = courseRepository.searchCourse(search);
            if(courseList.isEmpty()){
                return new BaseResponse(404, "No results found for the search query", null);
            }else{
                return new BaseResponse(200, "Search results retrieved successfully", courseList);
            }
        } catch (Exception e){
            return new BaseResponse(500, "Error processing search", null);
        }
    }

    @Override
    @Transactional
    public BaseResponse updateCourse(Long id, Course updateCourse) {
        try {
            Optional<Course> optionalCourse = courseRepository.findById(id);
            if (optionalCourse.isPresent()) {
                Course course = optionalCourse.get();

                course.setTitle(updateCourse.getTitle());
                course.setThumbnail(updateCourse.getThumbnail());
                course.setCreatedBy(updateCourse.getCreatedBy());
                course.setTypeProduct(updateCourse.getTypeProduct());
                course.setIsPublish(updateCourse.getIsPublish());
                course.setDescription(updateCourse.getDescription());
                course.setOriginalPrice(updateCourse.getOriginalPrice());

                Course updatedCourse = courseRepository.save(course);

                return new BaseResponse(200, "Course updated successfully", updatedCourse);
            } else {
                return new BaseResponse(404, "Course not found", null);
            }
        } catch (Exception e) {
            return new BaseResponse(500, "Error update course", null);
        }
    }

    @Override
    @Transactional
    public BaseResponse deleteCourse(Long id) {
        try {
            if (courseRepository.existsById(id)) {
                courseRepository.deleteById(id);

                return new BaseResponse(200, "Course deleted successfully", null );
            } else {
                return new BaseResponse(404, "Course not found", null);
            }
        } catch (Exception e) {
            return new BaseResponse(500, "Error delete course", null);
        }
    }
}
