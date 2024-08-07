import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { Button, Checkbox, FormControlLabel, TextField } from "@mui/material";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

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

  useEffect(() => {
    fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/user`, { credentials: "include", mode: "cors" })
      .then((res) => res.json())
      .then((data) => {
        //   {
        //     "id": 2,
        //     "createdAt": "2024-07-30T09:15:50.489Z",
        //     "email": "a2d0a0m2@gmail.com",
        //     "isAdmin": false,
        //     "customer": {
        //         "id": 2,
        //         "firstName": "Adam",
        //         "lastName": "Ye",
        //         "address": "",
        //         "phoneNumber": null
        //     }
        // }

        setEmail(data.email);
        setFirstName(data.customer.firstName);
        setLastName(data.customer.lastName);
        console.log(data.isAdmin);
        setIsAdmin(data.isAdmin);
      });
  }, []);

  return (
    <div className="cust-prof-main">
      <h1 className="cust-prof-heading">Your Account</h1>
      <div className="cust-prof-form">
        <div className="cust-prof-name">
          <div className="cust-prof-name-field">
            <TextField
              id="first-name"
              label="First Name"
              variant="outlined"
              fullWidth
              value={firstName}
              InputLabelProps={{ shrink: true }}
            />
          </div>
          <div className="cust-prof-name-field">
            <TextField
              id="last-name"
              label="Last Name"
              variant="outlined"
              fullWidth
              value={lastName}
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
        <Button variant="contained" onClick={signOut} style={{ width: "150px" }}>
          Sign Out
        </Button>
      </div>
    </div>
  );
}
