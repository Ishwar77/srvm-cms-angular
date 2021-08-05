import { deleted_status } from "./models-enum";

export class Event {
  idevent: number;
  event_name: string;
  location: string;
  description: string;
  short_description: string;
  created_by: string;
  updated_by: string;
  category: string;
  start_date: Date;
  end_date: Date;
  event_image: string;
  is_deleted: deleted_status;
  published_start_date: Date;
  published_end_date: Date;

  event_image_two: string;
  event_image_three: string;
  event_image_four: string;
  event_image_five: string;

  constructor() { }
}
