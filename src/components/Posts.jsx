import React, { use } from "react";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";
import Post from "./Post";
import { useApi } from "../contexts/ApiProvider";
import More from "./More";

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL;

export default function Posts({ content }) {
  const [posts, setPosts] = useState();
  const [pagination, setPagination] = useState();
  const api = useApi();
  let url;

  switch (content) {
    case "feed":
    case undefined:
      url = "/feed";
      break;
    case "explore":
      url = "/posts";
      break;
    default:
      url = "/users/" + content + "/posts";
      break;
  }

  useEffect(() => {
    (async () => {
      const response = await api.get(url);
      console.log(response);
      if (response.ok) {
        setPosts(response.body.data);
        setPagination(response.body.pagination);
      } else {
        setPosts(null);
        setPagination(null);
      }
    })();
  }, [api, url]);

  async function handleMoreClick() {
    const response = await api.get(
      url + "?after=" + posts[posts.length - 1].timestamp
    );
    console.log(response);
    if (response.ok) {
      setPosts([...posts, ...response.body.data]);
      setPagination(response.body.pagination);
    }
  }
  return (
    <>
      {posts === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>
          {posts === null ? (
            <p>There are no posts available</p>
          ) : (
            <>
              {posts.map((post) => {
                return <Post key={post.id} post={post} />;
              })}
              <More pagination={pagination} loadNextPage={handleMoreClick} />
            </>
          )}
        </>
      )}
    </>
  );
}
