import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useParams
} from "react-router-dom";

// Login Page
function Login() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Login Page</h2>
      <input placeholder="Username" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <button onClick={() => navigate("/movies")}>Login</button>
    </div>
  );
}

// Movies Page
function Movies() {
  const movies = ["Avengers", "Inception", "Interstellar"];
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Movie List</h2>
      {movies.map((m, i) => (
        <div key={i}>
          <Link to={`/seats/${m}`}>{m}</Link>
        </div>
      ))}
    </div>
  );
}

// Seat Selection
function Seats() {
  const { movie } = useParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState([]);

  const seats = [1,2,3,4,5,6,7,8];

  const toggleSeat = (seat) => {
    if (selected.includes(seat)) {
      setSelected(selected.filter(s => s !== seat));
    } else {
      setSelected([...selected, seat]);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h2>Select Seats for {movie}</h2>

      {seats.map(seat => (
        <button
          key={seat}
          onClick={() => toggleSeat(seat)}
          style={{
            margin: "5px",
            background: selected.includes(seat) ? "green" : "gray"
          }}
        >
          {seat}
        </button>
      ))}

      <br /><br />
      <button onClick={() => navigate("/payment")}>
        Proceed to Payment
      </button>
    </div>
  );
}

// Payment Page
function Payment() {
  const navigate = useNavigate();
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Payment Page</h2>
      <button onClick={() => navigate("/confirmation")}>
        Pay Now
      </button>
    </div>
  );
}

// Confirmation Page
function Confirmation() {
  return (
    <div style={{ textAlign: "center" }}>
      <h2>Booking Confirmed 🎉</h2>
      <Link to="/movies">Book Again</Link>
    </div>
  );
}

// Main App
export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Login</Link> |{" "}
        <Link to="/movies">Movies</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/seats/:movie" element={<Seats />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </Router>
  );
}