import { Link } from "react-router-dom";

const Header = () => {
    return (
        <nav
        style={{
            borderBottom: "solid 1px",
            paddingBottom: "1rem",
        }}
        >
            <Link to="/dashboard">Dashboard</Link> |{" "}
            <Link to="/event">Event</Link>|{" "}
            <Link to="/eventview">Event view</Link>|{" "}
            <Link to="/eventlist">Events list</Link>|{" "}
            <Link to="/openhouseattendees">Openhouse attendeas</Link>|{" "}
            <Link to="/login">Login</Link>
        </nav>
    );
}

export default Header;