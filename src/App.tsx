import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import AdminPage from "./pages/Admin/AdminPage";
import LoginFailurePage from "./pages/LoginFailure/LoginFailure";
import ProductItemPage from './pages/Product-Item-Page/Product-Item';
import Catalogue from "./pages/Catalogue/Catalogue";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="admin" element={<AdminPage />} />
            <Route path="login-failure" element={<LoginFailurePage />} />
            <Route path="catalog" element={<Catalogue />} />
          </Route>
          <Route path="/catalog/" element={<Layout />}>
            <Route path="item1" element={<ProductItemPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;