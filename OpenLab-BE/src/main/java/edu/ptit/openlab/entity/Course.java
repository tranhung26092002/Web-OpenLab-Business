package edu.ptit.openlab.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import java.util.Date;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "course")
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @JsonIgnore
    @Column(name = "sub_id", nullable = false, unique = true)
    private String subId;

    @Column(name = "title", nullable = false)  // Tiêu đề khoá học không nên bỏ trống
    private String title;

    @Column(name = "thumbnail", nullable = false)
    private String thumbnail;

    @Column(name = "is_completed", nullable = false)
    private Boolean isCompleted = false;  // Mặc định là false khi tạo mới

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "start_date")
    private Date startDate;  // Mặc định null khi tạo mới

    @Column(name = "created_by", length = 100, nullable = false)  // Cần biết ai tạo khoá học
    private String createdBy;

    @Column(name = "type_product", length = 100, nullable = false)  // Đảm bảo có loại sản phẩm
    private String typeProduct;

    @Column(name = "is_publish", nullable = false)  // Đảm bảo giá trị không bị bỏ trống
    private Boolean isPublish;

    @Lob
    @Column(name = "description", columnDefinition = "TEXT")  // Hỗ trợ lưu trữ văn bản dài
    private String description;

    @Column(name = "original_price", nullable = false)
    private Double originalPrice;  // Thuộc tính originalPrice

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

    @JsonIgnore
    @ManyToMany(mappedBy = "courses")
    private List<User> users;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<Lesson> lessons;

    @PrePersist
    protected void onCreate() {
        createdAt = new Date();
        isCompleted = false;  // Mặc định là false khi tạo mới
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = new Date();
    }
}
