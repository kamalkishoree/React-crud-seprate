import React, { axios, useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Select from "react-select";

export default function StudentEdit() {
  const navigate = useNavigate();
  const { id } = useParams();
  const languageOptions = [
    { value: "English", label: "English" },
    { value: "Hindi", label: "Hindi" },
    { value: "English", label: "English" },
    { value: "English", label: "English" },
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

  const [name, setName] = useState("");
  const [selectedLanguage, setselectedLanguage] = useState([]);
  const [selectedClass, setselectedClass] = useState("");

  const [validationError, setValidationError] = useState({});

  const handleChangeLan = (selectedLanguage) => {
    const newSelectedLan = selectedLanguage;
    console.log(selectedLanguage);
    setselectedLanguage(newSelectedLan);
  };

  const handleSelectedClass = (selectedClass) => {
    const newSelectedClass = selectedClass;
    console.log(newSelectedClass);
    setselectedClass(newSelectedClass);
  };

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = async () => {
    await axios
      .get(`http://localhost:8000/api/subject/${id}`)
      .then(({ data }) => {
        const { sub_name, class_std, lang } = data.subject;
        setName(sub_name);
        setselectedClass(class_std);
        setselectedLanguage(lang);
      })
      .catch(({ response: { data } }) => {
        Swal.fire({
          text: data.message,
          icon: "error",
        });
      });
  };

  const changeHandler = (event) => {
    setImage(event.target.files[0]);
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("_method", "PATCH");
    formData.append("name", name);
    formData.append("class", class_std);
    formData.append("lang", lang);

    await axios
      .post(`http://localhost:8000/api/subject/${id}`, formData)
      .then(({ data }) => {
        Swal.fire({
          icon: "success",
          text: data.message,
        });
        navigate("/");
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
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 col-sm-12 col-md-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Update Product</h4>
              <hr />
              <div className="form-wrapper">
                {Object.keys(validationError).length > 0 && (
                  <div className="row">
                    <div className="col-12">
                      <div className="alert alert-danger">
                        <ul className="mb-0">
                          {Object.entries(validationError).map(
                            ([key, value]) => (
                              <li key={key}>{value}</li>
                            )
                          )}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
                <Form onSubmit={updateProduct}>
                  <Row>
                    <Col>
                      <Form.Group controlId="Name">
                        <Form.Label>Subject Name</Form.Label>
                        <Form.Control
                          type="text"
                          value={name}
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

                  <Button
                    variant="primary"
                    className="mt-2"
                    size="lg"
                    block="block"
                    type="submit"
                  >
                    Update
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
