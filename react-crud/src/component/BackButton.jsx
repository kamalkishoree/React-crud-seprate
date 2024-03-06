import { Link } from "react-router-dom";

const BackButton = ({ backPatch }) => {
  return (
    <>
      <Link className="btn btn-primary mb-2 float-end" to={backPatch}>
        Back
      </Link>
    </>
  );
};
export default BackButton;
