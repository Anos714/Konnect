import { Palette, ChevronDown } from "lucide-react";
import { themes } from "../../assets/assets";
import { useThemeStore } from "../../store/useThemeStore";

const ThemeSelector = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost rounded-full gap-2 px-4 border border-base-content/10"
      >
        <Palette className="w-5 h-5" />
        <span className="hidden sm:inline capitalize">{theme}</span>
        <ChevronDown className="w-4 h-4 opacity-50" />
      </div>

      <ul
        tabIndex={0}
        className="dropdown-content z-[100] mt-3 p-2 shadow-2xl bg-base-200 rounded-2xl w-52 max-h-96 overflow-y-auto border border-base-content/5"
      >
        {themes.map((t) => (
          <li key={t}>
            <button
              className={`flex items-center justify-between w-full px-4 py-2 text-sm rounded-xl mb-1 capitalize transition-colors
                ${theme === t ? "bg-primary text-primary-content font-bold" : "hover:bg-base-300"}
              `}
              onClick={() => setTheme(t)}
            >
              {t}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeSelector;
