import { createContext, useContext, useEffect, useRef, useState } from "react";

enum UserStatus {
  ONLINE = "online",
  OFFLINE = "offline",
}
type UserPresenceContextValue = [UserStatus, () => void];
type UserPresenceProviderProps = {
  children: React.ReactNode;
};
type LocalReturnType = UserStatus | null;
const USER_PRESENCE_KEY = "user-presence";

export const UserPresenceContext = createContext<UserPresenceContextValue>([
  UserStatus.OFFLINE,
  () => null,
]);

export const UserPresenceProvider = ({
  children,
}: UserPresenceProviderProps) => {
  const [status, setStatus] = useState(
    () =>
      (localStorage.getItem(USER_PRESENCE_KEY) as LocalReturnType) ||
      UserStatus.OFFLINE
  );
  const bc = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    bc.current = new BroadcastChannel(USER_PRESENCE_KEY);
    bc.current.onmessage = (e: MessageEvent<any>) => setStatus(e.data);
    return () => {
      bc.current?.close();
    };
  }, []);

  const toggleStatus = () => {
    const newStatus =
      status === UserStatus.ONLINE ? UserStatus.OFFLINE : UserStatus.ONLINE;
    setStatus(newStatus);
    bc.current?.postMessage(newStatus);
    localStorage.setItem(USER_PRESENCE_KEY, newStatus);
  };

  return (
    <UserPresenceContext.Provider value={[status, toggleStatus]}>
      {children}
    </UserPresenceContext.Provider>
  );
};

export const useUserPresence = () => {
  try {
    const value = useContext(UserPresenceContext);

    return value;
  } catch (error) {
    throw new Error(
      "useUserPresence must be used within a UserPresenceProvider"
    );
  }
};
