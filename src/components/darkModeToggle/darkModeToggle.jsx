import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import "./darkModeToggler.css";
const DarkModeToggler = observer(({ userStore }) => {
  const darkModeSettings = (e) => {
    userStore.setDarkMode(e);
    localStorage.setItem("ipfs-darkmode", JSON.stringify(e));
  };
  useEffect(() => {
    try {
      var color = JSON.parse(localStorage.getItem("ipfs-darkmode"));
      if (color === false || true) {
        userStore.setDarkMode(color);
      }
    } catch (err) {
      console.log("error" + err);
    }
  }, []);
  return (
    <div>
      <nav
        className={
          userStore.darkMode !== true
            ? "navbar  navbar-expand-lg row navbar-light bg-light"
            : "navbar navbar-expand-lg row navbar-dark bg-secondary"
        }
      >
        <a className="navbar-brand" href="#">
          Image hosting
        </a>

        <div className="" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      <button
        type="button"
        className={
          userStore.darkMode !== true ? "btn  btn-primary" : "btn  btn-info"
        }
        onClick={() => darkModeSettings(!userStore.darkMode)}
      >
        {userStore.darkMode !== true
          ? "Turn on dark mode"
          : "Turn off dark mode"}
      </button>
    </div>
  );
});

export default DarkModeToggler;
