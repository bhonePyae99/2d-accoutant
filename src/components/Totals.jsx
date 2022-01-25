import { useState } from "react";
const Totals = ({ userData }) => {
  const [searchValue, setSearchValue] = useState("");
  const copyUserData = [...userData];
  let displayBetNum = [];
  let numbers = [];
  let totalBetNum = [];
  let totalBetAmt = 0;
  for (let i = 0; i < copyUserData.length; i++) {
    numbers = [...numbers, ...copyUserData[i].numbers];
    totalBetNum = [...totalBetNum, ...copyUserData[i].stotalBetNum];
    totalBetAmt += copyUserData[i].totalBetAmt;
  }
  totalBetNum = Array.from(
    totalBetNum.reduce(
      (m, { betNum, betAmt }) =>
        m.set(betNum, parseInt(m.get(betNum) || 0) + parseInt(betAmt)),
      new Map()
    ),
    ([betNum, betAmt]) => ({ betNum, betAmt })
  );
  displayBetNum = totalBetNum.filter((item) =>
    item.betNum.includes(searchValue)
  );
  return (
    <div className="container mt-3">
      <h3 className="fw-bold text-center">စာရင်းချုပ်</h3>
      <div className="row mt-5">
        <div className="col-md-3">
          <h3>စာရင်းမှတ်တမ်း</h3>
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
              </li>
            ))}
          </ul>
        </div>
        <div className="col-md-9">
          <div className="row">
            <div className="col">
              <h3>စုစုပေါင်း</h3>
            </div>
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
          <ul className="list-group mt-3 display">
            {displayBetNum.map((betnum) => (
              <li
                className="list-group-item d-flex justify-content-between fs-5"
                key={betnum.id}
              >
                <strong>{betnum.betNum}</strong>
                <span className="float-end fw-bold">{betnum.betAmt}Ks</span>
              </li>
            ))}
          </ul>
          <p className="fw-bold fs-5">ရောင်းကြေးစုစုပေါင်း - {totalBetAmt}Ks</p>
          <p className="fw-bold fs-5">
            ကော်မရှင် - {parseInt(totalBetAmt) * 0.15}Ks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Totals;
