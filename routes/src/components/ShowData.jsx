import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaSearch, FaSortAlphaDown, FaSortAlphaUp, FaTrashAlt, FaEdit } from "react-icons/fa";
import { BiImageAdd, BiLink } from "react-icons/bi";

function ShowData() {
  let [stuData, setStuData] = useState([]);
  let [search, setSearch] = useState(null);
  let [perPage, setPerPage] = useState(5); // Increased for better initial view
  let [currentPage, setCurrentPage] = useState(1);
  let [pageNo, setPageNo] = useState([]);
  let [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    let getData = () => {
      let getStudentData = JSON.parse(localStorage.getItem("students")) || [];
      let totalPages = Math.ceil(getStudentData.length / perPage);
      let pages = Array.from({ length: totalPages }, (_, i) => i + 1);
      setPageNo(pages);

      let endPos = currentPage * perPage;
      let firstPos = endPos - perPage;
      let newArray = getStudentData.slice(firstPos, endPos);
      setStuData(newArray || []);
    };
    getData();
  }, [currentPage, perPage]);

  const deleteStudent = (index) => {
    const allData = JSON.parse(localStorage.getItem("students")) || [];
    const actualIndexToDelete = (currentPage - 1) * perPage + index;
    allData.splice(actualIndexToDelete, 1);
    localStorage.setItem("students", JSON.stringify(allData));

    setStuData((prev) => {
      const newData = [...prev];
      newData.splice(index, 1);
      return newData;
    });

    const allStudentsAfterDelete = JSON.parse(localStorage.getItem("students")) || [];
    const totalPagesAfterDelete = Math.ceil(allStudentsAfterDelete.length / perPage);
    setPageNo(Array.from({ length: totalPagesAfterDelete }, (_, i) => i + 1));

    if (stuData.length === 1 && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const sortingByName = (e) => {
    let allData = [...stuData];
    const sortDirection = e.target.value;
    allData.sort((a, b) =>
      sortDirection === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name)
    );
    setStuData(allData);
    setSortBy(sortDirection);
  };

  const handlePerPageChange = (event) => {
    setPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1);
  };

  const filteredData = stuData.filter(
    (v) =>
      !search || v.name.toLowerCase().includes(search.toLowerCase()) || v.email.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPage - 1) * perPage;
  const currentFilteredData = filteredData.slice(0, perPage);

  return (
    <section className="bg-light py-5" style={{ minHeight: "100vh" }}>
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h2 className="h3 fw-bold text-primary mb-0">
              <i className="bi bi-table me-2"></i> Student Data
            </h2>
            <p className="text-muted">View and manage student records.</p>
          </div>
          <Link to="/" className="btn btn-primary btn-sm">
            <i className="bi bi-plus-lg me-1"></i> Add New
          </Link>
        </div>

        <div className="bg-white shadow-sm rounded p-3 mb-4">
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-0">
                <FaSearch className="text-secondary" />
              </span>
              <input
                type="text"
                className="form-control border-start-0 shadow-sm"
                placeholder="Search by Name or Email"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="d-flex gap-2 align-items-center">
              <select
                className="form-select form-select-sm shadow-sm"
                onChange={sortingByName}
              >
                <option value="">Sort by Name</option>
                <option value="asc">
                  <FaSortAlphaDown className="me-1" /> Ascending
                </option>
                <option value="desc">
                  <FaSortAlphaUp className="me-1" /> Descending
                </option>
              </select>
              <select
                className="form-select form-select-sm shadow-sm"
                value={perPage}
                onChange={handlePerPageChange}
              >
                <option value="5">5 per page</option>
                <option value="10">10 per page</option>
                <option value="20">20 per page</option>
              </select>
            </div>
          </div>
        </div>

        <div className="table-responsive bg-white shadow-sm rounded">
          <table className="table table-bordered table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="p-3 text-center">#</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3 d-none d-md-table-cell">Password</th>
                <th className="p-3 text-center d-none d-md-table-cell">Gender</th>
                <th className="p-3">Hobby</th>
                <th className="p-3 d-none d-lg-table-cell">City</th>
                <th className="p-3 text-center">Online Image</th>
                <th className="p-3 text-center">Upload Image</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentFilteredData.length > 0 ? (
                currentFilteredData.map((v, i) => (
                  <tr key={i}>
                    <td className="p-3 text-center">{startIndex + i + 1}</td>
                    <td className="p-3">{v.name}</td>
                    <td className="p-3">{v.email}</td>
                    <td className="p-3 d-none d-md-table-cell">{v.password}</td>
                    <td className="p-3 text-center d-none d-md-table-cell">{v.gender}</td>
                    <td className="p-3">{v.hobby.join(", ")}</td>
                    <td className="p-3 d-none d-lg-table-cell">{v.city}</td>
                    <td className="p-3 text-center">
                      {v.image && (
                        <img
                          src={v.image}
                          alt="Online"
                          style={{ height: "50px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,.1)" }}
                        />
                      )}
                      {!v.image && <span className="text-muted">-</span>}
                    </td>
                    <td className="p-3 text-center">
                      {v.newImage && (
                        <img
                          src={v.newImage}
                          alt="Upload"
                          style={{ height: "50px", borderRadius: "5px", boxShadow: "0 2px 4px rgba(0,0,0,.1)" }}
                        />
                      )}
                      {!v.newImage && <span className="text-muted">-</span>}
                    </td>
                    <td className="p-3 text-center">
                      <div className="d-flex justify-content-center gap-2">
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => deleteStudent(i)}
                          title="Delete"
                        >
                          <FaTrashAlt />
                        </button>
                        <Link
                          to={`/updateData/${(currentPage - 1) * perPage + i}`}
                          className="btn btn-outline-primary btn-sm"
                          title="Update"
                        >
                          <FaEdit />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="p-4 text-center text-muted">
                    No student data available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {pageNo.length > 1 && (
          <nav className="mt-4 d-flex justify-content-center">
            <ul className="pagination">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous
                </button>
              </li>
              {pageNo.map((page) => (
                <li
                  key={page}
                  className={`page-item ${currentPage === page ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(page)}
                  >
                    {page}
                  </button>
                </li>
              ))}
              <li
                className={`page-item ${
                  currentPage === pageNo.length ? "disabled" : ""
                }`}
              >
                <button
                  className="page-link"
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </section>
  );
}

export default ShowData;