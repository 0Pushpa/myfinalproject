import HttpService from "./HttpService";

export const GetAssignmentService = async ({ userId }) => {
  const http = new HttpService();
  return await http.getData(`api/assignment/${userId}`);
};

export const GetAssignmentDetailsService = async (id) => {
  const http = new HttpService();
  return await http.getData(`api/assignment/details/${id}`);
};

export const PostAssignmentService = async (creds) => {
  const http = new HttpService();
  return await http.postData(creds, "api/assignment/");
};

export const PostUserAssignmentService = async (creds) => {
  const http = new HttpService();
  return await http.postData(creds, "api/assignment/user/");
};

export const DownloadAssignmentFileService = (credentials) => {
  const http = new HttpService();
  return http.downloadData(`api/assignment/download?file=${credentials}`);
};

export const PostPlagiarismService = async (creds) => {
  const http = new HttpService();
  return await http.postData(creds, "api/checkplagiarism");
};
