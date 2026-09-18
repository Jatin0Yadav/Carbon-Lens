import { useEffect, useState } from "react";
import {
    ArrowRight,
    Car,
    Leaf,
    Utensils,
    Zap
} from "lucide-react";
import { Link } from "react-router-dom";
import { getDashboard } from "../services/api";

function Dashboard() {

    const [dashboard, setDashboard] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const loadDashboard = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await getDashboard();

            setDashboard(response.data);

        } catch (err) {
            console.error(err);
            setError("Unable to load your carbon data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div className="carbon-state">
                <Leaf size={20} />
                <span>Loading...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="carbon-state">
                <strong>{error}</strong>

                <button onClick={loadDashboard}>
                    Try again
                </button>
            </div>
        );
    }

    const total = dashboard.totalCarbonEmission;
    const target = dashboard.weeklyTarget;
    const percentage = dashboard.targetPercentage;
    const remaining = dashboard.remainingOrExceeded;

    const breakdown = dashboard.categoryBreakdown || {};

    const transportation = breakdown.TRANSPORTATION || 0;
    const food = breakdown.FOOD || 0;
    const energy = breakdown.ENERGY || 0;

    const transportationPercent =
        total > 0
            ? Math.round((transportation / total) * 100)
            : 0;

    const foodPercent =
        total > 0
            ? Math.round((food / total) * 100)
            : 0;

    const energyPercent =
        total > 0
            ? Math.round((energy / total) * 100)
            : 0;

    const dominantCategory =
        transportation >= energy && transportation >= food
            ? "Transportation"
            : energy >= food
                ? "Energy"
                : "Food";

    const dominantValue =
        dominantCategory === "Transportation"
            ? transportation
            : dominantCategory === "Energy"
                ? energy
                : food;

    const dominantPercentage =
        total > 0
            ? Math.round((dominantValue / total) * 100)
            : 0;

    const targetExceeded = remaining < 0;

    return (
        <div className="carbon-dashboard">

            <header className="carbon-header">

                <div className="carbon-logo">
                    CARBONLENS
                </div>

                <div className="carbon-period">
                    WEEKLY OVERVIEW
                </div>

            </header>


            <section className="carbon-hero">

                <div className="carbon-title">
                    <h1>Your carbon footprint</h1>

                    <p>
                        This week's emissions
                    </p>
                </div>


                <div className="carbon-number">

                    <span className="carbon-number-value">
                        {total.toFixed(2)}
                    </span>

                    <span className="carbon-number-unit">
                        kg CO₂e
                    </span>

                </div>


                <div className="carbon-target">

                    <div className="carbon-target-track">

                        <div
                            className={`carbon-target-fill ${
                                targetExceeded
                                    ? "is-exceeded"
                                    : ""
                            }`}
                            style={{
                                width: `${Math.min(
                                    percentage,
                                    100
                                )}%`
                            }}
                        />

                    </div>


                    <div className="carbon-target-info">

                        <span>
                            {percentage.toFixed(1)}% used
                        </span>

                        <span>
                            {target} kg target
                        </span>

                    </div>

                </div>

            </section>


            <section className="carbon-profile">

                <h2>
                    Emission profile
                </h2>


                <EmissionRow
                    icon={<Car size={15} />}
                    label="Transportation"
                    value={transportation}
                    percentage={transportationPercent}
                    type="transportation"
                    total={total}
                />


                <EmissionRow
                    icon={<Utensils size={15} />}
                    label="Food"
                    value={food}
                    percentage={foodPercent}
                    type="food"
                    total={total}
                />


                <EmissionRow
                    icon={<Zap size={15} />}
                    label="Energy"
                    value={energy}
                    percentage={energyPercent}
                    type="energy"
                    total={total}
                />

            </section>


            <section className="carbon-status">

                <div className="carbon-status-main">

                    <span>
                        {targetExceeded
                            ? "Above weekly target"
                            : "Remaining this week"}
                    </span>

                    <strong>
                        {Math.abs(remaining).toFixed(2)}

                        <small>
                            kg CO₂e
                        </small>
                    </strong>

                </div>


                <div className="carbon-status-target">

                    <span>
                        Weekly target
                    </span>

                    <strong>
                        {target} kg
                    </strong>

                </div>

            </section>


            <section className="carbon-signal">

                <div className="carbon-signal-marker" />


                <div className="carbon-signal-body">

                    <span>
                        CarbonLens signal
                    </span>

                    <h2>
                        {dominantCategory} is driving your footprint.
                    </h2>

                    <p>
                        {dominantValue.toFixed(2)} kg CO₂e
                        {" "}({dominantPercentage}%)
                        of this week's emissions came from{" "}
                        {dominantCategory.toLowerCase()}.
                    </p>

                </div>


                <Link
                    to="/ai-insights"
                    className="carbon-signal-action"
                >
                    Explore insight
                    <ArrowRight size={14} />
                </Link>

            </section>


            <div className="carbon-actions">

                <Link
                    to="/log-activity"
                    className="carbon-log"
                >
                    <span>+</span>
                    Log activity
                </Link>

            </div>

        </div>
    );
}


function EmissionRow({
    icon,
    label,
    value,
    percentage,
    type,
    total
}) {

    const width =
        total > 0
            ? (value / total) * 100
            : 0;

    return (
        <div className="emission-row">

            <div className={`emission-icon ${type}`}>
                {icon}
            </div>


            <div className="emission-content">

                <div className="emission-top">

                    <span>
                        {label}
                    </span>

                    <strong>
                        {value.toFixed(2)} kg
                    </strong>

                </div>


                <div className="emission-track">

                    <div
                        className={`emission-fill ${type}`}
                        style={{
                            width: `${width}%`
                        }}
                    />

                </div>

            </div>


            <span className="emission-percentage">
                {percentage}%
            </span>

        </div>
    );
}


export default Dashboard;