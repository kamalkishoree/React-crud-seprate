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

export default function CreateSubject() {
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "Punjabi", label: "Punjabi" },
    { value: "French", label: "French" },
    { value: "Chinese", label: "Chinese" },
  ];

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

  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [selectedLanguage, setselectedLanguage] = useState([]);
  const [selectedClass, setselectedClass] = useState("");
  const [selectedteachers, setSelectedTeachers] = useState([]);

  const [teachersData, setTeachersData] = useState([]);

  const [validationError, setValidationError] = useState({});

  const handleChangeLan = (selectedLanguage) => {
    const newSelectedLan = selectedLanguage;

    setselectedLanguage(newSelectedLan);
  };

  const handleSelectedClass = (selectedClass) => {
    const newSelectedClass = selectedClass;

    setselectedClass(newSelectedClass);
  };

  const handleChangeTeacher = (selectedteachers) => {
    const newTeacher = selectedteachers;
    setSelectedTeachers(newTeacher);
  };

  const all_language = selectedLanguage.map((item) => item.value);
  const all_teachers = selectedteachers.map((item) => item.value);

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    await axios.get(`http://localhost:8000/api/teacher`).then(({ data }) => {
      setTeachersData(data);
    });
  };

  const teacherOptions = teachersData.map(({ id, name }) => ({
    value: id,
    label: name,
  }));

  console.log(teacherOptions);
  const createProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", title);
    formData.append("language", all_language);
    formData.append("class", selectedClass.value);
    formData.append("teacher_id", all_teachers);

    await axios
      .post(`http://localhost:8000/api/subject`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/subject");
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
            <BackButton backPatch={"/subject"}></BackButton>

            <h4 className="card-title">Add Subject</h4>
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
                      <Form.Label>Subject Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={title}
                        onChange={(event) => {
                          setTitle(event.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="Language">
                      <Form.Label>Language</Form.Label>
                      <Select
                        options={languageOptions}
                        value={selectedLanguage}
                        onChange={handleChangeLan}
                        isMulti
                        placeholder="Select languagel"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="Class">
                      <Form.Label>Select Class</Form.Label>
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
                    <Form.Group controlId="Teachers">
                      <Form.Label>teachers</Form.Label>
                      <Select
                        options={teacherOptions}
                        value={selectedteachers}
                        onChange={handleChangeTeacher}
                        isMulti
                        placeholder="Select Teachers"
                      />
                    </Form.Group>
                  </Col>
                </Row>

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
