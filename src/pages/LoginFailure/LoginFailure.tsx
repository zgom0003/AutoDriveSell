import Button from "@mui/material/Button";
import "./LoginFailure.css";
import { useNavigate } from "react-router-dom";

export default function LoginFailurePage() {
  const navigate = useNavigate();
  return (
    <div className="login-failure-container">
      <h2 className="login-failure-heading">Login error! Please login with a registered administrator account.</h2>
      <Button variant="contained" color="primary" size="large" onClick={() => navigate("/")}>
        Back to Home
      </Button>
    </div>
  );
}
