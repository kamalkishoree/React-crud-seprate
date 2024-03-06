import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function StudentSubjects() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [studentSubjects, setStudentSubjects] = useState([]);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    fetchSubjects();
  }, []);

  const fetchSubjects = async () => {
    await axios
      .get(`http://localhost:8000/api/get-student-subjects/${id}`)
      .then((data) => {
        setStudentSubjects(data);
      });
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    await axios
      .get(`http://localhost:8000/api/get-student/${id}`)
      .then((data) => {
        setStudentData(data.data);
      });
  };

  // const Arrya = studentSubjects.forEach((row) => {});

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <h3>
            Subject Details for Student :{" "}
            <span className="text-danger">{studentData.name}</span>
            <span className="text-danger">{studentData.name}</span>
          </h3>

          <Link className="btn btn-primary mb-2 float-end" to={"/student/"}>
            Go Back
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Subjects</th>
                    <th>Teachers</th>
                  </tr>
                </thead>
                <tbody>
                  {studentSubjects.data &&
                    studentSubjects.data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <button className="btn btn-info w-25 px-3">
                            {item.subject}
                          </button>
                        </td>
                        <td>{item.teachers}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
