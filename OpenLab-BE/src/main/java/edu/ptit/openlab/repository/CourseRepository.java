package edu.ptit.openlab.repository;

import edu.ptit.openlab.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long>{
    @Query("select course FROM Course course WHERE course.title LIKE CONCAT('%',:search,'%')")
    List<Course> searchCourse(@Param("search") String search);

    Optional<Course> findBySubId(String subId);
}
