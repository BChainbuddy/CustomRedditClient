import "./App.css";
import Subreddit from "../Features/Subreddits/Subreddits";
import Search from "../Components/Search";
import Posts from "../Features/Posts/Posts";
import { useEffect, useState } from "react";
import Link from "react";
import { useSelector } from "react-redux";
import {
  errorLoading,
  getPosts,
  loadingPosts,
} from "../Features/Posts/PostsSlice";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [authorizationToken, setAuthorizationToken] = useState("");

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

  function getRedirected() {
    console.log("GETTING REDIRECTED!");
    const scope =
      "identity edit flair history modconfig modflair modlog modposts modwiki mysubreddits privatemessages read report save submit subscribe vote wikiedit wikiread";

    let url = "https://www.reddit.com/api/v1/authorize";
    url += "?client_id=" + encodeURIComponent(process.env.REACT_APP_CLIENTID);
    url += "&response_type=code";
    url += "&state=" + encodeURIComponent(state);
    url += "&redirect_uri=" + process.env.REACT_APP_REDIRECT_URI;
    url += "&duration=permanent";
    url += "&scope=" + encodeURIComponent(scope);

    window.location = url; // Redirect user for authorization
  }

  useEffect(() => {
    const getTokenFromUrl = () => {
      let url = new URL(window.location);
      return url.searchParams.get("code");
    };

    const token = getTokenFromUrl();

    if (token) {
      console.log(token);
      setAccessToken(token);
      console.log("LOOPED HERE");
      // console.log(`This is the access token ${token}`);
      // console.log(`This is client id ${process.env.REACT_APP_CLIENTID}`);
      // console.log(
      //   `This is client secret ${process.env.REACT_APP_CLIENTSECRET}`
      // );
      // console.log(`This is secret ${process.env.REACT_APP_SECRET}`);
      if (!authorizationToken) {
        fetch("https://www.reddit.com/api/v1/access_token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
              "Basic " +
              btoa(
                process.env.REACT_APP_CLIENTID +
                  ":" +
                  process.env.REACT_APP_CLIENTSECRET
              ),
          },
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: accessToken,
            redirect_uri: process.env.REACT_APP_REDIRECT_URI,
          }),
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error("Network response was not ok");
            }
            return res.json();
          })
          .then((data) => {
            console.log(data);
            // console.log(`This is the real access token! ${data.access_token}`);
            setAuthorizationToken(data.access_token);
          })
          .catch((error) => {
            console.error("Error:", error);
            getRedirected();
          });
      }
    } else {
      console.log("b happens");
      getRedirected();
    }
  }, [accessToken]);

  return (
    <div className="App">
      <div id="logo">
        <img src="/redditLogo.png" height={30} width={30}></img>
        <p style={{ marginLeft: 5 }}>REDDITCLIENT</p>
      </div>
      <Subreddit token={authorizationToken}></Subreddit>
      <Search token={authorizationToken}></Search>
      <Posts token={authorizationToken}></Posts>
    </div>
  );
}

export default App;
