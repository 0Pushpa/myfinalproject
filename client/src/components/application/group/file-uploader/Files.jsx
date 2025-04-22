import React from "react";
import FileUploader from "./FileUploader";
import FilesDisplay from "./FilesDisplay";
import { useParams } from "react-router-dom";
import {
  DeleteFilesService,
  DownloadFileService,
  GetFilesService,
} from "../../../../services/GroupService";
import { toast } from "react-toastify";
const Files = () => {
  const params = useParams();
  const [isUpload, setIsUpload] = React.useState(false);
  const [files, setFiles] = React.useState([]);
  const downloadFile = async (name) => {
    const res = await DownloadFileService(name);
  };
  const removeFile = async (id) => {
    const res = await DeleteFilesService({ id });

    if (res?.status === 200) {
      const removedFile = files.filter((el) => el._id !== id);
      setFiles(removedFile);
    }
  };
  const getFiles = async () => {
    const res = await GetFilesService(params.id);
    console.log(res, "--res from File ---");
  
    if (res?.files) {
      const data = res.files.map((el) => ({
        ...el,
        name: el.fileName,
      }));
      setFiles(data);
      setIsUpload(false);
    }
  };
  

  React.useEffect(() => {
    getFiles();
  }, []);
  return (
    <>
      <FileUploader setIsUpload={setIsUpload} getFiles={getFiles} onSuccess={() => toast.success("File uploaded successfully!")}/>
      <FilesDisplay
        downloadFile={downloadFile}
        removeFile={removeFile}
        files={files}
        onSuccess={() => toast.success("File uploaded successfully!")}
      />
    </>
  );
};

export default Files;
