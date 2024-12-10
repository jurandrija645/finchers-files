import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Body from "./components/Body";

export default function App() {
  const posts = []; // This is the array that will hold the posts

  return (
    <Container fluid className="App">
      <Header />
      <Body sidebar>
        <Posts />
      </Body>
    </Container>
  );
}
