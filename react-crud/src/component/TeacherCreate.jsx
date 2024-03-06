import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import BackButton from "./BackButton";

export default function TeacherCreate() {
  const sexOptions = [
    { value: "Male", label: "male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const navigate = useNavigate();
  const [selectedName, setSelectedName] = useState("");
  const [selectedAge, setSelectedAge] = useState("");
  const [SelectedSex, setSelectSex] = useState("");
  const [validationError, setValidationError] = useState({});

  const handleChangeSex = (SelectedSex) => {
    const newSex = SelectedSex;
    setSelectSex(newSex);
  };

  const createteacher = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", selectedName);
    formData.append("age", selectedAge);
    formData.append("sex", SelectedSex.value);

    await axios
      .post(`http://localhost:8000/api/teacher`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/teacher");
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
            <BackButton backPatch={"/teacher"}></BackButton>

            <h4 className="card-title">Add Teacher</h4>
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
              <Form onSubmit={createteacher}>
                <Row>
                  <Col>
                    <Form.Group controlId="Name">
                      <Form.Label>Teacher Name</Form.Label>
                      <Form.Control
                        type="text"
                        value={selectedName}
                        onChange={(event) => {
                          setSelectedName(event.target.value);
                        }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-3">
                  <Col>
                    <Form.Group controlId="Age">
                      <Form.Label>Age</Form.Label>
                      <Form.Control
                        type="number"
                        value={selectedAge}
                        onChange={(event) => {
                          setSelectedAge(event.target.value);
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
                        placeholder="Select Sex"
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
