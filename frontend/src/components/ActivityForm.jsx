import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { createActivity } from "../services/api";

const activityOptions = [
    {
        value: "CAR",
        label: "Car",
        unit: "km",
        description: "Personal car travel"
    },
    {
        value: "BUS",
        label: "Bus",
        unit: "km",
        description: "Public bus travel"
    },
    {
        value: "FLIGHT",
        label: "Flight",
        unit: "km",
        description: "Air travel"
    },
    {
        value: "ELECTRICITY",
        label: "Electricity",
        unit: "kWh",
        description: "Electricity consumed"
    },
    {
        value: "VEG_MEAL",
        label: "Vegetarian meal",
        unit: "meal",
        description: "One vegetarian meal"
    },
    {
        value: "NON_VEG_MEAL",
        label: "Non-vegetarian meal",
        unit: "meal",
        description: "One non-vegetarian meal"
    }
];

function ActivityForm({ onActivityAdded }) {

    const [type, setType] = useState("CAR");
    const [quantity, setQuantity] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);
    const [error, setError] = useState("");

    const selectedActivity =
        activityOptions.find(
            activity => activity.value === type
        );

    const handleSubmit = async (event) => {

        event.preventDefault();

        if (!quantity || Number(quantity) <= 0) {
            setError("Please enter a valid quantity.");
            return;
        }

        try {

            setLoading(true);
            setError("");
            setSuccess(null);

            const response = await createActivity({
                type,
                quantity: Number(quantity)
            });

            setQuantity("");
            setSuccess(response.data);

            if (onActivityAdded) {
                onActivityAdded();
            }

        } catch (err) {

            console.error(err);

            setError(
                err.response?.data?.message ||
                "Unable to log activity. Please try again."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="form-card">

            <div className="form-card-header">

                <div>
                    <span className="section-kicker">
                        QUICK LOG
                    </span>

                    <h2>
                        What did you do?
                    </h2>

                    <p>
                        Add an activity and we'll calculate its
                        estimated carbon impact.
                    </p>
                </div>

                <div className="form-leaf">
                    🌱
                </div>

            </div>


            <form onSubmit={handleSubmit}>

                <div className="form-grid">

                    <div className="field">

                        <label>
                            Activity
                        </label>

                        <select
                            value={type}
                            onChange={(event) =>
                                setType(event.target.value)
                            }
                        >
                            {activityOptions.map(activity => (

                                <option
                                    key={activity.value}
                                    value={activity.value}
                                >
                                    {activity.label}
                                </option>

                            ))}
                        </select>

                        <span className="field-hint">
                            {selectedActivity.description}
                        </span>

                    </div>


                    <div className="field">

                        <label>
                            Quantity
                        </label>

                        <div className="input-with-unit">

                            <input
                                type="number"
                                min="0.01"
                                max="5000"
                                step="0.01"
                                value={quantity}
                                onChange={(event) =>
                                    setQuantity(event.target.value)
                                }
                                placeholder="0.00"
                            />

                            <span>
                                {selectedActivity.unit}
                            </span>

                        </div>

                        <span className="field-hint">
                            Enter the amount consumed or travelled.
                        </span>

                    </div>

                </div>


                <button
                    className="primary-button"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Calculating..." : "Log activity"}
                </button>

            </form>


            {error && (
                <div className="form-message error">
                    {error}
                </div>
            )}


            {success && (

                <div className="success-card">

                    <CheckCircle2 size={20} />

                    <div>
                        <strong>
                            Activity logged
                        </strong>

                        <span>
                            {success.carbonEmission} kg CO₂ added to
                            your weekly footprint.
                        </span>
                    </div>

                </div>

            )}

        </div>
    );
}

export default ActivityForm;