import React from 'react';

const HallPointLogo = () => {
    return (
        <div>
            <svg width="300" height="40" viewBox="130 0 320 90" xmlns="http://www.w3.org/2000/svg" fill="none">

                <g>
                    <rect x="10" y="30" width="18" height="40" rx="3" fill="#0F172A" />
                    <rect x="34" y="20" width="18" height="50" rx="3" fill="#0F172A" />
                    <circle cx="52" cy="15" r="6" fill="#10B981" />
                </g>

                <text x="70" y="70" font-family="'Segoe UI', sans-serif" font-size="80" font-weight="bold" fill="#0F172A">
                    Hall
                </text>
                <text x="230" y="69" font-family="'Segoe UI', sans-serif" font-size="80" font-weight="bold" fill="#38BDF8">
                    Point
                </text>
            </svg>

        </div>
    );
};

export default HallPointLogo;