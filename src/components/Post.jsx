import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { Link } from "react-router-dom";

export default function Post({ post }) {
  return (
    <Stack direction="horizontal" gap={3} className="Post">
      <Image src={post.author.avatar_url + "&s=48"} roundedCircle />
      <div>
        <p>
          <Link to={"/user/" + post.author.username}>
            {post.author.username}
          </Link>
          &nbsp; &mdash; &nbsp;
          {post.timestamp}
        </p>

        <p>{post.text}</p>
      </div>
    </Stack>
  );
}
