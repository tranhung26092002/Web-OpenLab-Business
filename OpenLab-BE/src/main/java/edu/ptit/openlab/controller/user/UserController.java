package edu.ptit.openlab.controller.user;

import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("{userId}/courses")
    public ResponseEntity<BaseResponse> getAllCourse(@PathVariable Long userId){
        BaseResponse response = userService.getAllCourse(userId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping("/{userId}/courses/{courseId}")
    public ResponseEntity<BaseResponse> registerCourse(@PathVariable Long userId, @PathVariable Long courseId){
        BaseResponse response = userService.registerCourse(userId, courseId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping("/{userId}/coursesById/{subId}")
    public ResponseEntity<BaseResponse> registerCourseBySubId(@PathVariable Long userId, @PathVariable String subId){
        BaseResponse response = userService.registerCourseBySubId(userId, subId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PutMapping("/{userId}/courses/{courseId}")
    public ResponseEntity<BaseResponse> updateCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        BaseResponse response = userService.updateCourse(userId, courseId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @DeleteMapping("/{userId}/courses/{courseId}")
    public ResponseEntity<BaseResponse> deleteCourse(@PathVariable Long userId, @PathVariable Long courseId) {
        BaseResponse response = userService.deleteCourse(userId, courseId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
}
