import "./App.css";
import Accoutant from "./components/Accoutant";
import Details from "./components/Details";
import AccountDetails from "./components/AccountDetails";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import NavBar from "./components/Navbar";
import Totals from "./components/Totals";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [totalBetNum, setTotalBetNum] = useState([]);
  const [totalBetAmt, setTotalBetAmt] = useState(0);
  const [userData, setUserData] = useState([]);
  const [currentId, setCurrentId] = useState("");

  useEffect(() => {
    const userD = JSON.parse(localStorage.getItem("userData"));
    setUserData(userD || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Accoutant
                  numbers={numbers}
                  setNumbers={setNumbers}
                  totalBetNum={totalBetNum}
                  setTotalBetNum={setTotalBetNum}
                  totalBetAmt={totalBetAmt}
                  setTotalBetAmt={setTotalBetAmt}
                  userData={userData}
                  setUserData={setUserData}
                  currentId={currentId}
                  setCurrentId={setCurrentId}
                />
              </>
            }
          />
          <Route
            path="/details"
            element={<Details userData={userData} setUserData={setUserData} />}
          />
          <Route
            path="/details/:id"
            element={
              <AccountDetails
                userData={userData}
                setUserData={setUserData}
                numbers={numbers}
                setNumbers={setNumbers}
                totalBetNum={totalBetNum}
                setTotalBetNum={setTotalBetNum}
                totalBetAmt={totalBetAmt}
                setTotalBetAmt={setTotalBetAmt}
                setCurrentId={setCurrentId}
              />
            }
          />
          <Route path="/totals" element={<Totals userData={userData} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
