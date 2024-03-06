import { Link } from "react-router-dom";
const HomeModule = () => {
  return (
    <>
      <div className="container">
        <div>
          <Link className="btn btn-primary mb-2 " to={"/subject"}>
            Subject
          </Link>
        </div>
        <div>
          <Link className="btn btn-primary mb-2 " to={"/teacher"}>
            Teacher
          </Link>
          <div></div>
          <Link className="btn btn-primary mb-2 " to={"/student"}>
            Student
          </Link>
        </div>
      </div>
    </>
  );
};
export default HomeModule;
