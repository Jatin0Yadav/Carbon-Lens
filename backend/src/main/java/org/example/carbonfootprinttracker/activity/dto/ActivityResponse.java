package org.example.carbonfootprinttracker.activity.dto;

import org.example.carbonfootprinttracker.activity.ActivityType;
import org.example.carbonfootprinttracker.carbon.ImpactLevel;

import java.time.LocalDateTime;

public record ActivityResponse(
        String id,
        ActivityType type,
        double quantity,
        String unit,
        double carbonEmission,
        ImpactLevel impactLevel,
        String insight,
        LocalDateTime loggedAt
) {
}