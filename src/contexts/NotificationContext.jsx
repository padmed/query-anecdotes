import { createContext, useContext, useReducer, useState } from "react";

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "NEW_NOTIFICATION":
      return action.payload;

    case "HIDE_NOTIFICATION":
      return "";

    default:
      state;
  }
};

export const NotificationContext = createContext();

export const NotificationContextProvider = (props) => {
  const [timeoutId, setTimeoutId] = useState(null);
  const [notification, dispatchNotification] = useReducer(
    notificationReducer,
    ""
  );

  // Action creator/hook for showing and hiding the notification
  const newNotificationAction = (message, timeout) => {
    clearTimeout(timeoutId);
    dispatchNotification({ type: "NEW_NOTIFICATION", payload: message });
    setTimeoutId(
      setTimeout(() => {
        dispatchNotification({ type: "HIDE_NOTIFICATION" });
      }, timeout)
    );
  };

  return (
    <NotificationContext.Provider
      value={{
        notificationState: [notification, dispatchNotification],
        newNotificationAction,
      }}
    >
      {props.children}
    </NotificationContext.Provider>
  );
};

export const useNotificationValue = () => {
  const { notificationState } = useContext(NotificationContext);
  return notificationState[0];
};

export const useNotificationDispatch = () => {
  const { notificationState } = useContext(NotificationContext);
  return notificationState[1];
};

export const useNotification = () => {
  const { newNotificationAction } = useContext(NotificationContext);
  return newNotificationAction;
};
