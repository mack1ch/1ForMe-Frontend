interface ChatType {
  name: string;
}

export function formatUserName(userName: string, chatType: ChatType): string {
  if (chatType.name === "Telegram") {
    return userName.startsWith("@") ? userName.substring(1) : userName;
  }
  return userName;
}
