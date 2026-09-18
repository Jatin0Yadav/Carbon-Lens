package org.example.carbonfootprinttracker.target.dto;

import java.time.LocalDate;

public record TargetResponse(
        String id,
        LocalDate weekStart,
        double target
) {
}