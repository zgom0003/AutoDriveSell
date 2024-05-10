import "./App.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme";
import Home from "./pages/Home/Home";
import Layout from "./components/Layout";
import ProductItemPage from './pages/Product-Item-Page/Product-Item.tsx';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
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
