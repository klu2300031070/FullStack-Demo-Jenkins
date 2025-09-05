import { useState } from "react";
import axios from "axios";

export default function Demo() {
  const [student, setstudent] = useState({ id: "", name: "", branch: "" });
  const [studentdata, setstudentdata] = useState(null);
  const [id, setid] = useState("");

  const hs = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:2100/add", student);
      alert("Added ");
      setstudent({ id: "", name: "", branch: "" });
    } catch (err) {
      console.log("error", err);
    }
  };

  const hc = (e) => {
    setstudent({ ...student, [e.target.name]: e.target.value });
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
            const res = await axios.get(`http://localhost:2100/view?s=${id}`);
            setstudentdata(res.data);

            if (!res.data) {
              alert("Not Found ");
            } else {
              alert("Found ");
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

      {/* Display Student Data */}
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
    </div>
  );
}
