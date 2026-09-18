import {
    Car,
    Bus,
    Plane,
    Zap,
    Utensils
} from "lucide-react";

import { Leaf } from "lucide-react";

const icons = {
    CAR: Car,
    BUS: Bus,
    FLIGHT: Plane,
    ELECTRICITY: Zap,
    VEG_MEAL: Utensils,
    NON_VEG_MEAL: Utensils
};

const labels = {
    CAR: "Car",
    BUS: "Bus",
    FLIGHT: "Flight",
    ELECTRICITY: "Electricity",
    VEG_MEAL: "Vegetarian meal",
    NON_VEG_MEAL: "Non-vegetarian meal"
};

function ActivityList({ activities, limit }) {

    const displayedActivities = limit
        ? activities.slice(0, limit)
        : activities;

    if (displayedActivities.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    🌿
                </div>

                <strong>
                    No activities yet
                </strong>

                <span>
                    Your logged activities will appear here.
                </span>
            </div>
        );
    }

    return (
        <div className="activity-list">

            {displayedActivities.map(activity => {

                const Icon = icons[activity.type] || Leaf;

                return (
                    <div
                        className="activity-row"
                        key={activity.id}
                    >

                        <div className="activity-main">

                            <div className="activity-icon">
                                <Icon size={18} />
                            </div>

                            <div>
                                <strong>
                                    {labels[activity.type] || activity.type}
                                </strong>

                                <span>
                                    {activity.quantity} {activity.unit}
                                </span>
                            </div>

                        </div>

                        <div className="activity-impact">

                            <strong>
                                {activity.carbonEmission} kg
                            </strong>

                            <span>
                                CO₂
                            </span>

                        </div>

                    </div>
                );
            })}

        </div>
    );
}

export default ActivityList;