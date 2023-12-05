export declare namespace Post {
  interface IList {
    userId: number;
    id: number;
    title: string;
    body: string;
  }

  interface IComment {
    postId: number;
    id: number;
    name: string;
    email: string;
    body: string;
  }
}
