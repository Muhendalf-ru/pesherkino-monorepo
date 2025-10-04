import React, { useState } from "react";
import TelegramLoginButton from "../components/TelegramLoginButton";

interface Props {
  onLogin: (token: string) => void;
}

const LoginPage: React.FC<Props> = ({ onLogin }) => {
  return (
    <div
      style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}
    >
      <TelegramLoginButton onLogin={onLogin} />
    </div>
  );
};

export default LoginPage;
