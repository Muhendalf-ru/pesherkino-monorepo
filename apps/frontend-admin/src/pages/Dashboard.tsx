import React, { useEffect, useState } from "react";
import http from "../api/http";

interface User {
  _id: string;
  telegramId: number;
  username?: string;
  balance: number;
  isBlocked: boolean;
  isActive: boolean;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await http.get("/users");
        setUsers(res.data.items);
      } catch (err) {
        console.error(err);
      }
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <h1>Users Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Telegram ID</th>
            <th>Balance</th>
            <th>Blocked</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u._id}>
              <td>{u._id}</td>
              <td>{u.telegramId}</td>
              <td>{u.balance}</td>
              <td>{u.isBlocked ? "Yes" : "No"}</td>
              <td>{u.isActive ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
