package com.izziddine.taskManagmentSystem.repository;

import com.izziddine.taskManagmentSystem.entities.Task;
import com.izziddine.taskManagmentSystem.enums.Status;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task , Long>, JpaSpecificationExecutor<Task> {

    List<Task> findByUserId(Long userId);


    @Query("SELECT t FROM Task t WHERE t.user.id = :userId AND t.status = :status")
    List<Task> findTasksByStatusForUser(Long userId, Status status);

    @Query("SELECT t.status, COUNT(t) FROM Task t WHERE t.user.id = :userId GROUP BY t.status")
    List<Object[]> countTasksByStatusForUser(Long userId);





}
