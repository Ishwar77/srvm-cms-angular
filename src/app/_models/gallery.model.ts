import { image_type } from "./models-enum";

export class Gallery {
  idgallery: number;
  title: string;
  category: number;
  gallery_image: string;
  gallery_image_small: string;
  category_obj;
  image_type: image_type;
  video_url;
  constructor() { }
}
