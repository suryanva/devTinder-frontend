import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";

axios.defaults.timeout = 15000;

createRoot(document.getElementById("root")).render(<App />);
