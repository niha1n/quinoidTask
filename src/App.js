import Landing from "./pages/Landing";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Test from "./pages/Test";
import Results from "./pages/Results";
import { isAuthenticated } from "./utils/authService";

function App() {
  return (
    <>
    <Router>
          <Routes>
            <Route path="/" element={ <Landing />} />
            <Route path="/test" element={ localStorage.getItem('isAuthenticated') ==='true'? <Test /> : <Navigate to='/' replace />} />
            <Route path="/results" element={ localStorage.getItem('isAuthenticated') ==='true' ? <Results /> : <Navigate to='/' replace />} />
          </Routes>
      </Router>
    </>
  );
}

export default App;
