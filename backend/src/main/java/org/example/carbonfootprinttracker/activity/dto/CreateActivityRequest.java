package org.example.carbonfootprinttracker.activity.dto;

import org.example.carbonfootprinttracker.activity.ActivityType;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;

public record CreateActivityRequest(

        @NotNull(message = "Activity type is required")
        ActivityType type,

        @DecimalMin(
                value = "0.01",
                message = "Quantity must be greater than 0"
        )
        @DecimalMax(
                value = "5000",
                message = "Quantity is unrealistically high"
        )
        double quantity
) {
}