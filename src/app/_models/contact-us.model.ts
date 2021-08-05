import { deleted_status } from "./models-enum";

export class ContactUs {
  idcontact_us: string;
  name: string;
  email: string;
  comment: string;
  is_deleted: deleted_status;
  mobile_number: string;
  company: string;
  mobile_number_code: string;

  constructor() { }
}
