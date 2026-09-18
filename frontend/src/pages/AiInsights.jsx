import { useEffect, useMemo, useState } from "react";
import {
    ArrowRight,
    Brain,
    Car,
    RefreshCw,
    Sparkles,
    Utensils,
    Zap
} from "lucide-react";
import { getActivities, getDashboard } from "../services/api";
import api from "../services/api";

function AIInsights() {

    const [dashboard, setDashboard] = useState(null);
    const [activities, setActivities] = useState([]);
    const [insight, setInsight] = useState("");
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [error, setError] = useState("");

    const loadInsights = async () => {

        try {
            setError("");

            const [dashboardResponse, activitiesResponse] =
                await Promise.all([
                    getDashboard(),
                    getActivities()
                ]);

            setDashboard(dashboardResponse.data);
            setActivities(activitiesResponse.data);

            await generateInsight(
                dashboardResponse.data
            );

        } catch (err) {

            console.error(err);
            setError(
                "Unable to generate your carbon insights."
            );

        } finally {

            setLoading(false);
            setRefreshing(false);
        }
    };


    const generateInsight = async (data) => {

        const breakdown =
            data.categoryBreakdown || {};

        const transportation =
            breakdown.TRANSPORTATION || 0;

        const food =
            breakdown.FOOD || 0;

        const energy =
            breakdown.ENERGY || 0;

        const dominant =
            transportation >= energy && transportation >= food
                ? "transportation"
                : energy >= food
                    ? "energy"
                    : "food";

        try {

            const response = await api.get(
                "/ai/coach",
                {
                    params: {
                        query: `
                            Give me one concise personalized
                            sustainability recommendation based
                            on my weekly carbon footprint.

                            My dominant category is ${dominant}.
                            Transportation emissions:
                            ${transportation} kg CO2e.

                            Food emissions:
                            ${food} kg CO2e.

                            Energy emissions:
                            ${energy} kg CO2e.

                            Focus specifically on the dominant
                            category. Keep the recommendation
                            practical, encouraging and concise.
                        `
                    }
                }
            );

            setInsight(response.data);

        } catch (err) {

            console.error(err);

            setInsight(
                `Your ${dominant} footprint is currently your largest contributor this week.`
            );
        }
    };


    useEffect(() => {
        loadInsights();
    }, []);


    const refreshInsight = async () => {

        setRefreshing(true);

        if (dashboard) {
            await generateInsight(dashboard);
        } else {
            await loadInsights();
        }

        setRefreshing(false);
    };


    const weeklyData = useMemo(
        () => createWeeklyData(activities),
        [activities]
    );


    if (loading) {
        return (
            <div className="ai-new-state">
                <Sparkles size={22} />
                <span>Analyzing your footprint...</span>
            </div>
        );
    }


    if (error) {
        return (
            <div className="ai-new-state">

                <strong>
                    {error}
                </strong>

                <button onClick={loadInsights}>
                    Try again
                </button>

            </div>
        );
    }


    const total =
        dashboard?.totalCarbonEmission || 0;


    return (
        <main className="ai-new-page">

            {/* HEADER */}

            <header className="ai-new-header">

                <div>

                    <span className="ai-new-kicker">
                        CARBONLENS
                    </span>

                    <h1>
                        AI Insights
                    </h1>

                    <p>
                        Understand the patterns behind your footprint.
                    </p>

                </div>


                <button
                    className="ai-new-refresh"
                    onClick={refreshInsight}
                    disabled={refreshing}
                >

                    <RefreshCw
                        size={15}
                        className={
                            refreshing
                                ? "ai-refresh-spin"
                                : ""
                        }
                    />

                    {refreshing
                        ? "Analyzing"
                        : "Refresh insight"}

                </button>

            </header>


            {/* AI COACH */}

            <section className="ai-new-coach">

                <div className="ai-new-coach-top">

                    <div className="ai-new-coach-icon">
                        <Brain size={20} />
                    </div>

                    <div>

                        <span>
                            CARBONLENS AI COACH
                        </span>

                        <h2>
                            Your weekly signal
                        </h2>

                    </div>

                </div>


                <div className="ai-new-insight">

                    <Sparkles size={17} />

                    <p>
                        {insight}
                    </p>

                </div>


                <div className="ai-new-coach-footer">

                    <span>
                        Generated from your footprint + sustainability knowledge
                    </span>

                    <span>
                        {total.toFixed(2)} kg CO₂e this week
                    </span>

                </div>

            </section>


            {/* TRENDS */}

            <section className="ai-new-trends">

                <div className="ai-new-section-heading">

                    <div>

                        <span>
                            WEEKLY PATTERNS
                        </span>

                        <h2>
                            How your footprint moved
                        </h2>

                    </div>

                </div>


                <div className="ai-chart-grid">

                    <TrendCard
                        title="Transportation"
                        icon={<Car size={17} />}
                        type="transportation"
                        data={weeklyData}
                    />


                    <TrendCard
                        title="Food"
                        icon={<Utensils size={17} />}
                        type="food"
                        data={weeklyData}
                    />


                    <TrendCard
                        title="Energy"
                        icon={<Zap size={17} />}
                        type="energy"
                        data={weeklyData}
                    />

                </div>

            </section>


            {/* ACTION */}

            <div className="ai-new-action">

                <div>

                    <span>
                        NEXT STEP
                    </span>

                    <strong>
                        Log another activity to keep your pattern accurate.
                    </strong>

                </div>


                <a href="/log-activity">
                    Log activity
                    <ArrowRight size={15} />
                </a>

            </div>

        </main>
    );
}


