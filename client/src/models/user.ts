import { Item } from './item';

export class User {
  id: string;
  name: string;
  imageUrl: string;
  about?: string;
  items?: Item[];
  isFollowing?: boolean;
  // createdAt: Date;

  constructor(
    name: string,
    about: string = '',
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
