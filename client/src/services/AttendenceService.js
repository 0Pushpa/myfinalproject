import HttpService from "./HttpService";

export const GetReportsService = async (groupId) => {
  const http = new HttpService();
  return await http.getData(`api/report/${groupId}`);
};

export const DownloadReportFileService = (credentials) => {
  const http = new HttpService();
  return http.downloadData(`api/report/download?file=${credentials}`);
};
