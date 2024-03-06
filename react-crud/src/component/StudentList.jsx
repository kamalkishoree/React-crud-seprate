import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import MainPage from "./MainPage";

export default function StudentList() {
  const [student, setStudent] = useState([]);

  const [typedText, setTypeText] = useState([]);
  const handleSearch = (typedText) => {
    console.log(typedText.target.value);
    const newTypeValue = typedText.target.value;
    setTypeText(newTypeValue);
    console.log(typedText);
    fetchStudentSearch();
  };

  useEffect(() => {
    fetchStudent();
  }, []);

  const fetchStudent = async () => {
    await axios
      .get(`http://localhost:8000/api/student/${typedText}`)
      .then(({ data }) => {
        setStudent(data);
      });
  };

  const fetchStudentSearch = async () => {
    await axios
      .get(`http://localhost:8000/api/student-search/${typedText}`)
      .then(({ data }) => {
        setStudent(data);
      });
  };

  const deleteStudent = async (id) => {
    const isConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      return result.isConfirmed;
    });

    if (!isConfirm) {
      return;
    }

    await axios
      .delete(`http://localhost:8000/api/student/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchStudent();
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <MainPage></MainPage>
          <Link
            className="btn btn-primary mb-2 float-end"
            to={"/student/create"}
          >
            Add Student
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="col-md-6">
              <input
                type="text"
                value={typedText}
                placeholder="search student by name"
                onChange={handleSearch}
              />
            </div>
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Roll No.</th>
                    <th>Class</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>Subject</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {student.length > 0 &&
                    student.map((row, key) => (
                      <tr key={key}>
                        <td>{row.name}</td>
                        <td>{row.roll_no}</td>
                        <td>{row.class}</td>
                        <td>{row.age}</td>
                        <td>{row.sex}</td>
                        <td>
                          {" "}
                          <Link
                            className="btn btn-primary mb-2 float-end"
                            to={`/student/my-subject/${row.id}`}
                          >
                            View Subjects
                          </Link>
                        </td>
                        {/* <td>
                          <img
                            width="50px"
                            src={`http://localhost:8000/storage/product/image/${row.image}`}
                          />
                        </td> */}
                        <td>
                          {/* <Link
                            to={`/subject/edit/${row.id}`}
                            className="btn btn-success me-2"
                          >
                            Edit
                          </Link> */}
                          <Button
                            variant="danger"
                            onClick={() => deleteStudent(row.id)}
                          >
                            Delete
                          </Button>
                        </td>
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
