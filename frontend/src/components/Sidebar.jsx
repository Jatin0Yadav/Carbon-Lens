import {
    LayoutDashboard,
    PlusCircle,
    Sparkles,
    Settings
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

    const navigation = [
        {
            label: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard
        },
        {
            label: "Log Activity",
            path: "/log-activity",
            icon: PlusCircle
        },
        {
            label: "AI Insights",
            path: "/ai-insights",
            icon: Sparkles
        },
        {
            label: "Settings",
            path: "/settings",
            icon: Settings
        }
    ];

    return (
        <aside className="sidebar">

            {/* Logo */}

            <div className="sidebar-brand">

                <div className="sidebar-logo-icon">
                    🌱
                </div>

                <div>
                    <h2 className="sidebar-title">
                        CarbonLens
                    </h2>

                    <p className="sidebar-subtitle">
                        Carbon Intelligence
                    </p>
                </div>

            </div>


            {/* Navigation */}

            <nav className="sidebar-nav">

                {navigation.map((item) => {

                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `sidebar-link ${
                                    isActive
                                        ? "sidebar-link-active"
                                        : ""
                                }`
                            }
                        >

                            <Icon size={19} strokeWidth={2} />

                            <span>
                                {item.label}
                            </span>

                        </NavLink>
                    );

                })}

            </nav>


            {/* Bottom */}

            <div className="sidebar-footer">

                <div className="sidebar-footer-icon">
                    ✨
                </div>

                <div>
                    <strong>
                        CarbonLens
                    </strong>

                    <p>
                        Make every choice count.
                    </p>
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;