class Item {
  id: string;
  title: string;
  author: string;
  // imageUrl: string;
  // createdAt: Date;

  constructor(
    title: string,
    author: string
    // imageUrl: string,
    // createdAt: Date
  ) {
    this.id = Math.random().toString();
    this.title = title;
    this.author = author;
    // this.imageUrl = imageUrl;
    // this.createdAt = createdAt;
  }
}

export default Item;
