package org.example.carbonfootprinttracker.carbon;

public record CarbonInsight(
        double carbonEmission,
        ImpactLevel impactLevel,
        String message
) {
}