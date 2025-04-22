const Participants = ({ participant }) => {
  return (
    <div className="call__participants__interface">
      <div className="call__participants__wrapper">
        <div className="flex-1">
          <div className="user__box">
            <div className="user__circle">
              {participant.userName.split("")[0].toUpperCase()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Participants;
