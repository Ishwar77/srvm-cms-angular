import { student_status } from "./models-enum";

export class Student {
  idstudent: number;
  first_name: string;
  last_name: string;
  batch_from: string;
  batch_to: string;
  dob: Date;
  residential_address_one: string;
  residential_address_two: string;
  residential_city: string;
  residential_country: string;
  residential_pincode: string;
  permanent_address_one: string;
  permanent_address_two: string;
  permanent_city: string;
  permanent_country: string;
  permanent_pincode: string;
  mobile_number_one: string;
  mobile_number_one_code: string;
  mobile_number_two_code: string;
  mobile_number_two: string;
  email_id_one: string;
  email_id_two: string;
  designation: string;
  blood_group: string;
  occupation: string;
  other: string;
  status: student_status;
  unique_id: string;
  company: string;
  created_by: number;
  updated_by: number;
  profile_image: string;

  numberOfBatchFrom;
  constructor() { }
}
