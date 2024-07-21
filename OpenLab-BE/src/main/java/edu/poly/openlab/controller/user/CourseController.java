package edu.poly.openlab.controller.user;

import edu.poly.openlab.DTO.CourseDTO;
import edu.poly.openlab.payload.response.BaseResponse;
import edu.poly.openlab.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/course")
public class CourseController {
    @Autowired
    private CourseService courseService;

    //Lấy danh sách tất cả cái khóa học
    @GetMapping("/all")
    public ResponseEntity<BaseResponse> getAllCourse(){
        BaseResponse response = courseService.getAllCourse();
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    // Lấy danh sách các khóa học với phân trang
    @GetMapping
    public ResponseEntity<BaseResponse> getCoursePaginated(@RequestParam int page, @RequestParam int size){
        BaseResponse response = courseService.getCoursePaginated(page, size);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    // Tìm kiếm khóa học theo từ khóa
    @GetMapping("/search")
    public ResponseEntity<BaseResponse> searchListCourse(@RequestParam String search){
        BaseResponse response = courseService.searchListCourse(search);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    // Lấy chi tiết một khóa học dựa trên ID
    @GetMapping("/{id}")
    public ResponseEntity<BaseResponse> getCourse(@PathVariable Long id){
        BaseResponse response = courseService.getCourse(id);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createCourse(@RequestBody CourseDTO courseDTO){
        BaseResponse response = courseService.createCourse(courseDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse> updateCourse(@PathVariable Long id, @RequestBody CourseDTO courseDTO) {
        BaseResponse response = courseService.updateCourse(id, courseDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> deleteCourse(@PathVariable Long id) {
        BaseResponse response = courseService.deleteCourse(id);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
}
