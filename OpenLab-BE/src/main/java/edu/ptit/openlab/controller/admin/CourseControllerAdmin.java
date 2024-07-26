package edu.ptit.openlab.controller.admin;

import edu.ptit.openlab.DTO.CourseDTO;
import edu.ptit.openlab.entity.Course;
import edu.ptit.openlab.payload.response.BaseResponse;
import edu.ptit.openlab.repository.CourseRepository;
import edu.ptit.openlab.service.CourseService;
import edu.ptit.openlab.service.StorageService;
import org.apache.poi.hwpf.HWPFDocument;
import org.apache.poi.hwpf.converter.WordToHtmlConverter;
import org.apache.poi.hwpf.usermodel.Picture;
import org.apache.poi.xwpf.converter.xhtml.XHTMLConverter;
import org.apache.poi.xwpf.converter.xhtml.XHTMLOptions;
import org.apache.poi.xwpf.usermodel.XWPFDocument;
import org.apache.poi.xwpf.usermodel.XWPFPictureData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin/course")
//@PreAuthorize("hasRole('ROLE_ADMIN')")
public class CourseControllerAdmin {
    @Autowired
    private CourseService courseService;

    @Autowired
    private StorageService storageService;

    private String getCorrectExtension(byte[] imageData) {
        // First bytes of different image formats
        byte[] jpeg = new byte[] {(byte) 0xFF, (byte) 0xD8};
        byte[] png = new byte[] {(byte) 0x89, (byte) 0x50};

        if (imageData.length > 1) {
            if (imageData[0] == jpeg[0] && imageData[1] == jpeg[1]) {
                return "jpeg";
            } else if (imageData[0] == png[0]) {
                return "png";
            }
        }
        return "unknown";
    }

    private List<MultipartFile> extractImagesFromDoc(XWPFDocument document) {
        List<MultipartFile> imageFiles = new ArrayList<>();
        // Extract images
        for (XWPFPictureData pictureData : document.getAllPictures()) {
            byte[] bytes = pictureData.getData();
            String ext = this.getCorrectExtension(bytes);
            String imageName = new File(pictureData.getPackagePart().getPartName().getName()).getName();


            MultipartFile imageFile = new MockMultipartFile(imageName, imageName, "image/" + ext, bytes);
            imageFiles.add(imageFile);
        }
        return imageFiles;
    }

    private List<MultipartFile> extractImagesFromDocForHWPF(HWPFDocument document) throws IOException {
        List<MultipartFile> images = new ArrayList<>();

        List<Picture> pictures = document.getPicturesTable().getAllPictures();
        for (Picture picture : pictures) {
            byte[] bytes = picture.getContent();
            String ext = picture.suggestFileExtension();
            String imageFileName = picture.suggestFullFileName();

            // Use MockMultipartFile
            MultipartFile imageFile = new MockMultipartFile(imageFileName, imageFileName, "image/" + ext, bytes);
            images.add(imageFile);
        }
        return images;
    }

    @Value("${app.base-upload-image-url}")
    private String BASE_UPLOAD_IMAGE_URL;

    @PostMapping("/create")
    public ResponseEntity<?> createCourse(
            @RequestParam("subId") String subId,
            @RequestParam("title") String title,
            @RequestParam("thumbnail") MultipartFile thumbnail,
            @RequestParam("createdBy") String createdBy,
            @RequestParam("typeProduct") String typeProduct,
            @RequestParam("isPublish") boolean isPublish,
            @RequestParam("description") String description,
            @RequestParam("originalPrice") String originalPrice
    ) {
        try {
            // Lưu file vào một thư mục cụ thể
            String fileName = storageService.uploadImageToFileSystem(thumbnail);

            Course course = new Course();

            course.setSubId(subId);
            course.setTitle(title);
            course.setCreatedBy(createdBy);
            course.setTypeProduct(typeProduct);
            course.setIsPublish(isPublish);
            course.setThumbnail(BASE_UPLOAD_IMAGE_URL + fileName);
            course.setDescription(description);
            course.setOriginalPrice(Double.parseDouble(originalPrice));

            // Các giá trị mặc định
            course.setIsCompleted(false);
            course.setStartDate(null);

            BaseResponse response = courseService.save(course);
            if (response.getStatus() == 200) {
                return new ResponseEntity<>(response.getData(), HttpStatus.CREATED);
            } else {
                return new ResponseEntity<>("Error from service: " + response.getMessage(), HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {

            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }



    @PutMapping("update/{id}")
    public ResponseEntity<?> updateCourse(
            @PathVariable Long id,
            @RequestParam("subId") String subId,
            @RequestParam("title") String title,
            @RequestParam("thumbnail") MultipartFile thumbnail,
            @RequestParam("createdBy") String createdBy,
            @RequestParam("typeProduct") String typeProduct,
            @RequestParam("isPublish") boolean isPublish,
            @RequestParam("description") String description,
            @RequestParam("originalPrice") String originalPrice
    ) {
        BaseResponse fetchedKhoiCamBien = courseService.getCourse(id);
        if (fetchedKhoiCamBien.getStatus() != 200) {
            return new ResponseEntity<>(fetchedKhoiCamBien.getMessage(), HttpStatus.NOT_FOUND);
        }

        try {
            // Lưu file vào một thư mục cụ thể
            String fileName = storageService.uploadImageToFileSystem(thumbnail);

            Course course = new Course();

            course.setSubId(subId);
            course.setTitle(title);
            course.setCreatedBy(createdBy);
            course.setTypeProduct(typeProduct);
            course.setIsPublish(isPublish);
            course.setThumbnail(BASE_UPLOAD_IMAGE_URL + fileName);
            course.setDescription(description);
            course.setOriginalPrice(Double.parseDouble(originalPrice));

            // Các giá trị mặc định
            course.setIsCompleted(false);
            course.setStartDate(null);

            BaseResponse updateResponse = courseService.updateCourse(id, course);
            return (updateResponse.getStatus() == 200)
                    ? new ResponseEntity<>(updateResponse.getData(), HttpStatus.OK)
                    : new ResponseEntity<>(updateResponse.getMessage(), HttpStatus.BAD_REQUEST);

        } catch(Exception e) {
            return new ResponseEntity<>("An error occurred: " + e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable long id) {
        BaseResponse deleteResponse = courseService.deleteCourse(id);
        if (deleteResponse.getStatus() == 200) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(deleteResponse.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}

