import { Box, Grid, IconButton } from "@mui/material";
import React, { useContext } from "react";
import { FcProcess } from "react-icons/fc";
// import { PostPlagiarismService } from "services/AssignmentService";
import styled from "styled-components";
import Docs from "../../../../assets/files/doc.png";
import Pdf from "../../../../assets/files/pdf.png";
import Ppt from "../../../../assets/files/ppt-file.png";
import Txt from "../../../../assets/files/txt-file.png";
import Excel from "../../../../assets/files/xls.png";
import notFound from "../../../../assets/no-data2.png";
import { SocketContext } from "../NewGroupInterface";
import DateFormatter from "../../../../utils/DateFormatter";
// import PlagiarismModal from "./PlagiarismModal";
import { HiDocumentReport } from "react-icons/hi";
import { useSelector } from "react-redux";
import ClearIcon from "@mui/icons-material/Clear";
import GetAppIcon from "@mui/icons-material/GetApp";


const Img = styled.img`
  width: 40px;
  height: 40px;
`;

const FileWrapper = styled(Grid)`
  padding: 5px;
  display: flex;
  cursor: pointer;
`;

const FileLayer = styled(Box)`
  box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.2);
  width: 95%;
  margin: 0 auto;
  padding: 5px;
`;

const FileCard = ({
  index,
  getImg,
  file,
  from,
  downloadFile,
  filesUrl,
  context,
  removeFile,
  detail,
}) => {
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  // const toggleModal = (id) => {
  //   setShowModal(!showModal);
  //   plagiarismPost(id);
  // };

  const userId = useSelector((state) => state?.user?.details?._id);
  // const plagiarismPost = async (id) => {
  //   setLoading(true);
  //   const res = await PostPlagiarismService({ userAssID: id });
  //   if (res?.data?.matcheddocument) {
  //     setData(res.data?.matcheddocument);
  //     setLoading(false);
  //   }
  // };
  return (
    <FileWrapper item xs={12} sm={6} md={4} key={index}>
      <FileLayer display="flex">
        <Box display={"flex"} alignItems="center" flex={4}>
          {getImg(file)}
          <Box wordBreak="no-break" fontSize="0.8rem" paddingLeft={1}>
            {file.name}
            {from === "assignment" && (
              <>
                <Box
                  component={"div"}
                  wordBreak="no-break"
                  fontSize="0.75rem"
                  color="primary"
                >
                  By: {file.userId?.name}
                </Box>
                <Box
                  component={"div"}
                  wordBreak="no-break"
                  fontSize="0.75rem"
                  color="primary"
                >
                  <Box component={"span"} fontWeight={600}>
                    Submitted On:
                  </Box>{" "}
                  {DateFormatter(file?.createdAt)}
                </Box>
              </>
            )}
            {from === "attendance" && (
              <Box
                component={"div"}
                wordBreak="no-break"
                fontSize="0.75rem"
                color="primary"
              >
                Date: {DateFormatter(file?.createdAt)}
              </Box>
            )}
          </Box>
        </Box>
        <Box item flex={1} display="flex">
          <IconButton
            edge="end"
            aria-label="download"
            style={{
              float: "right",
              marginRight: "1px",
            }}
            onClick={() => downloadFile(file.name)}
          >
            <GetAppIcon />
          </IconButton>
          {/* {detail?.createdBy !== userId &&
            from === "assignment" &&
            filesUrl.length > 1 && (
              <>
                <IconButton onClick={() => toggleModal(file._id)}>
                  <HiDocumentReport />
                </IconButton>
              </>
            )} */}
          {from !== "attendance" && context?.isAdmin && (
            <IconButton
              edge="end"
              aria-label="delete"
              style={{
                float: "right",
                marginRight: "5px",
              }}
              onClick={() => removeFile(file._id)}
            >
              <ClearIcon />
            </IconButton>
          )}
        </Box>
      </FileLayer>
      {/* <PlagiarismModal
        loading={loading}
        show={showModal}
        handleClose={toggleModal}
        data={data}
      /> */}
    </FileWrapper>
  );
};

const FilesToDisplay = ({
  from,
  detail,
  filesUrl,
  removeFile,
  downloadFile,
}) => {
  const getImg = (file) => {
    if (file.name.includes(".pdf")) {
      return <Img src={Pdf} alt="pdf" />;
    } else if (file.name.includes(".doc")) {
      return <Img src={Docs} alt="doc" />;
    } else if (file.name.includes(".xls") || file.name.includes(".csv")) {
      return <Img src={Excel} alt="xls" />;
    } else if (file.name.includes(".ppt")) {
      return <Img src={Ppt} alt="ppt" />;
    } else {
      return <Img src={Txt} alt="txt" />;
    }
  };

  const context = useContext(SocketContext);

  return (
    <Box>
      <Grid container>
        {filesUrl.map((file, index) => (
          <FileCard
            index={index}
            getImg={getImg}
            file={file}
            from={from}
            downloadFile={downloadFile}
            filesUrl={filesUrl}
            context={context}
            removeFile={removeFile}
            detail={detail}
          />
        ))}
      </Grid>
    </Box>
  );
};

const FilesDisplay = ({ from, detail, files, removeFile, downloadFile }) => {
  return (
    <Box padding={"15px"}>
      <Box>
        {files.length > 0 ? (
          <FilesToDisplay
            from={from}
            detail={detail}
            filesUrl={files}
            removeFile={removeFile}
            downloadFile={downloadFile}
          />
        ) : (
          <Box display="flex" justifyContent="center" alignItems="center">
            <img src={notFound} alt="not found" />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default FilesDisplay;
