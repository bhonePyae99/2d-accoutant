import "./App.css";
import Accoutant from "./components/Accoutant";
import Display from "./components/Display";
import { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [totalBetNum, setTotalBetNum] = useState([]);
  const [totalBetAmt, setTotalBetAmt] = useState(0);
  const [userData, setUserData] = useState([]);
  const [currentUser, setCurrentUser] = useState("");

  useEffect(() => {
    const Cuser = JSON.parse(localStorage.getItem("currentUser"));
    setCurrentUser(Cuser || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    const userD = JSON.parse(localStorage.getItem("userData"));
    setUserData(userD || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  useEffect(() => {
    const totalAmt = JSON.parse(localStorage.getItem("totalAmt"));
    setTotalBetAmt(totalAmt || 0);
  }, []);

  useEffect(() => {
    localStorage.setItem("totalAmt", JSON.stringify(totalBetAmt));
  }, [totalBetAmt]);

  useEffect(() => {
    const numb = JSON.parse(localStorage.getItem("numbers"));
    setNumbers(numb || []);
  }, []);

  useEffect(() => {
    const totalNum = JSON.parse(localStorage.getItem("totalBetNum"));
    setTotalBetNum(totalNum || []);
  }, []);

  useEffect(() => {
    localStorage.setItem("totalBetNum", JSON.stringify(totalBetNum));
  }, [totalBetNum]);

  useEffect(() => {
    localStorage.setItem("numbers", JSON.stringify(numbers));
  }, [numbers]);

  return (
    <div className="App">
      <ToastContainer />
      <Accoutant
        numbers={numbers}
        setNumbers={setNumbers}
        totalBetNum={totalBetNum}
        setTotalBetNum={setTotalBetNum}
        totalBetAmt={totalBetAmt}
        setTotalBetAmt={setTotalBetAmt}
        userData={userData}
        setUserData={setUserData}
        setCurrentUser={setCurrentUser}
      />
      <Display
        numbers={numbers}
        setNumbers={setNumbers}
        totalBetNum={totalBetNum}
        setTotalBetNum={setTotalBetNum}
        totalBetAmt={totalBetAmt}
        setTotalBetAmt={setTotalBetAmt}
        userData={userData}
        setUserData={setUserData}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

export default App;
