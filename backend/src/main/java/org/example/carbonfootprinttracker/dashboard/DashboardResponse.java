package org.example.carbonfootprinttracker.dashboard;

import java.util.Map;

public record DashboardResponse(
        double totalCarbonEmission,
        double weeklyTarget,
        double targetPercentage,
        double remainingOrExceeded,
        Map<String, Double> categoryBreakdown
) {
}