import React from "react";

function Navigation(props) {
  return (
    <div className="Nav-Container">
      <ul className="Nav-item">
        <li>Home</li>
        <li>
          <input type="search" placeholder="search" />
          <button>Search</button>
        </li>
        <li>Profile</li>
      </ul>
    </div>
  );
}

export default Navigation;
