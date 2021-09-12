class Following {
  id: string;
  name: string;
  imageUrl: string;
  isFollowing: boolean;

  constructor(name: string, imageUrl: string, isFollowing: boolean) {
    this.id = Math.random().toString();
    this.name = name;
    this.imageUrl = imageUrl;
    this.isFollowing = isFollowing;
  }
}

export default Following;
