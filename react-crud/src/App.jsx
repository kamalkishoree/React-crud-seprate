import * as React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.css";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import CreateSubject from "./component/CreateSubject";
import ListSubject from "./component/ListSubject";
import EditSubject from "./component/EditSubject";
import TeacherCreate from "./component/TeacherCreate";
import TeacherEdit from "./component/TeacherEdit";
import TeacherList from "./component/TeacherList";
import HomeModule from "./HomeModule";
import StudentCreate from "./component/StudentCreate";
import StudentEdit from "./component/StudentEdit";
import StudentList from "./component/StudentList";
import StudentSubjects from "./component/StudentSubjects";
function App() {
  return (
    <Router>
      <Navbar bg="primary">
        <Container>
          <Link to={"/"} className="navbar-brand text-white">
            Cypher Studio - Assignment
          </Link>
        </Container>
      </Navbar>

      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route path="/" element={<HomeModule />} />
              <Route path="/subject/create" element={<CreateSubject />} />
              <Route path="/subject/edit/:id" element={<EditSubject />} />
              <Route exact path="/subject" element={<ListSubject />} />

              <Route path="/teacher/create" element={<TeacherCreate />} />
              <Route path="/teacher/edit/:id" element={<TeacherEdit />} />
              <Route path="/teacher/" element={<TeacherList />} />

              <Route path="/student/create" element={<StudentCreate />} />
              <Route path="/student/edit/:id" element={<StudentEdit />} />
              <Route path="/student/" element={<StudentList />} />

              <Route
                path="/student/my-subject/:id"
                element={<StudentSubjects />}
              />
            </Routes>
          </Col>
        </Row>
      </Container>
    </Router>
  );
}

export default App;
