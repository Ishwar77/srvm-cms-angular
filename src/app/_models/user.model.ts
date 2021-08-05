import { user_status, deleted_status } from "./models-enum";

export class User {
  iduser: number;
  UserName: string;
  Password: string;
  first_name: string;
  last_name: string;
  dob: Date;
  gender: string;
  email: string;
  cell_number: string;
  region: string;
  country: string;
  city: string;
  address_one: string;
  address_two: string;
  password: string;
  role: number;
  create_timestamp: string;
  update_timestamp: string;
  is_deleted: deleted_status; //enum
  status: user_status; //enum
  confirm_password: string;
  old_password: string;
}
