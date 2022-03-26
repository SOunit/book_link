export type Message = {
  id: string;
  userId: string;
  chatId: string;
  text: string;
  createdAt?: string;
};

export const getDisplayTime = (createdAt: string) => {
  const items = new Date(createdAt).toLocaleTimeString().split(':');
  items.splice(-1, 1);

  return items.join(':');
};
