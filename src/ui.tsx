import { useEffect } from "react";
import * as ReactDOM from "react-dom/client";
import "./styles/output.css";
import { AppProvider } from "./provider/app";

function App() {
  const handleSelection = (data: any) => {
    console.log("data:", data);
  };

  const getResources = async () => {};

  useEffect(() => {
    getResources();
    window.addEventListener("message", async (e) => {
      try {
        const data = e.data.pluginMessage;
        const actions: any = {
          SELECTION: handleSelection,
          DEFAULT: () => {},
        };
        return actions[data.type ?? "DEFAULT"]?.(data);
      } catch (error) {
        console.error(error);
      }
    });
  }, []);

  return (
    <AppProvider>
      <main>app</main>
    </AppProvider>
  );
}

const AppElement = document.getElementById("react-page");

if (AppElement) {
  ReactDOM.createRoot(AppElement).render(<App />);
}
