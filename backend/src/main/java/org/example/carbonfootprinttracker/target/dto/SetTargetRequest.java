package org.example.carbonfootprinttracker.target.dto;

import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

public record SetTargetRequest(

        @DecimalMin(
                value = "1.0",
                message = "Target must be at least 1 kg"
        )
        @DecimalMax(
                value = "1000.0",
                message = "Target cannot exceed 1000 kg"
        )
        double target
) {
}