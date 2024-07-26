package edu.ptit.openlab.entity;

import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Entity
@Table(name = "lesson")
public class Lesson {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Long id;

    @Column(name = "title_lesson", nullable = false)
    private String titleLesson;

    @Column(name = "url_video", nullable = false)
    private String urlVideo;  // Đổi thành String vì URL có thể gặp vấn đề với một số trường hợp

    @Column(name = "is_completed")  // Thêm nullable = false để đảm bảo giá trị không bị bỏ trống
    private Boolean isCompleted = false;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at", nullable = false, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "updated_at")
    private Date updatedAt;

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
