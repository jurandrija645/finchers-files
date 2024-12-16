import React, { use } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import Post from "./Post";
import {useApi} from "../contexts/ApiProvider";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Posts() {
  const [posts, setPosts] = useState();
  const api = useApi();

  useEffect(() => {
    (async () => {
      const response = await api.get('/feed');
      if (response.ok) {
        setPosts(response.body.data);
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
