import { useEffect, useState } from "react";
import { BiSolidMoon, BiSolidSun } from "react-icons/bi";

const Darkmode = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const element = document.documentElement;

    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return <div>{theme === "dark" ? (
    <BiSolidSun onClick={() => setTheme("light")} className="text-2xl" />
  ) : (
    <BiSolidMoon onClick={() => setTheme("dark")} className="text-2xl"/>
  )}</div>;
};

export default Darkmode;
