import { UserPresenceProvider } from "./contexts/UserPresenceContext";
import Home from "./pages/Home";
import "./styles/global.scss";
import "./styles/reset.scss";

function App() {
  return (
    <UserPresenceProvider>
      <Home />
    </UserPresenceProvider>
  );
}

export default App;
