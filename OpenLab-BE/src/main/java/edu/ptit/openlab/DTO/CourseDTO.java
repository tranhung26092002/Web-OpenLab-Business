package edu.ptit.openlab.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private String subId;
    private String title;
    private MultipartFile thumbnail;
    private String createdBy;
    private String typeProduct;
    private Boolean isPublish;
    private String description;
    private Double originalPrice;
}
