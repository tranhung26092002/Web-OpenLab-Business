package edu.poly.openlab.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseDTO {
    private String subId;
    private String title;
    private String thumbnail;
    private String createdBy;
    private String typeProduct;
    private Boolean isPublish;
    private String description;
    private Double originalPrice;
}
