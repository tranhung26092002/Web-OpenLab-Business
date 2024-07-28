package edu.ptit.openlab.controller.admin;

import edu.ptit.openlab.DTO.LessonDTO;
import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin/lesson")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class LessonControllerAdmin {
    @Autowired
    private LessonService lessonService;

    @PostMapping("/create")
    public ResponseEntity<BaseResponse> createLesson(
            @RequestParam("file") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("courseId") Long courseId
    ){
        BaseResponse response = lessonService.createLesson(file, title, courseId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @PutMapping("/update/{lessonId}/{courseId}")
    public ResponseEntity<BaseResponse> updateLesson(
            @RequestParam(value = "file",required = false) MultipartFile file,
            @RequestParam("title") String title,
            @PathVariable("lessonId") Long lessonId,
            @PathVariable("courseId") Long courseId
    ) {
        BaseResponse response = lessonService.updateLesson(file, title, lessonId, courseId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }

    @DeleteMapping("/delete/{lessonId}")
    public ResponseEntity<BaseResponse> deleteLesson(@PathVariable Long lessonId) {
        BaseResponse response = lessonService.deleteLesson(lessonId);
        return new ResponseEntity<>(response, HttpStatus.valueOf(response.getStatus()));
    }
}
