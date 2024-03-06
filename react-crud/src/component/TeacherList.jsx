import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import MainPage from "./MainPage";

export default function TeacherList() {
  const [subject, setSubject] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = async () => {
    await axios.get(`http://localhost:8000/api/teacher`).then(({ data }) => {
      setSubject(data);
    });
  };

  const deleteTeacher = async (id) => {
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
      .delete(`http://localhost:8000/api/teacher/${id}`)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        fetchSubject();
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
            to={"/teacher/create"}
          >
            Add Teacher
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Sex</th>

                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subject.length > 0 &&
                    subject.map((row, key) => (
                      <tr key={key}>
                        <td>{row.name}</td>
                        <td>{row.age}</td>
                        <td>{row.sex}</td>
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
                            onClick={() => deleteTeacher(row.id)}
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
