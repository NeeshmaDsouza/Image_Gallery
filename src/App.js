import "./styles.css";
import { Home } from "./Components/Home";
import { addFireStoreDocument, readAllFireStoreDocument, uploadFile } from "./utils/firebase";

export default function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}
