import "./App.css";
import UploadImage from "./components/uploadImage/uploadImage";
import { observer } from "mobx-react-lite";

const App = observer(({ userStore }) => {
  return (
    <div className="App">
      <UploadImage userStore={userStore} />
    </div>
  );
});

export default App;
