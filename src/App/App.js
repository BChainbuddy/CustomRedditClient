import logo from "./logo.svg";
import "./App.css";
import Subreddit from "../Features/Subreddits/Subreddits";
import Search from "../Components/Search";
import Posts from "../Features/Posts/Posts";
import { useEffect, useState } from "react";

function App() {
  const [accessToken, setAccessToken] = useState("");

  function generateRandomString(length) {
    var text = "";
    var possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  const state = generateRandomString(16);

  useEffect(() => {
    const getTokenFromUrl = () => {
      return window.location.hash
        .substring(1)
        .split("&")
        .reduce((initial, item) => {
          let parts = item.split("=");
          initial[parts[0]] = decodeURIComponent(parts[1]);
          return initial;
        }, {});
    };

    const token = getTokenFromUrl().access_token;

    if (token) {
      setAccessToken(token);
    } else {
      console.log("b happens");
      const scope = "read";

      let url = "https://www.reddit.com/api/v1/authorize";
      url += "?client_id=" + encodeURIComponent(process.env.REACT_APP_CLIENTID);
      url += "&response_type=code";
      url += "&state=" + encodeURIComponent(state);
      url += "&redirect_uri=" + process.env.REACT_APP_REDIRECT_URI;
      url += "&duration=permanent";
      url += "&scope=" + encodeURIComponent(scope);

      window.location = url; // Redirect user for authorization
      // }
    }
  }, [accessToken]);

  return (
    <div className="App">
      <div id="logo">
        <p>REDDITCLIENT</p>
      </div>
      <Subreddit></Subreddit>
      <Search></Search>
      <Posts></Posts>
    </div>
  );
}

export default App;
