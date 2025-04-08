import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      style={{
        background: "linear-gradient(to right, #f0f8ff, #e6f7ff)",
        padding: "20px 0",
        textAlign: "center",
        boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
        fontFamily: "'Segoe UI', sans-serif",
        marginBottom: "0px",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", gap: "20px" }}>
        <Link
          to="/"
          style={{
            backgroundColor: "#ffffff",
            color: "#004085",
            textDecoration: "none",
            padding: "10px 20px",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e0f0ff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#ffffff";
          }}
        >
          Home
        </Link>
        <Link
          to="/show"
          style={{
            backgroundColor: "#ffffff",
            color: "#004085",
            textDecoration: "none",
            padding: "10px 20px",
            fontWeight: "600",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
            transition: "all 0.3s ease",
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = "#e0f0ff";
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = "#ffffff";
          }}
        >
          Show
        </Link>
      </div>
    </header>
  );
}

export default Header;
