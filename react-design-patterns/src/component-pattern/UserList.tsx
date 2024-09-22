/* eslint-disable @typescript-eslint/no-explicit-any */
// Presenter Component
export default function UserList({ data }: { data: any }) {
  console.log("users: ", data);
  return (
    <ul>
      {data?.users.map((user: any) => (
        <li key={user.id}>
          {user.firstName}
          {user.lastName}
        </li>
      ))}
    </ul>
  );
}
