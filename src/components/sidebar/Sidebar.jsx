import React from "react";
import { Ellipsis, Home, ListCheck, User2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { Link, useLocation } from "react-router-dom";
import Searchbar from "./Searchbar";

const navigationMenu = [
  { icon: <Home />, title: "Home", path: "/" },
  { icon: <ListCheck />, title: "My Watchlist", path: "/my-watchlist" },
];

const Sidebar = () => {
  const { user, logout } = useAuth();
  const location = useLocation().pathname;
  return (
    <div className="sidebar">
      <div className="top">
        <h2>Watchlists</h2>
        <Searchbar />
        {navigationMenu.map((navItem) => (
          <React.Fragment key={navItem.path}>
            <div className="divider" />
            <Link
              to={navItem.path}
              className={`navigation-tab ${
                location === navItem.path && "active"
              } }`}
            >
              {navItem.icon}
              <span>{navItem.title}</span>
            </Link>
          </React.Fragment>
        ))}
      </div>

      <div className="bottom">
        <div className="divider" />
        <div className="user-wrapper" title="Logout" onClick={logout}>
          <div className="user">
            <User2 />
            <span>{user.name}</span>
          </div>
          <Ellipsis />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
