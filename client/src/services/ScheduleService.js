import HttpService from "./HttpService";

export const GetScheduleService = async () => {
  const http = new HttpService();
  return await http.getData("api/schedule/");
};
export const AddScheduleService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "api/schedule/");
};
export const EditScheduleService = async (id) => {
  const http = new HttpService();
  return await http.getData(`api/schedule/${id}`);
};
