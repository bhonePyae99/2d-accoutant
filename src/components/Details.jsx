import { Link } from "react-router-dom";
const Details = ({ userData }) => {
  return (
    <div className="container mt-3">
      <h3 className="fw-bold">စာရင်းမှတ်တမ်းများ</h3>
      <ul className="list-group mt-3">
        {userData.map((item) => (
          <Link to={`/details/${item.id}`} key={item.id}>
            <li
              className="list-group-item"
              style={{ cursor: "pointer" }}
              key={item.id}
            >
              <span>{item.name}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default Details;
