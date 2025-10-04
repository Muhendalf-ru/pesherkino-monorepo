import React from "react";
import TelegramLogin from "react-telegram-login";
import http, { setAuthToken } from "../api/http";

interface TelegramUser {
  id: number;
  first_name: string;
  username?: string;
  photo_url?: string;
  hash: string;
}

interface Props {
  onLogin: (token: string) => void;
}

const TelegramLoginButton: React.FC<Props> = ({ onLogin }) => {
  const handleTelegramResponse = async (user: TelegramUser) => {
    try {
      const res = await http.post("/auth/telegram", user);
      if (res.data.success) {
        const token = res.data.token;
        setAuthToken(token);
        onLogin(token);
      } else {
        alert("Telegram login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Telegram login error");
    }
  };

  return (
    <TelegramLogin
      botName="@TestAuthPesherkino_bot" // имя вашего бота без @
      dataOnauth={handleTelegramResponse}
      buttonSize="large"
    />
  );
};

export default TelegramLoginButton;
