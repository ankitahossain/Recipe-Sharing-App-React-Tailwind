import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="bg-black text-white p-2 rounded">
      Switch to {darkMode ? "Light" : "Dark"} Mode
    </button>
  );
}
