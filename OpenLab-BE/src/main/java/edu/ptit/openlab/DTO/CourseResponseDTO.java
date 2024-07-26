package edu.ptit.openlab.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CourseResponseDTO {
    private Long id;
    private String title;
    private String thumbnail;
    private Boolean isCompleted;
    private Date startDate;
    private String createdBy;
    private String typeProduct;
    private Boolean isPublish;
    private Double originalPrice;
    private Date createdAt;
    private Date updatedAt;
}
