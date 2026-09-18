package org.example.carbonfootprinttracker.ai;

import lombok.RequiredArgsConstructor;
import org.example.carbonfootprinttracker.dashboard.DashboardResponse;
import org.example.carbonfootprinttracker.dashboard.DashboardService;
import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.document.Document;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class CarbonAiService {

    private final ChatClient chatClient;
    private final CarbonRagService carbonRagService;
    private final DashboardService dashboardService;

    public String generateAdvice(String query) {

        List<Document> documents =
                carbonRagService.retrieve(query);

        String context = documents.stream()
                .map(Document::getText)
                .reduce("", (a, b) -> a + "\n\n" + b);

        return chatClient
                .prompt()
                .system("""
                        You are CarbonLens AI Coach.

                        Give practical, concise and encouraging
                        sustainability advice.

                        Use ONLY the provided knowledge context
                        for sustainability recommendations.

                        Do not invent facts.

                        Never shame or blame the user.
                        Never recommend extreme changes.

                        Knowledge context:
                        %s
                        """.formatted(context))
                .user(query)
                .call()
                .content();
    }

    public String generateWeeklyAdvice() {

        DashboardResponse dashboard =
                dashboardService.getWeeklyDashboard();

        String dominantCategory =
                getDominantCategory(
                        dashboard.categoryBreakdown()
                );

        List<Document> documents =
                carbonRagService.retrieve(
                        "How can I reduce my " +
                                dominantCategory.toLowerCase() +
                                " carbon emissions?"
                );

        String context = documents.stream()
                .map(Document::getText)
                .reduce("", (a, b) -> a + "\n\n" + b);

        return chatClient
                .prompt()
                .system("""
                        You are CarbonLens AI Coach.

                        Give one practical and personalized
                        sustainability recommendation.

                        Use the user's actual carbon data.

                        Use the provided knowledge context
                        to support your recommendation.

                        Do not calculate or change carbon
                        emission values.

                        Never shame the user.
                        Never recommend extreme lifestyle changes.

                        Keep the response concise:
                        2-4 sentences.

                        User's weekly carbon data:
                        Total emissions: %s kg CO₂
                        Weekly target: %s kg CO₂
                        Target used: %s%%
                        Dominant category: %s

                        Knowledge context:
                        %s
                        """.formatted(
                        dashboard.totalCarbonEmission(),
                        dashboard.weeklyTarget(),
                        dashboard.targetPercentage(),
                        dominantCategory,
                        context
                ))
                .user("""
                        Give me my personalized CarbonLens
                        recommendation for this week.
                        """)
                .call()
                .content();
    }

    private String getDominantCategory(
            Map<String, Double> breakdown
    ) {
        return breakdown.entrySet()
                .stream()
                .max(Map.Entry.comparingByValue())
                .map(Map.Entry::getKey)
                .orElse("TRANSPORTATION");
    }
}