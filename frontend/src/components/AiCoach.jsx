import { useEffect, useState } from "react";
import { getWeeklyAdvice } from "../services/api";

export default function AiCoach() {

    const [advice, setAdvice] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        getWeeklyAdvice()
            .then(response => {
                setAdvice(response.data);
            })
            .catch(error => {
                console.error("Failed to load AI advice", error);
                setAdvice(
                    "Unable to generate your AI recommendation right now."
                );
            })
            .finally(() => {
                setLoading(false);
            });

    }, []);

    return (
        <div className="bg-white rounded-2xl border border-gray-200 p-6">

            <div className="flex items-center gap-3 mb-4">

                <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-xl">
                    🤖
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Carbon AI Coach
                    </h2>

                    <p className="text-sm text-gray-500">
                        Personalized insight for your week
                    </p>
                </div>

            </div>

            {loading ? (
                <p className="text-gray-500">
                    Analyzing your carbon footprint...
                </p>
            ) : (
                <p className="text-gray-700 leading-relaxed">
                    {advice}
                </p>
            )}

        </div>
    );
}