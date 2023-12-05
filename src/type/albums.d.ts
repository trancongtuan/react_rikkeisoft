export declare namespace Albums {
  interface IList {
    userId: number;
    id: number;
    title: string;
  }

  interface IPhoto {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  }
}
