import Container from "react-bootstrap/Container";
import Header from "./components/Header";
import Posts from "./components/Posts";
import Body from "./components/Body";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import FeedPage from "./pages/FeedPage";
import ExplorePage from "./pages/ExplorePage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <FeedPage />,
  },
  {
    path: "/explore",
    element: <ExplorePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/user/:username",
    element: <UserPage />,
  },
]);

export default function App() {
  const posts = []; // This is the array that will hold the posts

  return (
    <Container fluid className="App">
      <Header />
      <RouterProvider router={router} />
    </Container>
  );
}
