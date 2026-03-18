// ── App Shell ──
// Clean app root with providers and router
import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "../context/ThemeContext";
import router from "./routes";
import "../App.css";

export default function App() {
    return (
        <ThemeProvider>
            <RouterProvider router={router} />
        </ThemeProvider>
    );
}
