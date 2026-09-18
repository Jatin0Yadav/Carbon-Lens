package org.example.carbonfootprinttracker.target;

import lombok.RequiredArgsConstructor;
import org.example.carbonfootprinttracker.target.dto.SetTargetRequest;
import org.example.carbonfootprinttracker.target.dto.TargetResponse;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class TargetService {

    private static final double DEFAULT_TARGET = 35.0;

    private final WeeklyTargetRepository targetRepository;

    public TargetResponse getCurrentTarget() {

        LocalDate weekStart = getWeekStart();

        return targetRepository.findByWeekStart(weekStart)
                .map(this::toResponse)
                .orElseGet(() -> new TargetResponse(
                        null,
                        weekStart,
                        DEFAULT_TARGET
                ));
    }

    public TargetResponse setCurrentTarget(
            SetTargetRequest request
    ) {

        LocalDate weekStart = getWeekStart();

        WeeklyTarget target = targetRepository
                .findByWeekStart(weekStart)
                .orElseGet(() -> WeeklyTarget.builder()
                        .weekStart(weekStart)
                        .build());

        target.setTarget(request.target());

        return toResponse(targetRepository.save(target));
    }

    private LocalDate getWeekStart() {
        return LocalDate.now()
                .with(DayOfWeek.MONDAY);
    }

    private TargetResponse toResponse(WeeklyTarget target) {

        return new TargetResponse(
                target.getId(),
                target.getWeekStart(),
                target.getTarget()
        );
    }
}