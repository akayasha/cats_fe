// cat-image.model.ts
export interface CatImage {
  id: string;
  url: string;
  width: number;
  height: number;
}

export interface CatImageResponse {
  message: string;
  data: CatImage[];
}
