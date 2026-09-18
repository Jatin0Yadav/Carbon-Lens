function StatCard({
    label,
    value,
    description,
    icon: Icon,
    variant = "default"
}) {

    return (
        <div className={`stat-card stat-${variant}`}>

            <div className="stat-top">

                <span className="stat-label">
                    {label}
                </span>

                <div className="stat-icon">
                    <Icon size={18} />
                </div>

            </div>

            <div className="stat-value">
                {value}
            </div>

            <div className="stat-description">
                {description}
            </div>

        </div>
    );
}

export default StatCard;