package edu.ptit.openlab.controller.admin;

import edu.ptit.openlab.DTO.LessonDTO;
import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/lesson")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class LessonControllerAdmin {
    @Autowired
    private LessonService lessonService;

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
