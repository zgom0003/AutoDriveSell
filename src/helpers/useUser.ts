import { useState } from "react";

type User = {
  id: number;
  createdAt: Date;
  email: string;
  isAdmin: boolean;
};

async function getUser(): Promise<User | null> {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/auth/user`, { credentials: "include" });
  if (!res.ok) return null;
  const data = await res.json();
  return data as User;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    getUser().then((user) => setUser(user));
  }

  return user;
}
