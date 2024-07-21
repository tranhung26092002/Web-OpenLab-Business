package edu.poly.openlab.service.Impl;

import edu.poly.openlab.DTO.CourseDTO;
import edu.poly.openlab.DTO.CourseResponseDTO;
import edu.poly.openlab.entity.Course;
import edu.poly.openlab.mapper.CourseMapper;
import edu.poly.openlab.payload.response.BaseResponse;
import edu.poly.openlab.repository.CourseRepository;
import edu.poly.openlab.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
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
    public BaseResponse createCourse(CourseDTO courseDTO) {
        try {
            Course course = new Course();

            course.setSubId(courseDTO.getSubId());
            course.setTitle(courseDTO.getTitle());
            course.setThumbnail(courseDTO.getThumbnail());
            course.setCreatedBy(courseDTO.getCreatedBy());
            course.setTypeProduct(courseDTO.getTypeProduct());
            course.setIsPublish(courseDTO.getIsPublish());
            course.setDescription(courseDTO.getDescription());
            course.setOriginalPrice(courseDTO.getOriginalPrice());

            // Các giá trị mặc định
            course.setIsCompleted(false);
            course.setStartDate(null);

            courseRepository.save(course);

            return new BaseResponse(200, "Course created successfully", course);
        } catch (Exception e) {
            return new BaseResponse(500, "Error create course", null);
        }
    }

    public BaseResponse updateCourse(Long id, CourseDTO courseDTO) {
        try {
            Optional<Course> optionalCourse = courseRepository.findById(id);
            if (optionalCourse.isPresent()) {
                Course course = optionalCourse.get();

                course.setTitle(courseDTO.getTitle());
                course.setThumbnail(courseDTO.getThumbnail());
                course.setCreatedBy(courseDTO.getCreatedBy());
                course.setTypeProduct(courseDTO.getTypeProduct());
                course.setIsPublish(courseDTO.getIsPublish());
                course.setDescription(courseDTO.getDescription());
                course.setOriginalPrice(courseDTO.getOriginalPrice());

                Course updatedCourse = courseRepository.save(course);

                return new BaseResponse(200, "Course updated successfully", updatedCourse);
            } else {
                return new BaseResponse(404, "Course not found", null);
            }
        } catch (Exception e) {
            return new BaseResponse(500, "Error update course", null);
        }
    }

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
