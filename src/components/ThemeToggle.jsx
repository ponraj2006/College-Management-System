import { useTheme } from "../context/ThemeContext";
import { HiOutlineSun, HiOutlineMoon } from "react-icons/hi";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            className="theme-toggle-btn"
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle theme"
        >
            <span className={`theme-icon ${theme === "dark" ? "active" : ""}`}>
                <HiOutlineMoon size={18} />
            </span>
            <span className={`theme-icon ${theme === "light" ? "active" : ""}`}>
                <HiOutlineSun size={18} />
            </span>
            <span className="theme-toggle-slider" />
        </button>
    );
}
