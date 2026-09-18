package org.example.carbonfootprinttracker.carbon;

import org.example.carbonfootprinttracker.activity.ActivityType;
import org.springframework.stereotype.Service;

@Service
public class CarbonCalculationService {

    public double calculate(ActivityType type, double quantity) {

        double factor = getEmissionFactor(type);

        return round(quantity * factor);
    }

    public CarbonInsight generateInsight(double carbonEmission) {

        ImpactLevel level;
        String message;

        if (carbonEmission < 2) {
            level = ImpactLevel.LOW;
            message = "Low-impact activity. Nice work!";
        } else if (carbonEmission < 10) {
            level = ImpactLevel.MODERATE;
            message = "Moderate impact. There may be an easy opportunity to reduce this.";
        } else {
            level = ImpactLevel.HIGH;
            message = "High-impact activity. Consider a lower-emission alternative when practical.";
        }

        return new CarbonInsight(
                carbonEmission,
                level,
                message
        );
    }

    private double getEmissionFactor(ActivityType type) {

        return switch (type) {
            case CAR -> 0.20;
            case BUS -> 0.08;
            case FLIGHT -> 0.25;
            case ELECTRICITY -> 0.80;
            case VEG_MEAL -> 0.50;
            case NON_VEG_MEAL -> 2.00;
        };
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}