import "./App.css";
import Accoutant from "./components/Accoutant";
import Display from "./components/Display";
import { useState, useEffect } from "react";

function App() {
  const [numbers, setNumbers] = useState([]);
  const [totalBetNum, setTotalBetNum] = useState([]);
  const [totalBetAmt, setTotalBetAmt] = useState(0);

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
      <Accoutant
        numbers={numbers}
        setNumbers={setNumbers}
        totalBetNum={totalBetNum}
        setTotalBetNum={setTotalBetNum}
        totalBetAmt={totalBetAmt}
        setTotalBetAmt={setTotalBetAmt}
      />
      <Display
        numbers={numbers}
        setNumbers={setNumbers}
        totalBetNum={totalBetNum}
        setTotalBetNum={setTotalBetNum}
        totalBetAmt={totalBetAmt}
        setTotalBetAmt={setTotalBetAmt}
      />
    </div>
  );
}

export default App;
