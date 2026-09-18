package org.example.carbonfootprinttracker.dashboard;

import lombok.RequiredArgsConstructor;
import org.example.carbonfootprinttracker.activity.Activity;
import org.example.carbonfootprinttracker.activity.ActivityRepository;
import org.example.carbonfootprinttracker.activity.ActivityType;
import org.example.carbonfootprinttracker.target.WeeklyTarget;
import org.example.carbonfootprinttracker.target.WeeklyTargetRepository;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final ActivityRepository activityRepository;
    private final WeeklyTargetRepository targetRepository;

    public DashboardResponse getWeeklyDashboard() {

        LocalDate today = LocalDate.now();

        LocalDate weekStart = today.with(DayOfWeek.MONDAY);
        LocalDate weekEnd = weekStart.plusDays(6);

        double weeklyTarget = targetRepository
                .findByWeekStart(weekStart)
                .map(WeeklyTarget::getTarget)
                .orElse(35.0);

        LocalDateTime start = weekStart.atStartOfDay();
        LocalDateTime end = weekEnd.atTime(LocalTime.MAX);

        List<Activity> activities =
                activityRepository.findByLoggedAtBetween(start, end);

        double total = activities.stream()
                .mapToDouble(Activity::getCarbonEmission)
                .sum();

        Map<String, Double> breakdown =
                calculateBreakdown(activities);

        double targetPercentage =
                (total / weeklyTarget) * 100;

        double remainingOrExceeded =
                weeklyTarget - total;

        return new DashboardResponse(
                round(total),
                weeklyTarget,
                round(targetPercentage),
                round(remainingOrExceeded),
                breakdown
        );
    }

    private Map<String, Double> calculateBreakdown(
            List<Activity> activities) {

        Map<String, Double> breakdown = new HashMap<>();

        for (Activity activity : activities) {

            String category =
                    getCategory(activity.getType());

            breakdown.merge(
                    category,
                    activity.getCarbonEmission(),
                    Double::sum
            );
        }

        breakdown.replaceAll(
                (key, value) -> round(value)
        );

        return breakdown;
    }

    private String getCategory(ActivityType type) {

        return switch (type) {
            case CAR, BUS, FLIGHT -> "TRANSPORTATION";
            case ELECTRICITY -> "ENERGY";
            case VEG_MEAL, NON_VEG_MEAL -> "FOOD";
        };
    }

    private double round(double value) {
        return Math.round(value * 100.0) / 100.0;
    }
}