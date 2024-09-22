import { useEffect, useState } from "react";
import UserList from "./UserList";

export default function UserContainer() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);
  return <UserList data={users} />;
}
