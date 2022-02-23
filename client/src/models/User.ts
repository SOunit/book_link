import Item from './Item';

class User {
  id: string;
  name: string;
  about: string;
  imageUrl: string;
  // createdAt: Date;
  items: Item[];
  isFollowing?: boolean;

  constructor(
    name: string,
    about: string,
    imageUrl: string,
    items: Item[],
    // createdAt: Date
  ) {
    this.id = Math.random().toString();
    this.name = name;
    this.about = about;
    this.imageUrl = imageUrl;
    this.items = [];
    // this.createdAt = createdAt;
  }
}

export default User;
