import React from "react";
import Notification from "./Notification";
import { useDispatch, useSelector } from "react-redux";
import {
  getNotification,
  resetNotification,
} from "../../../redux/slice/NotificationSlice";
import { GetNotificationsService } from "../../../services/NotificationService";

export default function NotificationData() {
  const dispatch = useDispatch();

  const myNotifications = useSelector(
    (state) => state.notification?.notifications
  );

  const [notifications, setNotifications] = React.useState([]);

  const user = useSelector((state) => state.user.details);

  const getNotifications = async () => {
    const res = await GetNotificationsService(user?._id);
    if (res?.data?.user_notifications) {
      dispatch(getNotification(res.data.user_notifications));
    }
  };

  const unread = useSelector(
    (state) => state.notification?.unreadNotifications
  );

  React.useEffect(() => {
    setNotifications(myNotifications);
  }, [myNotifications]);

  React.useEffect(() => {
    getNotifications();
    dispatch(resetNotification());
  }, [dispatch, unread]);

  return (
    <div>
      <Notification data={notifications} />
    </div>
  );
}
