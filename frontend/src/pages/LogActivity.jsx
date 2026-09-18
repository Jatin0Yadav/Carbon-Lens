import { useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";
import ActivityForm from "../Components/ActivityForm";

function LogActivity() {

    const navigate = useNavigate();

    return (
        <div className="page narrow-page">

            <button
                className="back-button"
                onClick={() => navigate("/")}
            >
                <ArrowLeft size={17} />
                Back to dashboard
            </button>


            <div className="page-header">

                <div>

                    <span className="section-kicker">
                        TRACK AN ACTIVITY
                    </span>

                    <h1>
                        Log your footprint.
                    </h1>

                    <p>
                        Record something from your day and CarbonLens
                        will calculate its estimated carbon impact.
                    </p>

                </div>

            </div>


            <ActivityForm
                onActivityAdded={() => {}}
            />


            <div className="info-banner">

                <div className="info-banner-icon">
                    <Sparkles size={19} />
                </div>

                <div>

                    <strong>
                        Why track this?
                    </strong>

                    <p>
                        Consistent logging helps you understand which
                        everyday choices contribute most to your footprint.
                    </p>

                </div>

            </div>

        </div>
    );
}

export default LogActivity;