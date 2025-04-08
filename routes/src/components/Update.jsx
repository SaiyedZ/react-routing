import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

function Update() {
  const data = useParams();
  const navigate = useNavigate();
  const [student, setStudent] = useState({});
  const [hobby, setHobby] = useState([]);
  const [city] = useState([
    "Vapi",
    "Valsad",
    "Navsari",
    "Nasik",
    "Surat",
  ]);

  useEffect(() => {
    const studentData = JSON.parse(localStorage.getItem("students")) || [];
    setStudent(studentData[data.index]);
    setHobby(studentData[data.index]["hobby"]);
  }, [data.index]);

  const getInput = (e) => {
    const { name, value, checked, type } = e.target;
    let updatedHobby = [...hobby];

    if (name === "hobby") {
      if (checked) {
        updatedHobby.push(value);
      } else {
        updatedHobby = updatedHobby.filter((item) => item !== value);
      }
      setHobby(updatedHobby);
      setStudent({ ...student, hobby: updatedHobby });
    } else {
      setStudent({ ...student, [name]: value });
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    const studentData = JSON.parse(localStorage.getItem("students"));
    studentData[data.index] = student;
    localStorage.setItem("students", JSON.stringify(studentData));
    navigate("/show");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "60px 15px",
        fontFamily: "'Segoe UI', sans-serif",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "720px",
          backgroundColor: "#fff",
          borderRadius: "20px",
          padding: "40px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          className="text-center mb-4"
          style={{ color: "#343a40", fontWeight: 600 }}
        >
          Update Student Details
        </h2>

        <form onSubmit={submitData}>
          <div className="row g-3">
            {/* Name */}
            <div className="col-md-6">
              <label className="form-label">Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control shadow-sm"
                onChange={getInput}
                value={student.name || ""}
              />
            </div>

            {/* Email */}
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                type="email"
                name="email"
                className="form-control shadow-sm"
                onChange={getInput}
                value={student.email || ""}
              />
            </div>

            {/* Password */}
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control shadow-sm"
                onChange={getInput}
                value={student.password || ""}
              />
            </div>

            {/* Gender */}
            <div className="col-md-6">
              <label className="form-label d-block">Gender</label>
              <div className="d-flex gap-3">
                {["male", "female"].map((g) => (
                  <div className="form-check" key={g}>
                    <input
                      type="radio"
                      className="form-check-input"
                      name="gender"
                      value={g}
                      onChange={getInput}
                      checked={student.gender === g}
                    />
                    <label className="form-check-label text-capitalize">
                      {g}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Hobby */}
            <div className="col-12">
              <label className="form-label d-block">Hobbies</label>
              <div className="d-flex gap-3 flex-wrap">
                {["Singing", "Reading", "Dancing"].map((h) => (
                  <div className="form-check" key={h}>
                    <input
                      type="checkbox"
                      name="hobby"
                      value={h}
                      className="form-check-input"
                      onChange={getInput}
                      checked={hobby.includes(h)}
                    />
                    <label className="form-check-label">{h}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* City */}
            <div className="col-md-6">
              <label className="form-label">City</label>
              <select
                name="city"
                className="form-select shadow-sm"
                onChange={getInput}
                value={student.city || ""}
              >
                <option value="">-- Select City --</option>
                {city.map((v, i) => (
                  <option key={i} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            {/* Online Image */}
            <div className="col-md-6">
              <label className="form-label">Image URL (optional)</label>
              <input
                type="text"
                name="image"
                className="form-control shadow-sm"
                onChange={getInput}
                value={student.image || ""}
              />
              {student.image && (
                <img
                  src={student.image}
                  alt="Preview"
                  className="mt-3 rounded border"
                  height="100"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>

            {/* Upload Image (fake field for UI consistency) */}
            <div className="col-12">
              <label className="form-label">Upload Image (optional)</label>
              <input
                type="text"
                name="newImage"
                className="form-control shadow-sm"
                onChange={getInput}
                value={student.newImage || ""}
              />
            </div>

            {/* Submit */}
            <div className="col-12">
              <button
                type="submit"
                className="btn btn-dark w-100 py-2 mt-2"
                style={{
                  fontSize: "16px",
                  borderRadius: "8px",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                }}
              >
                Update
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
