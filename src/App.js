import "./App.css";
import Login from "./components/auth/Login";
import { get, post } from "./services/base";
import { useEffect } from "react";

function App() {
  async function createPost(authToken) {
    try {
      const body = {
        title: "New Post",
        body: "This is a new post.",
        userId: 1,
      };
      const data = await post(authToken, "/posts", body);
      console.log("Created Post:", data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  }

  // src/App.js

  useEffect(() => {
    const splash = document.getElementById("splash");
    if (splash) {
      splash.classList.add("splash-hidden");
      splash.addEventListener("transitionend", () => {
        splash.remove();
      });
    }
  }, []);

  async function fetchPostById(postId) {
    try {
      const data = await get(null, `/posts/${101}`);
      console.log(`Post ${postId}:`, data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
  }

  createPost();
  fetchPostById();
  useEffect(() => {
    const splash = document.getElementById("splash");
    if (splash) {
      splash.classList.add("splash-hidden");
      splash.addEventListener("transitionend", () => {
        splash.remove();
      });
    }
  }, []);
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
