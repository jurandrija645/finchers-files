import React from "react";

const posts = [
  {
    id: 1,
    text: "Movie One",
    timestamp: "a minute ago",
    author: {
      username: "Susan",
    },
  },
  {
    id: 2,
    text: "Movie Two",
    timestamp: "an hour ago",
    author: {
      username: "John",
    },
  },
];

export default function Posts() {
  return (
    <>
      {posts.length === 0 ? (
        <p>No movies yet</p>
      ) : (
        posts.map((post) => {
          return (
            <p key={post.id}>
              <b>{post.author.username}</b> &mdash; {post.timestamp} <br />
              {post.text}
            </p>
          );
        })
      )}
    </>
  );
}
