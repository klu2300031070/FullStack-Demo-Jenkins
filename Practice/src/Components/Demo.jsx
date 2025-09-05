import { useState } from "react";
import axios from "axios";

export default function Demo() {
  const [student, setstudent] = useState({ id: "", name: "", branch: "" });
  const [studentdata, setstudentdata] = useState(null);
  const [id, setid] = useState("");
  const [allstudents, setallstudents] = useState([]); // for storing all students

  const hs = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2030/springbootbackend/add", student);
      alert("Added");
      setstudent({ id: "", name: "", branch: "" });
    } catch (err) {
      console.log("error", err);
    }
  };

  const hc = (e) => {
    setstudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleViewAll = async () => {
    try {
      const res = await axios.get("http://localhost:2030/springbootbackend/viewall");
      setallstudents(res.data);
    } catch (err) {
      console.log("Error fetching all students", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:2030/springbootbackend/delete/${id}`);
      alert(`Student with id ${id} deleted`);
      // Refresh the table
      handleViewAll();
    } catch (err) {
      console.log("Error deleting student", err);
    }
  };

  return (
    <div className="app-container">
      <h1 className="title">CI/CD</h1>
      <h2 className="title">Student Management</h2>

      {/* Add Student Form */}
      <form className="form-container" onSubmit={hs}>
        <h3 className="form-title">Add Student</h3>
        <input
          type="number"
          placeholder="Enter Id"
          name="id"
          value={student.id}
          onChange={hc}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Name"
          name="name"
          value={student.name}
          onChange={hc}
          className="input-field"
        />
        <input
          type="text"
          placeholder="Enter Branch"
          name="branch"
          value={student.branch}
          onChange={hc}
          className="input-field"
        />
        <button type="submit" className="btn">
          Submit
        </button>
      </form>

      {/* View Student Form */}
      <form
        className="form-container"
        onSubmit={async (e) => {
          e.preventDefault();
          try {
            const res = await axios.get(
              `http://localhost:2030/springbootbackend/view?s=${id}`
            );
            setstudentdata(res.data);

            if (!res.data) {
              alert("Not Found");
            } else {
              alert("Found");
            }

            setid("");
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <h3 className="form-title">View Student</h3>
        <input
          type="number"
          value={id}
          onChange={(e) => setid(e.target.value)}
          className="input-field"
          placeholder="Enter Id"
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>

      {/* Display Single Student Data */}
      {studentdata && (
        <div className="student-card">
          <p>
            <span>Id:</span> {studentdata.id}
          </p>
          <p>
            <span>Name:</span> {studentdata.name}
          </p>
          <p>
            <span>Branch:</span> {studentdata.branch}
          </p>
        </div>
      )}

      {/* View All Students */}
      <div className="form-container">
        <h3 className="form-title">View All Students</h3>
        <button onClick={handleViewAll} className="btn">
          Load All Students
        </button>
      </div>

      {/* Display All Students in Table */}
      {allstudents.length > 0 && (
        <table border="1" className="student-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {allstudents.map((s) => (
              <tr key={s.id}>
                <td>{s.id}</td>
                <td>{s.name}</td>
                <td>{s.branch}</td>
                <td>
                  <button
                    className="btn"
                    style={{ background: "red" }}
                    onClick={() => handleDelete(s.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
