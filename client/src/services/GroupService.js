import HttpService from "./HttpService";

export const GetGroupService = async () => {
  const http = new HttpService();
  return await http.getData("api/group/");
};
export const GetMyGroupService = async (userId) => {
  const http = new HttpService();
  return await http.postData(userId, "api/group/my-groups/");
};
export const GetMyAccessedGroupService = async (userId) => {
  const http = new HttpService();
  return await http.postData(userId, "api/group/accessible-groups");
};
export const AddGroupService = async (credentials) => {
  const http = new HttpService();
  return await http.postData(credentials, "api/group/");
};
export const EditGroupService = async (credentials) => {
  const http = new HttpService();
  return await http.patchData(credentials, `api/group/${credentials.id}`);
};
export const IndividualGroupService = async (id) => {
  const http = new HttpService();
  return await http.getData(`api/group/${id}`);
};

export const DeleteGroupService = async (id) => {
  const http = new HttpService();
  return await http.deleteData(`api/group/${id}`);
};

export const GetAllUsersService = async () => {
  try {
    const http = new HttpService();
    const res = await http.getData("api/users");
    console.log(res, "--This is from Client Service get all users---");
    return res?.users;
  } catch (err) {
    console.error("❌ Error fetching users", err);
    return [];
  }
};
export const GetUsersInGroupService = async (groupId) => {
  try {
    const http = new HttpService();
    const res = await http.getData(`api/groupusers/${groupId}`);
    return res?.group_users;
  } catch (err) {
    console.error("❌ Error fetching users in group", err);
    return [];
  }
};


export const AddUserToGroupService = async (payload) => {
  try {
    const http = new HttpService(); //  instantiate the class
    const res = await http.postData(payload, "api/groupusers"); //  uses the right post method
    console.log(res, " User added to group successfully");
    return res;
  } catch (err) {
    console.error("❌ Failed to add user to group", err);
    return null;
  }
};

export const SendInvite = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/group/invite");
};

export const VerifyUsersAccessibilityService = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/group/accessibility");
};

export const LeaveGroupService = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/group/leave");
};

export const ChatService = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/chat");
};

export const GetChatService = (id) => {
  const http = new HttpService();
  return http.getData(`api/chat?groupId=${id}`);
};

export const UploadFileService = (credentials) => {
  const http = new HttpService();
  return http.postData(credentials, "api/file");
};

export const DownloadFileService = (credentials) => {
  const http = new HttpService();
  return http.downloadData(`api/file/download?file=${credentials}`);
};

export const GetFilesService = (id) => {
  const http = new HttpService();
  return http.getData(`api/file?groupId=${id}`);
};

export const DeleteFilesService = (id) => {
  const http = new HttpService();
  return http.postData(id, `api/file/delete`);
};

// export const UpdateGroupService = async (credentials) => {
//   const http = new HttpService();
//   return await http.postData(credentials, "api/group/forgot-password");
// };
// export const DeleteGroupService = async (credentials) => {
//   const http = new HttpService();
//   return await http.postData(credentials, "api/group/forgot-password");
// };
