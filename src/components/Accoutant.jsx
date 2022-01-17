import { useState } from "react";
import React from "react";
import Joi from "joi-browser";

const Accoutant = ({ numbers, setNumbers, totalBetNum, setTotalBetNum }) => {
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
  return (
    <div className="container mt-5">
      <form className="row" onSubmit={addValue}>
        <div className="col-md-6">
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
        <div className="col-md-6">
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
