import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Form from "./components/Form.js";
import FormDetails from "./components/FormDetails.js";

function App() {
  return (
    <BrowserRouter className="App">
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/details/:id" element={<FormDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
