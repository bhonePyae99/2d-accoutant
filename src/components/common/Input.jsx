const Input = ({ value, onChangeFun }) => {
  return (
    <input
      value={value || ""}
      type="text"
      name="numberInput"
      id="numberInput"
      className="form-control"
      onChange={(e) => {
        onChangeFun(e.target.value);
      }}
    />
  );
};

export default Input;
