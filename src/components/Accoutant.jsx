import { useState } from "react";
import React from "react";
import Joi from "joi-browser";

const Accoutant = ({
  numbers,
  setNumbers,
  totalBetNum,
  setTotalBetNum,
  totalBetAmt,
  setTotalBetAmt,
  userData,
  setUserData,
  setCurrentUser,
}) => {
  const [inputNum, setInputNum] = useState("");
  const [inputAmt, setInputAmt] = useState("");
  const [inputErrors, setInputErrors] = useState({});
  const inputRef = React.createRef();

  const schema = {
    betNum: Joi.number().required().label("Number"),
    betAmt: Joi.number().required().label("Ammount"),
    id: Joi.required(),
  };

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
    const errors = validate(numberObj);
    if (errors) {
      setInputErrors(errors);
      return;
    }
    setInputErrors({});
    let copyTotalBetAmt = totalBetAmt;
    copyTotalBetAmt += parseInt(inputAmt);
    setTotalBetAmt(copyTotalBetAmt);
    const totalNumberObj = {
      betNum: inputNum.trim(),
      betAmt: inputAmt.trim(),
      id: today.getTime(),
    };
    const copyTotalBetNum = [...totalBetNum];
    const copyNumbers = [...numbers];
    copyNumbers.splice(0, 0, numberObj);
    setNumbers(copyNumbers);
    let found = false;
    for (let i = 0; i < copyTotalBetNum.length; i++) {
      if (copyTotalBetNum[i].betNum === totalNumberObj.betNum) {
        const num1 = parseInt(copyTotalBetNum[i].betAmt);
        const num2 = parseInt(totalNumberObj.betAmt);
        copyTotalBetNum[i].betAmt = num1 + num2;
        setTotalBetNum(copyTotalBetNum);
        localStorage.setItem("totalBetNum", JSON.stringify(totalBetNum));
        found = true;
        break;
      }
    }
    if (!found) {
      copyTotalBetNum.splice(0, 0, totalNumberObj);
      setTotalBetNum(copyTotalBetNum);
    }
    setInputNum("");
    setInputAmt("");
    inputRef.current.focus();
  };
  //remove user
  const removeUser = (item) => {
    const newUserData = userData.filter((data) => data.id !== item.id);
    setUserData(newUserData);
  };

  //see userData
  const seeUserData = (item) => {
    setNumbers(item.numbers);
    setTotalBetAmt(item.totalBetAmt);
    setTotalBetNum(item.totalBetNum);
    setCurrentUser(item.name);
  };

  return (
    <div className="container mt-5">
      <form className="row" onSubmit={addValue}>
        <div className="col-md-5">
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
              inputErrors["betNum"] ? "form-control is-invalid" : "form-control"
            }
            onChange={(e) => {
              setInputNum(e.target.value);
            }}
          />
        </div>
        <div className="col-md-5">
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
              inputErrors["betAmt"] ? "form-control is-invalid" : "form-control"
            }
          />
        </div>
        <div className="col-md-2 position-relative">
          <button
            className="btn btn-info position-absolute bottom-0"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            စာရင်းမှတ်တမ်းများ
          </button>
          {/* offcanvas */}
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasRight"
            aria-labelledby="offcanvasRightLabel"
          >
            <div className="offcanvas-header">
              <h5 id="offcanvasRightLabel">စာရင်းမှတ်တမ်းများ</h5>
              <button
                type="button"
                className="btn-close text-reset"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="list-group">
                {userData.map((item) => (
                  <li
                    className="list-group-item d-flex justify-content-between"
                    key={item.id}
                  >
                    <strong
                      onClick={() => {
                        seeUserData(item);
                      }}
                      style={{ cursor: "pointer" }}
                    >
                      {item.name}
                    </strong>
                    <i
                      className="bi bi-x-lg fs-5 fw-bolder"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        removeUser(item);
                      }}
                    ></i>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <button type="submit" className="btn btn-primary">
            စာရင်းမှတ်ရန်
          </button>
        </div>
      </form>
    </div>
  );
};

export default Accoutant;
