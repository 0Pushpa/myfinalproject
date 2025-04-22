import HttpService from "./HttpService";

export const GetNotificationsService = async (userId) => {
  const http = new HttpService();
  return await http.getDataWithParams("api/notification/", userId);
};

export const AcceptNotificationsService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(
    credentials,
    "api/notification/accept_notification"
  );
};

export const RejectNotificationsService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(
    credentials,
    "api/notification/reject_notification"
  );
};
