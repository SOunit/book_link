class User {
  id: string;
  name: string;
  about: string;
  imageUrl: string;
  // createdAt: Date;

  constructor(
    name: string,
    about: string,
    imageUrl: string
    // createdAt: Date
  ) {
    this.id = Math.random().toString();
    this.name = name;
    this.about = about;
    this.imageUrl = imageUrl;
    // this.createdAt = createdAt;
  }
}

export default User;
