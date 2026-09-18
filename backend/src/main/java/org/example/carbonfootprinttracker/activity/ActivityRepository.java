package org.example.carbonfootprinttracker.activity;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ActivityRepository extends JpaRepository<Activity, String> {

    List<Activity> findByLoggedAtBetween(
            LocalDateTime start,
            LocalDateTime end
    );
}