import ReactDOM from "react-dom/client";
import App from "./components/App";
import { LocaleProvider } from "./contexts/LocaleCotext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LocaleProvider defaultValue="ko">
    <App />
  </LocaleProvider>
);
