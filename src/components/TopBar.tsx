import React from "react";
import "../styles/TopBar.css";

export default function TopBar() {
  return (
    <div className="top-bar">
      <div className="name">CV Builder</div>
      <div className="caption grey">
        <div className="author">
          <span className="grey">by</span> Jakub Malý
        </div>
        <a href="https://xmaly.github.io/resume/" target="_blank">
          <span className="material-symbols-outlined website">
            captive_portal
          </span>
        </a>
      </div>
    </div>
  );
}
