import { useState } from "react";

type User = {
  id: number;
  createdAt: Date;
  email: string;
  isAdmin: boolean;
  customer: {
    id: number;
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber?: string;
  };
};

async function getUser(): Promise<User | null> {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/profile/user`, {
    credentials: "include",
    mode: "cors",
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data as User;
}

async function updateUser(user: User) {
  const res = await fetch(`${import.meta.env.VITE_REACT_APP_SERVER_URL}/profile/user`, {
    method: "POST",
    credentials: "include",
    mode: "cors",
    body: JSON.stringify({
      firstName: user.customer.firstName,
      lastName: user.customer.lastName,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) return null;
  const data = await res.json();
  return data as User;
}

export default function useUser() {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    getUser().then((user) => setUser(user));
  }

  return { user, updateUser };
}
