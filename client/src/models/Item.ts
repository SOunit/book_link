class Item {
  id: string;
  title: string;
  author: string;

  constructor(title: string, author: string) {
    this.id = Math.random().toString();
    this.title = title;
    this.author = author;
  }
}

export default Item;
