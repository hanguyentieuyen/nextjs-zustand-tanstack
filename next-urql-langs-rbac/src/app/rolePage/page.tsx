import { useSession } from "next-auth/react";

export default function AdminPage() {
  const { data: session } = useSession();

  if (!session?.user?.roles.includes("admin")) {
    return <p>Access Denied</p>;
  }

  return <p>Welcome, Admin!</p>;
}
