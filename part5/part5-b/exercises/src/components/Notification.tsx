import React, { FC } from "react";

interface NotificationProps {
  message: string | null;
}
const Notification: FC<NotificationProps> = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className="error">{message}</div>;
};
export default Notification;
