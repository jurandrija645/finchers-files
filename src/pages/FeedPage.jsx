import Body from "../components/Body";
import Posts from "../components/Posts";

export default function FeedPage({ sidebar, children }) {
  return (
    <Body sidebar>
      <Posts />
    </Body>
  );
}
