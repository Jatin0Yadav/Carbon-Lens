package org.example.carbonfootprinttracker.activity;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.carbonfootprinttracker.activity.dto.ActivityResponse;
import org.example.carbonfootprinttracker.activity.dto.CreateActivityRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/activities")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ActivityResponse createActivity(
            @Valid @RequestBody CreateActivityRequest request
    ) {
        return activityService.createActivity(request);
    }

    @GetMapping
    public List<ActivityResponse> getActivities() {
        return activityService.getActivities();
    }
}