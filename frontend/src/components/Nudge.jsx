import {
    Leaf,
    ArrowUpRight,
    CircleAlert
} from "lucide-react";

function Nudge({ percentage, remaining }) {

    let variant;
    let icon;
    let title;
    let message;

    if (percentage >= 100) {

        variant = "danger";
        icon = CircleAlert;

        title = "You've exceeded your weekly target.";

        message =
            `${Math.abs(remaining)} kg CO₂ over your target. ` +
            "Consider a lower-emission alternative for your next activity.";

    } else if (percentage >= 95) {

        variant = "orange";
        icon = CircleAlert;

        title = "You're almost at your weekly target.";

        message =
            `Only ${remaining} kg CO₂ remaining this week. ` +
            "A mindful choice can help keep you within your goal.";

    } else if (percentage >= 80) {

        variant = "warning";
        icon = ArrowUpRight;

        title = "You're approaching your weekly target.";

        message =
            `${remaining} kg CO₂ remaining this week. ` +
            "You're getting close to your planned footprint.";

    } else if (percentage >= 60) {

        variant = "teal";
        icon = ArrowUpRight;

        title = "You're getting closer to your target.";

        message =
            `${remaining} kg CO₂ remaining this week. ` +
            "Keep an eye on your next few activities.";

    } else {

        variant = "good";
        icon = Leaf;

        title = "You're on track this week.";

        message =
            `${remaining} kg CO₂ remaining. ` +
            "Keep making mindful choices.";
    }

    const Icon = icon;

    return (
        <div className={`nudge nudge-${variant}`}>

            <div className="nudge-icon">
                <Icon size={19} />
            </div>

            <div className="nudge-content">
                <strong>{title}</strong>
                <p>{message}</p>
            </div>

        </div>
    );
}

export default Nudge;