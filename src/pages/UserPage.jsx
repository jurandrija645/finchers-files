import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import Spinner from "react-bootstrap/Spinner";
import { useParams } from "react-router-dom";
import Body from "../components/Body";
import { useApi } from "../contexts/ApiProvider";
import { useState, useEffect } from "react";
import TimeAgo from "../components/TimeAgo";
import Posts from "../components/Posts";

export default function UserPage() {
  const { username } = useParams();
  const [userData, setUserData] = useState();
  const api = useApi();

  useEffect(() => {
    async function getUserData() {
      const response = await api.get("/users/" + username);

      if (response.ok) {
        setUserData(response.body);
      } else {
        setUserData(null);
      }
    }

    getUserData();
  }, [username, api]);

  console.log(userData);
  return (
    <Body sidebar>
      {userData === undefined ? (
        <Spinner animation="border" />
      ) : (
        <>
          {userData === null ? (
            <p>User not found </p>
          ) : (
            <>
              <Stack>
                <Image
                  src={userData.avatar_url}
                  roundedCircle
                  height={128}
                  width={128}
                />
                <div>
                  <h1>{userData.username}</h1>
                  {userData.about_me && <h5>{userData.about_me}</h5>}
                  <p>
                    Member since: <TimeAgo isoDate={userData.first_seen} />
                    <br />
                    Last seen: <TimeAgo isoDate={userData.last_seen} />
                  </p>
                </div>
              </Stack>
              <Posts content={userData.id} />
            </>
          )}
        </>
      )}
    </Body>
  );
}
