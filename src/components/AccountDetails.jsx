import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const AccountDetails = ({
  userData,
  setUserData,
  setNumbers,
  setTotalBetNum,
  setTotalBetAmt,
  setCurrentId,
}) => {
  const para = useParams();
  const history = useNavigate();
  const [data] = userData.filter((item) => item.id.toString() === para.id);
  const [searchValue, setSearchValue] = useState("");

  let displayBetNum = [...data.stotalBetNum];
  displayBetNum = displayBetNum.filter((item) =>
    item.betNum.includes(searchValue)
  );
  const handleDelete = () => {
    let copyUserData = [...userData];
    copyUserData = copyUserData.filter((item) => item.id !== data.id);
    setUserData(copyUserData);
    history("/details");
  };

  const handleEdit = () => {
    setNumbers(data.numbers);
    setTotalBetNum(data.stotalBetNum);
    setTotalBetAmt(data.totalBetAmt);
    setCurrentId(data.id);
    history("/");
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col">
          <h3 className="fw-bold mb-3">အမည် - {data.name}</h3>
        </div>
        <div className="col">
          <button
            className="btn btn-secondary float-end"
            onClick={() => history("/details")}
          >
            အနောက်သို့ <i className="bi bi-arrow-90deg-left"></i>
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3">
          <h3>စာရင်းမှတ်တမ်း</h3>
          <ul className="list-group mt-3 display">
            {data.numbers.map((num) => (
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
          <div className="row">
            <div className="col">
              <p className="fw-bold fs-5">
                ရောင်းကြေးစုစုပေါင်း - {data.totalBetAmt}Ks
              </p>
              <p className="fw-bold fs-5">
                ကော်မရှင် - {parseInt(data.totalBetAmt) * 0.15}Ks
              </p>
            </div>
            <div className="col">
              <button
                className="btn btn-danger float-end ms-2"
                data-bs-toggle="modal"
                data-bs-target="#confirm"
              >
                ပယ်ဖျက်ရန်
              </button>
              <div
                className="modal fade"
                id="confirm"
                tabIndex="-1"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
              >
                <div className="modal-dialog">
                  <div className="modal-content">
                    <div className="modal-header">
                      <h5 className="modal-title" id="exampleModalLabel">
                        ပယ်ဖျက်ရန်
                      </h5>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div className="modal-body">
                      <h3>ပယ်ဖျက်ရန်သေချာပါသလား....</h3>
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        ပိတ်ရန်
                      </button>
                      <button
                        type="button"
                        className="btn btn-primary"
                        data-bs-dismiss="modal"
                        onClick={handleDelete}
                      >
                        သေချာသည်
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-info float-end" onClick={handleEdit}>
                ပြင်ဆင်ရန်
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;
