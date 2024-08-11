import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import useUser from "../../helpers/useUser";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [valuesChanged, setValuesChanged] = useState<boolean>(false);
  const { user, updateUser } = useUser();

  const navigate = useNavigate();
  function signOut() {
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/logout`, {
      credentials: "include",
      mode: "cors",
      method: "POST",
    }).then(() => {
      navigate("/");
      navigate(0);
    });
  }

  function saveChanges() {
    if (!user) return;
    const newUser = user;
    newUser.customer.firstName = firstName;
    newUser.customer.lastName = lastName;
    updateUser(newUser);
  }

  useEffect(() => {
    if (!user) return;

    setEmail(user.email);
    setFirstName(user.customer.firstName);
    setLastName(user.customer.lastName);
    setIsAdmin(user.isAdmin);
  }, [user]);

  return (
    <div className="prof-main">
      <h1 className="prof-heading">Your Account</h1>
      <div className="prof-form">
        <div className="prof-name">
          <div className="prof-name-field">
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
                setValuesChanged(true);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="prof-name-field">
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
                setValuesChanged(true);
              }}
              InputLabelProps={{ shrink: true }}
            />
          </div>
        </div>
        <TextField
          id="email"
          label="Email"
          variant="outlined"
          value={email}
          InputLabelProps={{ shrink: true }}
          disabled
        />
        <FormControlLabel control={<Checkbox id="admin" checked={isAdmin} />} label="Is Administrator" disabled />
        <div className="prof-btn-group">
          <Button variant="contained" onClick={saveChanges} style={{ width: "150px" }} disabled={!valuesChanged}>
            Save Changes
          </Button>
          <Button variant="contained" onClick={signOut} style={{ width: "150px" }}>
            Sign Out
          </Button>
        </div>
      </div>
    </div>
  );
}
