import { useEffect, useState } from "react";

function ThemeSwitch() {
  const [theme, setTheme] = useState("light");
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };
  // initially set the theme and "listen" for changes to apply them to the HTML tag
  useEffect(() => {
    document?.querySelector("html")?.setAttribute("data-theme", theme);
  }, [theme]);
  return (
    <>
      <input
        type="checkbox"
        className="toggle"
        checked={theme === "light"}
        onClick={toggleTheme}
        readOnly
      />
      <span>Dark Mode</span>
    </>
  );
}

export default ThemeSwitch;
