package edu.poly.openlab.controller.user;

import edu.poly.openlab.DTO.CourseDTO;
import edu.poly.openlab.DTO.LessonDTO;
import edu.poly.openlab.payload.response.BaseResponse;
import edu.poly.openlab.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.websocket.server.PathParam;

@RestController
@RequestMapping("api/lesson")
public class LessonController {
    @Autowired
    private LessonService lessonService;

    @GetMapping("/all")
    public ResponseEntity<BaseResponse> getAllLesson(){
        BaseResponse response = lessonService.getAllLesson();
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @GetMapping("/all/{courseId}")
    public ResponseEntity<BaseResponse> getAllLessonOfCourse(@PathVariable Long courseId){
        BaseResponse response = lessonService.getAllLessonOfCourse(courseId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createLesson(@RequestBody LessonDTO lessonDTO){
        BaseResponse response = lessonService.createLesson(lessonDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<BaseResponse> updateLesson(@PathVariable Long id, @RequestBody LessonDTO lessonDTO) {
        BaseResponse response = lessonService.updateLesson(id, lessonDTO);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<BaseResponse> deleteLesson(@PathVariable Long id) {
        BaseResponse response = lessonService.deleteLesson(id);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
}
