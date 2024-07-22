import { useEffect } from "react";
import "./App.css";
import { getApiCall } from "./apis/ApiCall";

function App() {
  useEffect(() => {
    getApiCall();
  }, []);
  return (
    <div className="App">
      <h1>App</h1>
      <button>Fetch</button>
    </div>
  );
}

export default App;
