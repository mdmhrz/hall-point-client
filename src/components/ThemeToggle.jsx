import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        // Read theme from localStorage on first render
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        // Update data-theme attribute
        document.documentElement.setAttribute("data-theme", theme);
        // Save theme to localStorage
        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => (prev === "light" ? "dark" : "light"));
    };

    return (
        <button
            onClick={toggleTheme}
            className="btn rounded-full w-10 h-10 btn-outline border-accent text-primary bg-transparent hover:bg-black/20"
            aria-label="Toggle Theme"
        >
            {theme === "light" ? "🌙" : "☀️"}
        </button>
    );
};

export default ThemeToggle;