const categoryNames = {
    TRANSPORTATION: "Transportation",
    ENERGY: "Energy",
    FOOD: "Food"
};

const categoryIcons = {
    TRANSPORTATION: "↗",
    ENERGY: "⚡",
    FOOD: "●"
};

function CategoryBreakdown({ breakdown, total }) {

    const categories = Object.entries(breakdown);

    if (categories.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-icon">
                    🌱
                </div>

                <strong>
                    Nothing logged this week
                </strong>

                <span>
                    Start tracking your activities to see your footprint.
                </span>
            </div>
        );
    }

    return (
        <div className="category-list">

            {categories.map(([category, value]) => {

                const percentage =
                    total === 0
                        ? 0
                        : (value / total) * 100;

                return (
                    <div
                        className="category-row"
                        key={category}
                    >

                        <div className="category-heading">

                            <div className={`category-dot ${category.toLowerCase()}`}>
                                {categoryIcons[category]}
                            </div>

                            <div>
                                <strong>
                                    {categoryNames[category] || category}
                                </strong>

                                <span>
                                    {percentage.toFixed(0)}% of footprint
                                </span>
                            </div>

                            <b>
                                {value} kg
                            </b>

                        </div>

                        <div className="category-track">

                            <div
                                className={`category-fill ${category.toLowerCase()}`}
                                style={{
                                    width: `${percentage}%`
                                }}
                            />

                        </div>

                    </div>
                );
            })}

        </div>
    );
}

export default CategoryBreakdown;