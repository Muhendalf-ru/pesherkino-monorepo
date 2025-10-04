declare module "react-telegram-login" {
  import * as React from "react";

  interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username: string;
    photo_url?: string;
    hash: string;
  }

  interface TelegramLoginProps {
    botName: string;
    dataOnauth: (user: TelegramUser) => void;
    buttonSize?: "small" | "medium" | "large";
    cornerRadius?: number;
    usePic?: boolean;
    requestAccess?: "write" | "read";
  }

  const TelegramLogin: React.FC<TelegramLoginProps>;
  export default TelegramLogin;
}
