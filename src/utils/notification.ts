import { notification } from "antd";
import React from "react";

const success = (description: React.ReactNode) => {
  notification.destroy();
  notification.success({
    message: "Success",
    description,
  });
};

const error = (description: React.ReactNode) => {
  notification.destroy();
  notification.error({
    message: "Error",
    description,
  });
};

const Notification = {
  success,
  error,
};

export default Notification;
