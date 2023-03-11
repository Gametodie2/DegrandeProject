import HashLoader from "react-spinners/HashLoader";
import "./index.scss";
export default function Loader({ loading }) {
  if (loading) {
    return (
      <div className="loader-container" data-cy="loading">
        <HashLoader color={"#959393"} loading={loading} size={50} />
      </div>
    );
  }
  return null;
}