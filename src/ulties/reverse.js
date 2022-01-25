const reverseFun = (item) => {
  let splitString = item.split("");
  splitString = splitString.reverse();
  let reverseStr = splitString.join("");
  return reverseStr;
};

export default reverseFun;
