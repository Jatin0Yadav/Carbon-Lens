import { useEffect, useState } from "react";
import { Target, Check } from "lucide-react";
import { getTarget, setTarget } from "../services/api";

function TargetForm({ onTargetUpdated }) {

    const [target, setTargetValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadTarget = async () => {

            try {

                const response = await getTarget();

                setTargetValue(response.data.target);

            } catch (error) {

                console.error(
                    "Failed to load target:",
                    error
                );

            }
        };

        loadTarget();

    }, []);

    const handleSubmit = async (event) => {

        event.preventDefault();

        const value = Number(target);

        if (!value || value < 1 || value > 1000) {
            setError(
                "Target must be between 1 and 1000 kg."
            );
            return;
        }

        try {

            setLoading(true);
            setError("");
            setSaved(false);

            await setTarget({
                target: value
            });

            setSaved(true);

            if (onTargetUpdated) {
                onTargetUpdated();
            }

            setTimeout(() => {
                setSaved(false);
            }, 2500);

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Unable to update target."
            );

        } finally {

            setLoading(false);

        }
    };

    return (
        <div className="target-editor">

            <div className="target-editor-icon">
                <Target size={21} />
            </div>

            <div className="target-editor-content">

                <span className="section-kicker">
                    PERSONAL GOAL
                </span>

                <h2>
                    Weekly carbon target
                </h2>

                <p>
                    Choose the maximum amount of CO₂ you'd like
                    to stay within each week.
                </p>

            </div>


            <form
                className="target-editor-form"
                onSubmit={handleSubmit}
            >

                <div className="target-input-wrapper">

                    <input
                        type="number"
                        min="1"
                        max="1000"
                        step="0.1"
                        value={target}
                        onChange={(event) =>
                            setTargetValue(event.target.value)
                        }
                    />

                    <span>
                        kg CO₂ / week
                    </span>

                </div>

                <button
                    className="primary-button"
                    type="submit"
                    disabled={loading}
                >
                    {saved ? (
                        <>
                            <Check size={17} />
                            Saved
                        </>
                    ) : loading ? (
                        "Saving..."
                    ) : (
                        "Save target"
                    )}
                </button>

            </form>


            {error && (
                <div className="form-message error">
                    {error}
                </div>
            )}

        </div>
    );
}

export default TargetForm;