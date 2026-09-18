package org.example.carbonfootprinttracker.activity;

import lombok.RequiredArgsConstructor;
import org.example.carbonfootprinttracker.activity.dto.ActivityResponse;
import org.example.carbonfootprinttracker.activity.dto.CreateActivityRequest;
import org.example.carbonfootprinttracker.carbon.CarbonCalculationService;
import org.example.carbonfootprinttracker.carbon.CarbonInsight;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ActivityService {

    private final ActivityRepository activityRepository;
    private final CarbonCalculationService carbonCalculationService;

    public ActivityResponse createActivity(CreateActivityRequest request) {

        double carbonEmission =
                carbonCalculationService.calculate(
                        request.type(),
                        request.quantity()
                );

        CarbonInsight carbonInsight =
                carbonCalculationService.generateInsight(carbonEmission);

        Activity activity = Activity.builder()
                .type(request.type())
                .quantity(request.quantity())
                .unit(getUnit(request.type()))
                .carbonEmission(carbonEmission)
                .loggedAt(LocalDateTime.now())
                .build();

        Activity savedActivity =
                activityRepository.save(activity);

        return toResponse(savedActivity, carbonInsight);
    }

    public List<ActivityResponse> getActivities() {

        List<Activity> activities =
                activityRepository.findAll(
                        Sort.by(
                                Sort.Direction.DESC,
                                "loggedAt"
                        )
                );

        return activities.stream()
                .map(activity -> {

                    CarbonInsight insight =
                            carbonCalculationService.generateInsight(
                                    activity.getCarbonEmission()
                            );

                    return toResponse(activity, insight);
                })
                .toList();
    }

    private String getUnit(ActivityType type) {

        return switch (type) {
            case CAR, BUS, FLIGHT -> "km";
            case ELECTRICITY -> "kWh";
            case VEG_MEAL, NON_VEG_MEAL -> "meal";
        };
    }

    private ActivityResponse toResponse(
            Activity activity,
            CarbonInsight carbonInsight
    ) {

        return new ActivityResponse(
                activity.getId(),
                activity.getType(),
                activity.getQuantity(),
                activity.getUnit(),
                activity.getCarbonEmission(),
                carbonInsight.impactLevel(),
                carbonInsight.message(),
                activity.getLoggedAt()
        );
    }
}