package com.izziddine.taskManagmentSystem.repository;

import com.izziddine.taskManagmentSystem.entities.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findByUserId(Long userId);
    List<Comment> findByTaskId(Long taskId);

    @Query("SELECT c FROM Comment c JOIN FETCH c.user WHERE c.task.id = :taskId")
    List<Comment> findCommentsWithUserByTaskId(Long taskId);

    @Query("SELECT c FROM Comment c WHERE c.user.id = :userId AND c.task.id = :taskId")
    List<Comment> findCommentsByUserAndTask(Long userId, Long taskId);

    @Query("SELECT c FROM Comment c WHERE c.task.user.id = :userId ORDER BY c.timestamp DESC")
    List<Comment> findRecentCommentsForUserTasks(Long userId);

}
