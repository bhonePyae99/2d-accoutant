import { useState } from "react";
const Display = ({
  numbers,
  setNumbers,
  totalBetNum,
  setTotalBetNum,
  totalBetAmt,
  setTotalBetAmt,
}) => {
  const [searchValue, setSearchValue] = useState("");
  let totalDisplay = [...totalBetNum];
  totalDisplay = totalDisplay.filter((item) =>
    item.betNum.includes(searchValue)
  );

  //remove item function
  const removeItem = (betnum) => {
    const newNumbers = numbers.filter((num) => num.id !== betnum.id);
    const copyTotalBetNum = [...totalBetNum];
    let copyTotalBetAmt = totalBetAmt;
    copyTotalBetAmt -= parseInt(betnum.betAmt);
    setTotalBetAmt(copyTotalBetAmt);
    for (let i = 0; i < copyTotalBetNum.length; i++) {
      if (copyTotalBetNum[i].betNum === betnum.betNum) {
        copyTotalBetNum[i].betAmt = (
          parseInt(copyTotalBetNum[i].betAmt) - parseInt(betnum.betAmt)
        ).toString();
        setTotalBetNum(copyTotalBetNum);
        localStorage.setItem("totalBetNum", JSON.stringify(totalBetNum));
      }
    }
    setNumbers(newNumbers);
  };

  //clear all function
  const handleClearAll = () => {
    setNumbers([]);
    setTotalBetNum([]);
    setTotalBetAmt(0);
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-md-3 border-end border-success">
          <h3 className="text-muted fw-bold">စာရင်းမှတ်တမ်း</h3>
          <ul className="list-group display">
            {numbers.map((num) => (
              <li
                className="list-group-item d-flex justify-content-between"
                key={num.id}
              >
                <div>
                  <strong>{num.betNum}: </strong>
                  <span>{num.betAmt}Ks</span>
                </div>
                <i
                  className="bi bi-x-lg fs-5 fw-bolder"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    removeItem(num);
                  }}
                ></i>
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-9 px-3">
          <div className="row">
            <div className="col">
              <h3 className="text-muted fw-bold">စုစုပေါင်း</h3>
            </div>
            <div className="col">
              <div className="row">
                <div className="col">
                  <input
                    name="search"
                    className="form-control"
                    type="text"
                    value={searchValue || ""}
                    onChange={(e) => {
                      setSearchValue(e.target.value.trim());
                    }}
                    placeholder="နံပါတ်ရိုက်ရှာရန်...."
                    aria-label="default input example"
                  />
                </div>
              </div>
            </div>
          </div>
          <ul className="list-group display">
            {totalDisplay.map((betnum) => (
              <li
                className="list-group-item d-flex justify-content-between fs-5"
                key={betnum.id}
              >
                <strong>{betnum.betNum}</strong>
                <span className="float-end fw-bold">{betnum.betAmt}Ks</span>
              </li>
            ))}
          </ul>
          <div className="row mt-2">
            <div className="col">
              <p className="fw-bold fs-5">
                ရောင်းကြေးစုစုပေါင်း: {totalBetAmt}Ks
              </p>
            </div>
            <div className="col">
              <button
                className="btn btn-danger float-end mb-3"
                onClick={handleClearAll}
              >
                ရှင်းလင်းရန်
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
