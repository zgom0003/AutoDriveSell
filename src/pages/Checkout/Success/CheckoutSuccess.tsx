import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./CheckoutSuccess.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

export default function CheckoutSuccess() {
  return (
    <div className="cs-container">
      <h1>Thank you for your order!</h1>;
    </div>
  );
}
