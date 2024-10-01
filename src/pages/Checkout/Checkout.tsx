import { useEffect, useState } from "react";

import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import BasketListing from "../../components/Listing/BasketListing";
import { CatalogRetrieve } from "../../types/catalog-retrieve";
import "./Checkout.css";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "./CheckoutForm";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_STRIPE_PK);

const KEY = "basket";

export default function Basket() {
  const [items, setItems] = useState<CatalogRetrieve[] | null>(null);

  // Read items
  useEffect(() => {
    const readLS = () => {
      const data = localStorage.getItem(KEY);
      return data ? JSON.parse(data) : [];
    };

    // Setting items
    setItems(readLS());
  }, []);

  if (items === null) return null;
  if (items.length === 0) return <h1>No items in your basket</h1>;

  const paymentAmount = items.reduce((acc, item) => acc + item.productOptions[0].price, 0);

  return (
    <div className="mainBox" style={{}}>
      <Elements
        stripe={stripePromise}
        options={{
          mode: "payment",
          amount: paymentAmount,
          currency: "aud",
          // More options available here: https://stripe.com/docs/js/elements_object/create_element?type=payment#elements_create_payment_element-options
          // Fully customizable with appearance API.
          appearance: {},
        }}
      >
        <CheckoutForm checkoutItems={items} />
      </Elements>
      <Bill items={items} />
    </div>
  );
}

//@ts-expect-error Sort this out later, not sure what type of obj items is
function Items({ items }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingBottom: "30px",
        maxWidth: "900px",
      }}
    >
      <div className="b-divider"></div>
      {items.map((item: CatalogRetrieve, index: number) => (
        <>
          <BasketListing {...item} key={index} />
          <div className="b-divider"></div>
        </>
      ))}
    </div>
  );
}

function Bill({ items }: { items: CatalogRetrieve[] }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="bill">
        Subtotal ({items.length} items): ${items.reduce((acc, item) => acc + item.productOptions[0].price, 0)}
        <div className="divider" style={{ maxWidth: "100%" }}></div>
      </div>
    </>
  );
}
