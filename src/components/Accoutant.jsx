import { useState } from "react";
import React from "react";
import Joi from "joi-browser";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import reverseFun from "../ulties/reverse";

const Accoutant = ({
  numbers,
  setNumbers,
  totalBetNum,
  setTotalBetNum,
  totalBetAmt,
  setTotalBetAmt,
  userData,
  setUserData,
  currentId,
  setCurrentId,
}) => {
  const [inputNum, setInputNum] = useState("");
  const [inputAmt, setInputAmt] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [name, setName] = useState("");
  const [reverse, setReverse] = useState(false);
  const navigate = useNavigate();
  let totalDisplay = [...totalBetNum];
  totalDisplay = totalDisplay.filter((item) =>
    item.betNum.includes(searchValue)
  );
  const inputRef = React.createRef();

  const schema = {
    betNum: Joi.number().required().label("Number"),
    betAmt: Joi.number().required().label("Ammount"),
    id: Joi.required(),
  };

  //Display Functions
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
    handleClearAll();
    toast.success("သိမ်းဆည်းပြီးပါပြီ");
  };
  //Accoutant Functions
  const validate = (validateTarget) => {
    const { error } = Joi.validate(validateTarget, schema, {
      abortEarly: false,
    });
    if (error === null) return null;
    const errors = {};
    for (let item of error.details) {
      errors[item.path[0]] = item.message;
    }
    return errors;
  };

  // adding value
  const addValue = (e) => {
    e.preventDefault();
    const today = new Date();
    const numberObj = {
      betNum: inputNum.trim(),
      betAmt: inputAmt.trim(),
      id: today.getTime(),
    };
    const totalNumberObj = {
      betNum: inputNum.trim(),
      betAmt: inputAmt.trim(),
      id: today.getTime(),
    };
    const errors = validate(numberObj);
    if (errors) {
      setInputErrors(errors);
      return;
    }
    setInputErrors({});
    add(numberObj, totalNumberObj);
    if (reverse) {
      const reverseNumberObj = {
        betNum: reverseFun(inputNum.trim()),
        betAmt: inputAmt.trim(),
        id: today.getTime() + "d",
      };
      const reverseTotalNumberObj = {
        betNum: reverseFun(inputNum.trim()),
        betAmt: inputAmt.trim(),
        id: today.getTime() + "d",
      };
      add(reverseNumberObj, reverseTotalNumberObj);
    }
    setInputNum("");
    setInputAmt("");
    inputRef.current.focus();
  };

  const add = (numberObj, totalNumberObj) => {
    setTotalBetAmt((p) => parseInt(p) + parseInt(inputAmt));

    const copyTotalBetNum = [...totalBetNum];
    const copyNumbers = [...numbers];
    copyNumbers.splice(0, 0, numberObj);
    setNumbers((p) => [numberObj, ...p]);
    let found = false;
    for (let i = 0; i < copyTotalBetNum.length; i++) {
      if (copyTotalBetNum[i].betNum === totalNumberObj.betNum) {
        const num1 = parseInt(copyTotalBetNum[i].betAmt);
        const num2 = parseInt(totalNumberObj.betAmt);
        copyTotalBetNum[i].betAmt = num1 + num2;
        setTotalBetNum(copyTotalBetNum);
        found = true;
        break;
      }
    }
    if (!found) {
      copyTotalBetNum.splice(0, 0, numberObj);
      setTotalBetNum((p) => [totalNumberObj, ...p]);
    }
  };

  //handling edit
  const handleEdit = () => {
    const copyUserData = userData.map((item) => ({ ...item }));
    for (let i = 0; i < copyUserData.length; i++) {
      if (copyUserData[i].id === currentId) {
        const editedObj = {
          name: copyUserData[i].name,
          numbers,
          totalBetAmt: totalBetAmt,
          stotalBetNum: totalBetNum,
          id: currentId,
        };
        copyUserData[i] = { ...editedObj };
        setUserData(copyUserData);
        toast.success("ပြင်ဆင်ပြီးပါပြီ");
        handleClearAll();
        setCurrentId("");
        navigate("/details");
      }
    }
  };

  return (
    <>
      <div className="container mt-5">
        <form className="row" onSubmit={addValue}>
          <div className="col-md-3">
            <label htmlFor="number" className="form-lable pb-2">
              နံပါတ်
            </label>
            <input
              autoFocus
              value={inputNum || ""}
              ref={inputRef}
              type="text"
              name="numberInput"
              id="numberInput"
              className={
                inputErrors["betNum"]
                  ? "form-control is-invalid"
                  : "form-control"
              }
              onChange={(e) => {
                setInputNum(e.target.value);
              }}
            />
          </div>
          <div className="col-md-3">
            <label htmlFor="number" className="form-lable pb-2">
              ငွေကြေး
            </label>
            <input
              type="number"
              value={inputAmt || ""}
              onChange={(e) => {
                setInputAmt(e.target.value);
              }}
              name="ammount"
              id="ammount"
              className={
                inputErrors["betAmt"]
                  ? "form-control is-invalid"
                  : "form-control"
              }
            />
          </div>
          <div className="col-md-4 position-relative">
            <div className="form-check position-absolute bottom-0">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={(e) => {
                  if (e.target.checked) {
                    setReverse(true);
                  } else {
                    setReverse(false);
                  }
                }}
              />
              <label
                className="form-check-label fw-bold fs-6"
                for="flexCheckDefault"
              >
                R
              </label>
            </div>
          </div>

          <div className="col-md-4 mt-3">
            <button type="submit" className="btn btn-primary">
              စာရင်းမှတ်ရန်
            </button>
          </div>
        </form>
      </div>
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
                {currentId === "" ? (
                  <>
                    {" "}
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
                  </>
                ) : (
                  <button
                    className="btn btn-success float-end"
                    onClick={handleEdit}
                  >
                    ပြင်ဆင်မှုကိုအတည်ပြုရန်
                  </button>
                )}
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
    </>
  );
};

export default Accoutant;
