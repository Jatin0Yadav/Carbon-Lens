package org.example.carbonfootprinttracker.activity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "activities")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ActivityType type;

    @Column(nullable = false)
    private double quantity;

    @Column(nullable = false)
    private String unit;

    @Column(nullable = false)
    private double carbonEmission;

    @Column(nullable = false)
    private LocalDateTime loggedAt;
}