import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MainContext } from "./App";
import toast from "react-hot-toast";

const WSContext = React.createContext({
  sendMessage: () => {},
  ws: null,
  connectionStatus: null,
  latestMessage: null,
});

export const useWebSocket = () => {
  const context = useContext(WSContext);
  if (!context)
    throw new Error("useWebSocket must be used within WebSocketProvider");
  return context;
};

export const WebSocketContext = ({ sessionToken, webSocketURL, children }) => {
  const CTX = useContext(MainContext);
  const ws = useRef(null);
  const [latestMessage, setLatestMessage] = useState(null);
  //   'connecting' | 'connected' | 'disconnected'
  const [connectionStatus, setConnectionStatus] = useState("connecting");
  const [errMsg, setErrMsg] = useState(false);
  const [showMsg, setShowMsg] = useState(false);
  const shouldReconnect = useRef(true);

  // send money here!
  const sendMessage = () => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    } else {
      toast("Internet required");
      setErrMsg("Internet required");
      setShowMsg(true);
      console.log("WebSocket is not open.");
    }
  };

  const connectSocket = () => {
    if (connectionStatus == "connected") return;

    ws.current = new WebSocket(`${webSocketURL}?token=${sessionToken}`);

    ws.current.onopen = () => {
      console.log("WebSocket connected ✅");
      setConnectionStatus("connected");

      // Initial message
      ws.current?.send(
        JSON.stringify({
          action: "getuserdetails",
          token: sessionToken,
        })
      );
    };

    // Add binary type to handle different message types
    ws.current.binaryType = "arraybuffer";

    ws.current.onmessage = async (event) => {
      try {
        const data = JSON.parse(event.data);

        // console.log("onmessage HERE!! =>>> ", data);
        // check if its logout time
        // if (data?.error) {
        //   console.log("WebSocket closed ❌, reconnecting...");
        //   ws.current?.close();
        //   setConnectionStatus("disconnected");
        //   logoutHandler();
        //   return;
        // }

        // update user information!
        if (data?.type === "USER_INFORMATION") {
          // setLatestMessage(data.data);
          setLatestMessage((prev) => {
            if (!prev || typeof prev !== "object") {
              return data.data;
            }

            return {
              ...prev,
              ...data.data,
            };
          });

          // CTX.setUserObj(data.data);
          CTX.setUserObj((prev) => {
            if (!prev || typeof prev !== "object") {
              return data.data;
            }

            return {
              ...prev,
              ...data.data,
            };
          });

          // await localStorage.setItem("@userObj", JSON.stringify(data.data));

          const stored = localStorage.getItem("@userObj");

          let updatedValue;

          if (!stored) {
            // nothing stored yet → just set new data
            updatedValue = data.data;
          } else {
            const parsed = JSON.parse(stored);

            // merge existing + new
            updatedValue =
              parsed && typeof parsed === "object"
                ? { ...parsed, ...data.data }
                : data.data;
          }

          localStorage.setItem("@userObj", JSON.stringify(updatedValue));

          return;
        }

        // if (data?.type === "ACCOUNT_NOTIFICATION") {
        //   toast(
        //     `${data?.payload?.body?.title} \n ${data?.payload?.body?.text}`
        //   );
        //   return;
        // }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error, event.data);
      }
    };

    ws.current.onclose = () => {
      // ws.current?.close();
      console.log("WebSocket closed ❌, reconnecting...");
      setConnectionStatus("disconnected");

      if (shouldReconnect.current) {
        setTimeout(connectSocket, 4000);
      }

      // setTimeout(connectSocket, 4000); // Reconnect after delay
    };

    ws.current.onerror = (err) => {
      console.log("WebSocket error 🚨:", err);
    };
  };

  const checkSmthFess = async () => {
    if (connectionStatus !== "connected") {
      const userObj = await localStorage.getItem("@userObj");
      if (userObj && userObj.length > 10) {
        const jsoned = JSON.parse(userObj);
        CTX.setUserObj(jsoned);
      }
    }

    if (sessionToken) {
      console.log("connectSocket FROM WS", sessionToken.length);
      console.log("Connecting socket with token length:");

      connectSocket();
      // } else {
      //   setConnectionStatus('disconnected');
      //   if (ws.current) {
      //     ws.current.close();
      //     ws.current = null;
      //   }
      //   return console.log('no sessionToken FROM WS');
    } else {
      const userObj = await localStorage.getItem("@userObj");
      if (userObj && userObj.length > 10) {
        const jsoned = JSON.parse(userObj);
        CTX.setUserObj(jsoned);
      }
    }
  };

  useEffect(() => {
    checkSmthFess();

    return () => {
      shouldReconnect.current = false; // 👈 IMPORTANT

      ws.current?.close();
    };
  }, [sessionToken]);

  return (
    <>
      <WSContext.Provider
        value={{ sendMessage, connectionStatus, latestMessage, ws }}
      >
        {children}
      </WSContext.Provider>
    </>
  );
};
