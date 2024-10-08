import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import Home from "./pages/Home/Home";
import AdminPage from "./pages/Admin/AdminPage";
import LoginFailurePage from "./pages/LoginFailure/LoginFailure";
import Catalogue from "./pages/Catalogue/Catalogue";
import Basket from "./pages/Basket/Basket";
import ProductItemPage from './pages/Product-Item-Page/Product-Item.tsx';
import CustomerProfile from "./pages/Profile/Profile.tsx";
import { FilterProvider } from "./context/FilterFormContext.tsx";
import Checkout from "./pages/Checkout/Checkout.tsx";
import CheckoutSuccess from "./pages/Checkout/Success/CheckoutSuccess.tsx";
import ContactUsPage from "./pages/ContactUs/ContactUs.tsx";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="login-failure" element={<LoginFailurePage />} />
            <Route
              path="products"
              element={
                <FilterProvider>
                  <Catalogue />
                </FilterProvider>
              }
            />
            <Route path="products/:itemId" element={<ProductItemPage />} />
            <Route path="contact-us" element={<ContactUsPage />} />
            <Route path="basket" element={<Basket />} />
            <Route path="profile" element={<CustomerProfile />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="checkout/success" element={<CheckoutSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;