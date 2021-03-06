import { useState } from "react";
import { toast } from "react-toastify";
const Display = ({
  numbers,
  setNumbers,
  totalBetNum,
  setTotalBetNum,
  totalBetAmt,
  setTotalBetAmt,
  userData,
  setUserData,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");
  let totalDisplay = [...totalBetNum];
  totalDisplay = totalDisplay.filter((item) =>
    item.betNum.includes(searchValue)
  );

  //remove item function
  const removeItem = (betnum) => {
    const newNumbers = numbers.filter((num) => num.id !== betnum.id);
    let copyTotalBetAmt = totalBetAmt;
    copyTotalBetAmt -= parseInt(betnum.betAmt);
    setTotalBetAmt(copyTotalBetAmt);
    for (let i = 0; i < totalBetNum.length; i++) {
      if (totalBetNum[i].betNum === betnum.betNum) {
        const cloneTotalBetNum = totalBetNum.map((item) => ({ ...item }));
        cloneTotalBetNum[i].betAmt = (
          parseInt(cloneTotalBetNum[i].betAmt) - parseInt(betnum.betAmt)
        ).toString();
        setTotalBetNum(cloneTotalBetNum);
        localStorage.setItem("totalBetNum", JSON.stringify(cloneTotalBetNum));
        break;
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

  //handle save
  const handleSave = () => {
    const today = new Date();
    const copyUserData = [...userData];
    const userDataObj = {
      name,
      numbers: numbers.slice(),
      totalBetAmt,
      stotalBetNum: totalBetNum.slice(),
      id: today.getTime(),
    };
    copyUserData.splice(0, 0, userDataObj);
    setUserData(copyUserData);
    toast.success("သိမ်းဆည်းပြီးပါပြီ");
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
                ရောင်းကြေးစုစုပေါင်း - {totalBetAmt}Ks
              </p>
            </div>

            <div className="col">
              <button
                className="btn btn-danger float-end mb-3"
                onClick={handleClearAll}
              >
                ရှင်းလင်းရန်
              </button>

              {/* save menu */}
              <button
                className="btn btn-success float-end me-2"
                data-bs-toggle="modal"
                data-bs-target="#saveModal"
              >
                သိမ်းဆည်းရန်
              </button>

              <div
                className="modal fade"
                id="saveModal"
                tabIndex="-1"
                aria-labelledby="saveModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="saveModalLabel">
                        အမည်ရေးထည့်ပါ
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <input
                        type="text"
                        value={name || ""}
                        onChange={(e) => {
                          setName(e.target.value);
                        }}
                        className="form-control"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        ပယ်ဖျက်ရန်
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSave}
                        data-bs-dismiss="modal"
                      >
                        သိမ်းဆည်းရန်
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Display;
