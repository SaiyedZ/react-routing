import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Home() {
  const [st, setSt] = useState({});
  const [stuData, setStudata] = useState([]);
  const [hobby, setHobby] = useState([]);
  const [city] = useState(["Vapi", "Valsad", "Navsari", "Nasik", "Surat"]);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const allrecord = JSON.parse(localStorage.getItem("students"));
    setStudata(Array.isArray(allrecord) ? allrecord : []);
  }, []);

  const getInput = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "newImage" && files?.length > 0) {
      const reader = new FileReader();
      reader.onload = () => setImage(reader.result);
      reader.readAsDataURL(files[0]);
    }

    if (name === "hobby") {
      const updatedHobby = checked
        ? [...hobby, value]
        : hobby.filter((v) => v !== value);
      setHobby(updatedHobby);
      setSt({ ...st, hobby: updatedHobby });
    } else {
      setSt({ ...st, [name]: value });
    }
  };

  const submitData = (e) => {
    e.preventDefault();
    const newEntry = { ...st, newImage: image };
    const updatedRecords = [...stuData, newEntry];
    setStudata(updatedRecords);
    localStorage.setItem("students", JSON.stringify(updatedRecords));

    setSt({ city: "", image: "", newImage: "" });
    setHobby([]);
    setImage(null);
    toast.success("Record Inserted Successfully");
  };

  return (
    <div
      style={{
        // background: "linear-gradient(to right, #eef2f3, #cfd9df)",
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
          Student Registration
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
                value={st.name || ""}
                required
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
                value={st.email || ""}
                required
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
                value={st.password || ""}
                required
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
                      checked={st.gender === g}
                      required
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
                value={st.city || ""}
                required
              >
                <option value="">-- Select City --</option>
                {city.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
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
                value={st.image || ""}
              />
            </div>

            {/* Upload Image */}
            <div className="col-12">
              <label className="form-label">Upload Image (optional)</label>
              <input
                type="file"
                name="newImage"
                className="form-control shadow-sm"
                onChange={getInput}
              />
              {image && (
                <img
                  src={image}
                  alt="Preview"
                  className="mt-3 rounded border"
                  height="100"
                  style={{ objectFit: "cover" }}
                />
              )}
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
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}

export default Home;
