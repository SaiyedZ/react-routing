import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ShowData from "./components/ShowData";
import Header from "./components/Header";
import Update from "./components/Update";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/show" element={<ShowData />} />
          <Route path="/updateData/:index" element={<Update />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
