import React, { useState, useEffect } from "react";
// import Particles from "react-particles-js";
// import { ParticlesParams } from "../../Schemas/Particles";

export const Options: React.FC = () => {
  let lsTheme: string | null = "";
  let lsIcon: string | null = "";
  let lsSnow: boolean | undefined;

  // try {
  //   lsTheme = localStorage.getItem("theme");
  //   lsIcon = localStorage.getItem("icon");
  //   lsSnow = JSON.parse(localStorage.getItem("snow") || "null");
  // } catch (e) {
  //   console.error(`All Cookies blocked - Error: ${e.message}`);
  // }

  const [theme, setTheme] = useState<string>(lsTheme || "light");
  const [icon, setIcon] = useState<string>(lsIcon || "bx-moon");
  const [snow, setSnow] = useState<boolean | undefined>(lsSnow);

  useEffect(() => {
    localStorage.setItem("theme", theme);
    localStorage.setItem("icon", icon);
    localStorage.setItem("snow", JSON.stringify(snow));
    document.body.classList[theme === "dark" ? "add" : "remove"]("dark-theme");
  }, [theme, snow, icon]);

  //const SnowEffect: React.FC = () =>
    //snow && theme === "dark" ? <Particles params={ParticlesParams} /> : null;

  const enableSnow = () => setSnow((prevSnow) => !prevSnow);
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    setIcon((prevIcon) => (prevIcon === "bx-sun" ? "bx-moon" : "bx-sun"));
  };

  return (
    <div className="home__options">
      {theme === "dark" && (
        <i
          className="bx bx-cloud-snow enable-snow"
          title="Activate Snow"
          id="snow-button"
          onClick={enableSnow}
        />
      )}
      {/* //<SnowEffect /> */}
      <i
        className={`bx ${icon} change-theme`}
        title="Toggle Theme"
        id="theme-button"
        onClick={toggleTheme}
      />
    </div>
  );
};
