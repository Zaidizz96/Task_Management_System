package com.izziddine.taskManagmentSystem.repository;

import com.izziddine.taskManagmentSystem.entities.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User , Long> {

    Optional<User> findByEmail(String email);

    @Query(value = "SELECT * FROM user WHERE role = 'USER'", nativeQuery = true)
    List<User> findUsersWithRoleUser();

    @Query("SELECT u.email FROM User u")
    List<String> findAllEmails();

    boolean existsByEmail(String email);

}
