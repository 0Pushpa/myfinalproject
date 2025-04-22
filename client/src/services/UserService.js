import HttpService from "./HttpService";

export const GetUsersService = async () => {
  const http = new HttpService();
  return await http.getData("api/users/");
};
