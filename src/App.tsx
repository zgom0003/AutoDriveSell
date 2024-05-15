import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import Home from "./pages/Home/Home";
import LoginFailurePage from "./pages/LoginFailure/LoginFailure";
import Catalogue from "./pages/Catalogue/Catalogue";
import Basket from "./pages/Basket/Basket";
import ProductItemPage from './pages/Product-Item-Page/Product-Item.tsx';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="login-failure" element={<LoginFailurePage />} />
            <Route path="products" element={<Catalogue />} />
            <Route path="products/:itemId" element={<ProductItemPage />} />
            <Route path="basket" element={<Basket />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
