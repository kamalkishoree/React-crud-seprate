import { React, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import Swal from "sweetalert2";
import $ from "Jquery";
import MainPage from "./MainPage";
export default function ListSubject() {
  const [subject, setSubject] = useState([]);
  const [allTeachers, setTeachers] = useState([]);

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = async () => {
    await axios.get(`http://localhost:8000/api/subject`).then(({ data }) => {
      setSubject(data);
    });
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    await axios.get(`http://localhost:8000/api/teacher`).then(({ data }) => {
      setTeachers(data);
    });
  };

  function filterAndConcatNames(dataArray, keysString) {
    var keys = keysString.split(",").map(Number); // Convert string keys to an array of integers
    var filteredNames = $.grep(dataArray, function (item) {
      return $.inArray(item.id, keys) !== -1;
    });

    if (filteredNames.length > 0) {
      var names = $.map(filteredNames, function (item) {
        return item.name;
      });
      return names.join(", "); // Join the names with comma
    } else {
      return "No matching names found";
    }
  }

  console.log(allTeachers);
  const deleteSubject = async (id) => {
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
      .delete(`http://localhost:8000/api/subject/${id}`)
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
            to={"/subject/create"}
          >
            Add Subject
          </Link>
        </div>
        <div className="col-12">
          <div className="card card-body">
            <div className="table-responsive">
              <table className="table table-bordered mb-0 text-center">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Class</th>
                    <th>Language</th>
                    <th>Subject Teachers</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subject.length > 0 &&
                    subject.map((row, key) => (
                      <tr key={key}>
                        <td>{row.name}</td>
                        <td>{row.class}</td>
                        <td>{row.language}</td>
                        <td>
                          {filterAndConcatNames(allTeachers, row.teacher_id)}
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
                            onClick={() => deleteSubject(row.id)}
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
