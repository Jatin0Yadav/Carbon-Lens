package org.example.carbonfootprinttracker.target;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.example.carbonfootprinttracker.target.dto.SetTargetRequest;
import org.example.carbonfootprinttracker.target.dto.TargetResponse;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/target")
@RequiredArgsConstructor
public class TargetController {

    private final TargetService targetService;

    @GetMapping
    public TargetResponse getCurrentTarget() {
        return targetService.getCurrentTarget();
    }

    @PutMapping
    public TargetResponse setCurrentTarget(
            @Valid @RequestBody SetTargetRequest request
    ) {
        return targetService.setCurrentTarget(request);
    }
}