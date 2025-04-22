import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container-abs">
      <div class="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
