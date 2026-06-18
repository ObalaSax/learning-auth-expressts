import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login />} />
        <Route path="/signup" index element={<SignUp />} />
        <Route path="/welcome" index element={<Welcome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
