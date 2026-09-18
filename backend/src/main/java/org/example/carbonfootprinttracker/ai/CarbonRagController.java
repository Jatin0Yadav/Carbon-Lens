package org.example.carbonfootprinttracker.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class CarbonRagController {

    private final CarbonRagService carbonRagService;
    private final CarbonAiService carbonAiService;

    @GetMapping("/search")
    public Object search(
            @RequestParam String query
    ) {
        return carbonRagService.retrieve(query)
                .stream()
                .map(document -> document.getText())
                .toList();
    }

    @GetMapping("/coach")
    public String coach(
            @RequestParam String query
    ) {
        return carbonAiService.generateAdvice(query);
    }

    @GetMapping("/weekly-advice")
    public String weeklyAdvice() {
        return carbonAiService.generateWeeklyAdvice();
    }
}