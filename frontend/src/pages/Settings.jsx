import { useEffect, useState } from "react";
import { Target, Check, Leaf } from "lucide-react";
import { getTarget, setTarget } from "../services/api";

const presets = [20, 35, 50, 75];

function Settings() {

    const [target, setTargetValue] = useState(35);
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadTarget = async () => {
            try {
                const response = await getTarget();
                setTargetValue(response.data.target);
            } catch (error) {
                console.error("Failed to load target:", error);
            }
        };

        loadTarget();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const value = Number(target);

        if (!value || value < 1 || value > 1000) {
            setError("Target must be between 1 and 1000 kg.");
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
        <div className="page target-page">

            <div className="page-header target-header">

                <div>
                    <span className="section-kicker">
                        WEEKLY GOAL
                    </span>

                    <h1>
                        Set your carbon target.
                    </h1>

                    <p>
                        Choose a weekly limit that gives your footprint
                        a clear direction.
                    </p>
                </div>

                <div className="target-week">
                    <Leaf size={15} />
                    Monday — Sunday
                </div>

            </div>

            <div className="target-layout">

                <div className="target-main-card">

                    <div className="target-card-top">

                        <div className="target-icon">
                            <Target size={22} />
                        </div>

                        <div>
                            <span className="target-label">
                                WEEKLY CARBON BUDGET
                            </span>

                            <p>
                                Your personal CO₂ limit
                            </p>
                        </div>

                    </div>

                    <div className="target-value">

                        <input
                            type="number"
                            min="1"
                            max="1000"
                            step="0.1"
                            value={target}
                            onChange={(event) => {
                                setTargetValue(event.target.value);
                                setSaved(false);
                            }}
                        />

                        <span>
                            kg CO₂
                        </span>

                    </div>

                    <input
                        className="target-slider"
                        type="range"
                        min="1"
                        max="150"
                        step="0.5"
                        value={Math.min(Number(target) || 1, 150)}
                        onChange={(event) => {
                            setTargetValue(event.target.value);
                            setSaved(false);
                        }}
                    />

                    <div className="slider-labels">
                        <span>1 kg</span>
                        <span>150 kg</span>
                    </div>

                    <div className="preset-section">

                        <span>
                            Quick select
                        </span>

                        <div className="preset-buttons">

                            {presets.map(value => (
                                <button
                                    key={value}
                                    type="button"
                                    className={
                                        Number(target) === value
                                            ? "preset active"
                                            : "preset"
                                    }
                                    onClick={() => {
                                        setTargetValue(value);
                                        setSaved(false);
                                    }}
                                >
                                    {value} kg
                                </button>
                            ))}

                        </div>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <button
                            className="target-save-button"
                            type="submit"
                            disabled={loading}
                        >
                            {saved ? (
                                <>
                                    <Check size={17} />
                                    Target saved
                                </>
                            ) : (
                                <>
                                    Save weekly target
                                </>
                            )}
                        </button>

                    </form>

                    {error && (
                        <div className="form-message error">
                            {error}
                        </div>
                    )}

                </div>

                <div className="target-side-card">

                    <div className="target-side-number">
                        {target}
                    </div>

                    <span>
                        kg CO₂ / week
                    </span>

                    <div className="target-side-divider" />

                    <p>
                        This target will be used to measure your
                        weekly footprint and trigger personalized
                        nudges as you approach the limit.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Settings;