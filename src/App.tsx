import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Dashboard from "./pages/dashboard/Dashboard";
import LoginPage from "./pages/login/LoginPage";

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            <Route path="/home" element={<Dashboard />} />
            <Route path="/" element={<LoginPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </>
  );
};

export default App;
