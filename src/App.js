import "./App.css";
import UploadImage from "./components/uploadImage/uploadImage";
import ShowUrls from "./components/showUrls/showUrls";
import DarkModeToggler from "./components/darkModeToggle/darkModeToggle";
import { observer } from "mobx-react-lite";

const App = observer(({ userStore }) => {
  return (
    <div
      className={
        userStore.darkMode !== true
          ? "app container-fluid bg-white"
          : "app container-fluid bg-dark text-light"
      }
    >
      <DarkModeToggler userStore={userStore} />
      <UploadImage userStore={userStore} />
      <ShowUrls userStore={userStore} />
    </div>
  );
});

export default App;
