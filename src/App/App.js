import logo from "./logo.svg";
import "./App.css";
import Subreddit from "../Features/Subreddits/Subreddits";
import Search from "../Features/Search/Search";
import Posts from "../Features/Posts/Posts";

function App() {
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
