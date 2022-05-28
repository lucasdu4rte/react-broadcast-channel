import React from "react";
import { useUserPresence } from "../../contexts/UserPresenceContext";

import styles from "./styles.module.scss";

const Home: React.FC = () => {
  const [status, toggleStatus] = useUserPresence();
  return (
    <div className={styles.container}>
      <h1>Home</h1>

      <code>{status}</code>

      <button onClick={toggleStatus}>Toggle</button>

      <a href="/" target="_blank" rel="noopener noreferrer">
        open another tab
      </a>
    </div>
  );
};

export default Home;
