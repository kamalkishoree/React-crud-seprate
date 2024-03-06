import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import BackButton from "./BackButton";

export default function StudentCreate() {
  const classOptions = [
    { value: "I", label: "I" },
    { value: "II", label: "II" },
    { value: "III", label: "III" },
    { value: "IV", label: "IV" },
    { value: "V", label: "V" },
    { value: "VI", label: "VI" },
    { value: "VII", label: "VII" },
    { value: "VIII", label: "VIII" },
    { value: "IX", label: "IX" },
    { value: "X", label: "X" },
    { value: "XI", label: "XI" },
    { value: "XII", label: "XII" },
  ];
  const sexOptions = [
    { value: "Male", label: "male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const navigate = useNavigate();
  const [studentName, setStudentName] = useState("");
  const [StduentRoleNo, setStduentRoleNo] = useState([]);
  const [StduentAge, setStduentAge] = useState("");
  const [selectedClass, setselectedClass] = useState("");
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedSubject, setselectedSubject] = useState([]);
  const [SelectedSex, setSelectSex] = useState("");
  const [validationError, setValidationError] = useState({});
  const [teacherData, setTeacherData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);

  const handleSelectedClass = (selectedClass) => {
    const newSelectedClass = selectedClass;
    console.log(newSelectedClass);
    setselectedClass(newSelectedClass);
  };

  const handleChangeSex = (SelectedSex) => {
    const newSex = SelectedSex;
    setSelectSex(newSex);
  };

  useEffect(() => {
    fetchRelatedData();
  }, []);

  const fetchRelatedData = async () => {
    await axios
      .get(`http://localhost:8000/api/get-related-data`)
      .then(({ data }) => {
        setTeacherData(data.teachers);
        setSubjectData(data.subjects);
      });
  };

  const TeachersOptions = teacherData.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const SubjectOptions = subjectData.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  const all_subject = selectedSubject.map((item) => item.value);
  const all_teachers = selectedTeachers.map((item) => item.value);

  const handleSelectedSubject = (selectedSubject) => {
    const newSubject = selectedSubject;
    setselectedSubject(newSubject);
  };
  const handleSelectedTeachers = (selectedteachers) => {
    const newTeacher = selectedteachers;
    setSelectedTeachers(newTeacher);
  };

  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", studentName);
    formData.append("age", StduentAge);
    formData.append("sex", SelectedSex.value);
    formData.append("class", selectedClass.value);

    formData.append("roll_no", StduentRoleNo);
    formData.append("teacher_id", all_teachers);
    formData.append("subject_id", all_subject);

    await axios
      .post(`http://localhost:8000/api/student`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/student");
      })
      .catch(({ response }) => {
        if (response.status === 422) {
          setValidationError(response.data.errors);
        } else {
          Swal.fire({
            text: response.data.message,
            icon: "error",
          });
        }
      });
  };

  return (
    <div className="w-100">
      <div className="row justify-content-center">
        <div className="card">
          <div className="card-body">
            <BackButton backPatch={"/student"}></BackButton>

            <h4 className="card-title">Add Student</h4>
            <hr />
            <div className="form-wrapper">
              {Object.keys(validationError).length > 0 && (
                <div className="row">
                  <div className="col-12">
                    <div className="alert alert-danger">
                      <ul className="mb-0">
                        {Object.entries(validationError).map(([key, value]) => (
                          <li key={key}>{value}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}
              <Form onSubmit={createProduct}>
                <Row>
                  <Col>
                    <Form.Group controlId="Name">
                      <Form.Label>Student Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={studentName}
                        onChange={(event) => {
                          setStudentName(event.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="RollNo">
                      <Form.Label>Student Roll-No</Form.Label>
                      <Form.Control
                        type="text"
                        value={StduentRoleNo}
                        onChange={(event) => {
                          setStduentRoleNo(event.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="Age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        value={StduentAge}
                        onChange={(event) => {
                          setStduentAge(event.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="Sex">
                      <Form.Label>Sex</Form.Label>
                      <Select
                        options={sexOptions}
                        value={SelectedSex}
                        onChange={handleChangeSex}
                        placeholder="Select languagel"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="Class">
                      <Form.Label>Student Class</Form.Label>
                      <Select
                        options={classOptions}
                        value={selectedClass}
                        onChange={handleSelectedClass}
                        placeholder="Select Class "
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="Class">
                      <Form.Label>Subjects</Form.Label>
                      <Select
                        options={SubjectOptions}
                        value={selectedSubject}
                        isMulti
                        onChange={handleSelectedSubject}
                        placeholder="Select Class "
                      />
                    </Form.Group>
                  </Col>
                </Row>

                {/* <Row className="my-3">
                  <Col>
                    <Form.Group controlId="Class">
                      <Form.Label>Teachers</Form.Label>
                      <Select
                        options={TeachersOptions}
                        value={selectedTeachers}
                        isMulti
                        onChange={handleSelectedTeachers}
                        placeholder="Select Class "
                      />
                    </Form.Group>
                  </Col>
                </Row> */}

                <Button
                  variant="primary"
                  className="mt-2"
                  size="lg"
                  block="block"
                  type="submit"
                >
                  Save
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