/* =========================================================
   CREATE WEEKLY DATA
   ========================================================= */

function createWeeklyData(activities) {

    const today = new Date();

    const day =
        today.getDay();

    const mondayOffset =
        day === 0 ? -6 : 1 - day;

    const monday =
        new Date(today);

    monday.setHours(0, 0, 0, 0);

    monday.setDate(
        today.getDate() + mondayOffset
    );


    const days = Array.from(
        { length: 7 },
        (_, index) => {

            const date =
                new Date(monday);

            date.setDate(
                monday.getDate() + index
            );

            return {
                date,
                label: date.toLocaleDateString(
                    "en-US",
                    { weekday: "short" }
                ),
                transportation: 0,
                food: 0,
                energy: 0
            };
        }
    );


    activities.forEach(activity => {

        const activityDate =
            new Date(activity.loggedAt);

        activityDate.setHours(0, 0, 0, 0);


        const index =
            Math.round(
                (
                    activityDate.getTime()
                    -
                    monday.getTime()
                )
                /
                (1000 * 60 * 60 * 24)
            );


        if (index < 0 || index > 6) {
            return;
        }


        const emission =
            Number(activity.carbonEmission) || 0;


        switch (activity.type) {

            case "CAR":
            case "BUS":
            case "FLIGHT":

                days[index].transportation += emission;

                break;


            case "VEG_MEAL":
            case "NON_VEG_MEAL":

                days[index].food += emission;

                break;


            case "ELECTRICITY":

                days[index].energy += emission;

                break;

            default:
                break;
        }

    });


    return days.map(day => ({
        ...day,

        transportation:
            round(day.transportation),

        food:
            round(day.food),

        energy:
            round(day.energy)
    }));
}


function round(value) {
    return Math.round(value * 100) / 100;
}


/* =========================================================
   TREND CARD
   ========================================================= */

function TrendCard({
    title,
    icon,
    type,
    data
}) {

    const values =
        data.map(day => day[type]);

    const total =
        values.reduce(
            (sum, value) => sum + value,
            0
        );


    return (
        <article className={`ai-chart-card ${type}`}>

            <div className="ai-chart-header">

                <div className="ai-chart-title">

                    <div className="ai-chart-icon">
                        {icon}
                    </div>

                    <div>

                        <h3>
                            {title}
                        </h3>

                        <span>
                            {total.toFixed(2)} kg this week
                        </span>

                    </div>

                </div>

                <strong>
                    {getPeak(values).toFixed(2)}
                </strong>

            </div>


            <div className="ai-line-chart">

                <LineChart
                    data={data}
                    dataKey={type}
                />

            </div>


            <div className="ai-chart-days">

                {data.map(day => (
                    <span key={day.label}>
                        {day.label}
                    </span>
                ))}

            </div>

        </article>
    );
}


function getPeak(values) {

    if (!values.length) {
        return 0;
    }

    return Math.max(...values);
}


/* =========================================================
   SVG LINE CHART
   ========================================================= */

function LineChart({
    data,
    dataKey
}) {

    const width = 500;
    const height = 150;

    const paddingX = 8;
    const paddingY = 15;

    const values =
        data.map(item => Number(item[dataKey]) || 0);

    const max =
        Math.max(...values, 1);


    const points =
        values.map((value, index) => {

            const x =
                paddingX +
                (
                    index /
                    (values.length - 1)
                ) *
                (width - paddingX * 2);


            const y =
                height -
                paddingY -
                (
                    value / max
                ) *
                (
                    height -
                    paddingY * 2
                );


            return {
                x,
                y,
                value
            };
        });


    const linePath =
        points
            .map((point, index) =>
                `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
            )
            .join(" ");


    const areaPath = `
        ${linePath}
        L ${width - paddingX} ${height - paddingY}
        L ${paddingX} ${height - paddingY}
        Z
    `;


    return (
        <svg
            viewBox={`0 0 ${width} ${height}`}
            preserveAspectRatio="none"
            className="ai-svg"
        >

            <defs>

                <linearGradient
                    id={`gradient-${dataKey}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                >

                    <stop
                        offset="0%"
                        stopColor="rgba(88, 126, 101, 0.20)"
                    />

                    <stop
                        offset="100%"
                        stopColor="rgba(88, 126, 101, 0)"
                    />

                </linearGradient>

            </defs>


            {/* GRID */}

            <line
                x1="0"
                y1="25"
                x2={width}
                y2="25"
                className="ai-grid-line"
            />

            <line
                x1="0"
                y1="75"
                x2={width}
                y2="75"
                className="ai-grid-line"
            />

            <line
                x1="0"
                y1="125"
                x2={width}
                y2="125"
                className="ai-grid-line"
            />


            {/* AREA */}

            <path
                d={areaPath}
                className={`ai-area ${dataKey}`}
            />


            {/* LINE */}

            <path
                d={linePath}
                className={`ai-line ${dataKey}`}
                fill="none"
            />


            {/* POINTS */}

            {points.map((point, index) => (

                <circle
                    key={index}
                    cx={point.x}
                    cy={point.y}
                    r="3.5"
                    className={`ai-point ${dataKey}`}
                />

            ))}

        </svg>
    );
}


export default AIInsights;