import NoItems from "../../assets/empty-folder.png";
import NoNoti from "../../assets/no-spam.png";
import { Box } from "@mui/material";

const NotFound = ({ item }) => {
  return (
    <Box
      display={"flex"}
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      height={100}
      style={{
        marginTop: "150px",
        opacity: 0.7,
      }}
    >
      <Box>
        {item === "notifications" ? (
          <img width="100" src={NoNoti} alt="not found" />
        ) : (
          <img width="120" src={NoItems} alt="not found" />
        )}
      </Box>
      <Box paddingTop="10px">No {item} available</Box>
    </Box>
  );
};

export default NotFound;
