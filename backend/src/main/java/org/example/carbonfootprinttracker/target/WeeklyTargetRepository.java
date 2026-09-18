package org.example.carbonfootprinttracker.target;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.Optional;

public interface WeeklyTargetRepository
        extends JpaRepository<WeeklyTarget, String> {

    Optional<WeeklyTarget> findByWeekStart(LocalDate weekStart);
}