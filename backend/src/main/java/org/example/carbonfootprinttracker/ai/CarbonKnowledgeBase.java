package org.example.carbonfootprinttracker.ai;

import lombok.RequiredArgsConstructor;
import org.springframework.ai.document.Document;
import org.springframework.ai.vectorstore.VectorStore;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class CarbonKnowledgeBase implements CommandLineRunner {

    private final VectorStore vectorStore;

    @Override
    public void run(String... args) {

        List<Document> documents = List.of(

                new Document("""
                        Transportation emissions can often be reduced by
                        choosing public transportation, walking, cycling,
                        carpooling, or combining multiple trips into one.
                        Public transportation generally produces fewer
                        emissions per passenger than driving alone.
                        """),

                new Document("""
                        Electricity consumption contributes to carbon
                        emissions depending on how electricity is generated.
                        Reducing unnecessary electricity usage can lower
                        household carbon emissions. Efficient appliances,
                        LED lighting, and switching off unused devices can
                        reduce electricity consumption.
                        """),

                new Document("""
                        Food choices influence an individual's carbon
                        footprint. Plant-based meals generally have lower
                        greenhouse gas emissions than meals containing
                        significant amounts of animal products.
                        Increasing plant-based meals can be one practical
                        way to reduce food-related emissions.
                        """),

                new Document("""
                        Air travel can contribute significantly to an
                        individual's carbon footprint. For trips where
                        practical alternatives exist, trains or other forms
                        of ground transportation can reduce travel-related
                        emissions.
                        """),

                new Document("""
                        Small behavioral changes can reduce carbon emissions.
                        Instead of making extreme changes, people can focus
                        on repeatable actions such as reducing unnecessary
                        car trips, conserving electricity, choosing lower
                        emission meals, and using public transportation.
                        """
                )
        );

        vectorStore.add(documents);

        System.out.println(
                "Carbon knowledge base initialized with "
                        + documents.size()
                        + " documents."
        );
    }
}