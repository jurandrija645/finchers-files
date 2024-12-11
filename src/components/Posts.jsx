import React, { use } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import Post from "./Post";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Posts() {
  const [posts, setPosts] = useState();

  useEffect(() => {
    (async () => {
      const response = await fetch(BASE_API_URL + "/api/feed");
      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setPosts(result.data);
      } else {
        setPosts(null);
      }
    })();
  }, []);
  return (
    <>
      {posts === undefined ? (
        <Spinner animation="border" />
      ) : (
        posts.map((post) => {
          return <Post key={post.id} post={post} />;
        })
      )}
    </>
  );
}
