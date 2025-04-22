const NameLogo = ({ group }) => {
  return (
    <div
      className="call__participants__interface"
      style={{
        background: "transparent",
        margin: 0,
      }}
    >
      <div
        className="call__participants__wrapper"
        style={{ paddingTop: "10px" }}
      >
        <div className="flex-1">
          <div
            className="user__box"
            style={{
              height: "100px",
              width: "100px",
              background: "#575757",
              border: "5px solid #fff",
              boxShadow: "0px 0px 5px 2px #e7e7e7",
            }}
          >
            <div
              className="user__circle"
              style={{
                color: "#fff",
              }}
            >
              {group?.split("")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NameLogo;
