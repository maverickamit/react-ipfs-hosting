import React, { useState, useEffect } from "react";
import "./showUrls.css";
import { observer } from "mobx-react-lite";

const ShowUrls = observer(({ userStore }) => {
  const [urls, setUrls] = useState([]);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/ipfs/public-gateway-checker/master/gateways.json"
    )
      .then((response) => response.json())
      .then((parsedata) => {
        setUrls(parsedata.slice(0, 20));
      })
      .catch((error) => {
        // handle your errors here
        console.error(error);
      });
  }, []);

  return (
    <div>
      <p className="h4">All Urls</p>
      {userStore.errorMessage !== "" ? (
        <p className="alert alert-danger">{userStore.errorMessage}</p>
      ) : (
        ""
      )}
      {userStore.isLoading ? (
        "Please wait.."
      ) : userStore.storageValue === "" ? (
        ""
      ) : (
        <ul>
          {urls.map((url, i) => {
            return (
              <li key={i}>
                <p className="h5">
                  <a
                    className={
                      userStore.darkMode !== true
                        ? "badge badge-primary"
                        : "badge badge-info"
                    }
                    href={url.slice(0, -5) + userStore.storageValue}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Link {i + 1}
                  </a>
                </p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
});
export default ShowUrls;
