import HttpService from "./HttpService";

export const AddDataService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "api/datastats/");
};
export const GetDataStatForDashBoard = async (id) => {
  const http = new HttpService();
  return await http.getData(`api/datastats/`);
};