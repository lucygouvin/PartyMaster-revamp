import Auth from "./utils/auth";
import "./styles/Header.css";

const Header = () => {
  const loggedIn = Auth.loggedIn();

  return (
    <header className="header">
      <a href="/">
        {" "}
        <h1>PartyMaster</h1>
      </a>
      <div className="header-button-group">
        {loggedIn ? (
          <a href="/dashboard">
            <button className="button dashboard-button">Dashboard</button>
          </a>
        ) : (
          <a href="/login">
            <button className="button dashboard-button">Log In</button>
          </a>
        )}
        <a href="/create-event">
          {" "}
          <button className="button create-button">Create Event</button>
        </a>
      </div>
    </header>
  );
};

export default Header;
