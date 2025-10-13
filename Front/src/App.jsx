import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Jobchecker from "./pages/Jobchecker";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobchecker" element={<Jobchecker />} />
      </Routes>
    </Router>
  );
}

export default App;
