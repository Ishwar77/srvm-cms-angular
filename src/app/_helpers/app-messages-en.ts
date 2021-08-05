import { AppConstants } from "./app-constants";

// Only Common Messages
export class AppMessagesEn {
  // App Name
  public static readonly app_name = "SRVM";

  //  common buttons
  public static readonly menu_label = "Menu";
  public static readonly add_label = "Add";
  public static readonly add_points_label = "Add Points";
  public static readonly edit_label = "Update";
  public static readonly view_label = "View";
  public static readonly delete_label = "Delete";
  public static readonly submit_label = "Submit";

  public static readonly close_label = "Close";
  public static readonly back_label = "Back";
  public static readonly next = "Next";
  public static readonly done_label = "Done";

  // student form save update
  public static readonly personal_info_label = "Personal info";
  public static readonly image_upload_label = "Image Upload";

  // image upload messages
  public static readonly label_img_error_msg = "Image not uploaded";

  // VALIDATION
  // VALIDATION MESSAGES
  public static readonly validation_messages_required = "Required";
  public static validation_messages_minlength(requiredLength) {
    return "At least " + requiredLength + " characters required";
  }
  public static validation_messages_maxlength(requiredLength) {
    return "Please enter no more than " + requiredLength + " characters";
  }
  public static validation_messages_min(requiredMin) {
    return "Minimum " + requiredMin + " required";
  }
  public static validation_messages_max(requiredMax) {
    return "Maximun " + requiredMax + " Allowed";
  }
  public static readonly validation_messages_pattern =
    "Invalid characters/pattern";
  public static readonly validation_messages_email = "Invalid email address";
  public static readonly validation_messages_password_not_matched =
    "Password not matched";
  public static readonly validation_messages_values_not_matched =
    "Values not matched";

  public static readonly validation_messages_end_date_must_be_greather =
    "End date must be greater than start date";
  // VALIDATION ENDS

  // RESPONSE STATUS
  // RESPONSE STATUS MESSAGES
  public static readonly res_msg_status_success = "Success";

  public static readonly res_msg_status_error =
    "Some error occurred, please try again";
  public static readonly res_msg_status_approved = "Approved";
  public static readonly res_msg_status_rejected = "Rejected";
  // RESPONSE WARNING MESSAGES
  public static readonly res_msg_conn_problem = "Connection Problem";
  public static readonly res_msg_conn_refused_by_server =
    "Connection refused by server";
  public static readonly res_msg_session_expired = "Session Expired";

  public static readonly res_msg_201 = "Invalid Request";
  public static readonly res_msg_204 = "No Content";
  public static readonly res_msg_208 = "Already Reported";

  // RESPONSE ERROR MESSAGES
  public static readonly res_msg_400 = "Bad Request";
  public static readonly res_msg_401 = "Not Authorised";
  public static readonly res_msg_server_busy = "Server Busy";
  public static readonly res_msg_no_response = "No Response";
  // RESPONSE STATUS ENDS

  // COMMON FORM LABELS
  public static readonly label_btn_submit = "Submit";
  public static readonly label_btn_verify = "Verify";
  public static readonly label_btn_save_and_continue = "Save & Continue";
  public static readonly label_btn_back = "Back";
  public static readonly label_back_to_home = "Back to Home";
  public static readonly label_btn_cancel = "Cancel";
  public static readonly label_no_data_found = "No data found";
  public static readonly label_select = "Select";
  public static readonly label_action = "Action";

  public static readonly label_active_status = "Active Status";
  public static readonly label_status = "Status";
  public static readonly label_active = "Active";
  public static readonly label_accept = "Accept";
  public static readonly label_reject = "Reject";

  //POPOVER LABELS
  public static readonly yes_label = "Yes";
  public static readonly no_label = "No";
  public static readonly user_msg_delete = "User Deleted Succesfully";
  public static readonly testimonial_msg_delete =
    "Testimonial Deleted Succesfully";
  // CAPTCHA
  public static readonly label_captcha_info =
    "Please enter the characters you see in the picture";
  public static readonly label_captcha = "Captcha text";

  public static readonly are_you_sure_want_to_delete = "Are you sure?";
  public static readonly label_data_delete = "Delete Data";
  public static readonly delete_label1 = "Deleted Successfully";
  // Document upload
  public static readonly label_doc_upload_formats_and_size =
    "Document format JPG,PNG,PDF and max size " +
    AppConstants.FILE_UPLOAD_MAX_SIZE_LIMIT_MB +
    " MB";
  public static readonly msg_error_doc_upload_formats_and_size =
    "Please make sure your file is in JPG,PNG or PDF and size is below " +
    AppConstants.FILE_UPLOAD_MAX_SIZE_LIMIT_MB +
    " MB";

  public static readonly cancel_label = "Cancel";
  public static readonly select_label = "Select";

  public static readonly img_format_error_message =
    "Please select valid file type - (png, bmp, jpeg, jpg)";

  public static readonly change_photo_label = "Change Photo";

  public static readonly image_uploaded_successfully_message =
    "Image Uploaded Successfully";
  public static readonly image_file_size_greater_than_message =
    "File size is greater than 3 MB";
  public static readonly please_select_image_file_message =
    "Please select file to upload";
  public static readonly image_uploaded_un_success_message =
    "Image not Uploaded Successfully";
  // Password Updated
  public static readonly password_updated_success_message =
    "Password Updated Successfully";
  public static readonly LOGIN_MOBILE_NUMBER_MSG_ERROR =
    "Incorrect Username And Password";
  public static readonly LOGIN_PASSWORD_MSG_ERROR = "Incorrect  Password";
  public static readonly LOGIN_MAX_ATTEMPTS_MSG_ERROR =
    "You Have Logged In Max Attempts..";
}

export class LoginMessagesEn {
  // LOGIN ERROR MESSAGES
  public static readonly msg_error_login_email_not_exist =
    "Email number does not exist";
  public static readonly msg_error_login_incorrect_password =
    "You have entered incorrect password";
  public static readonly msg_error_login_max_attempts =
    "Max Login attempts reached kindly reset your password using Forgot Password Link";
  // LOGIN MESSAGES
  public static readonly heading_login_srvm_login = "SRVM Login";
  public static readonly heading_login_employee_forgot_password =
    "Employee Forgot Password";
  public static readonly label_login_username = "Username";
  public static readonly label_login_email = "Email";
  public static readonly label_login_password = "Password";
  public static readonly label_login_forgot_your_password =
    "Forgot your password?";
  public static readonly label_student_allumini_data = "Alumni Data";
  "Student Application Form";
  public static readonly dont_have_an_account = "Don't have an account?";
  public static readonly label_login = "Login";
  public static readonly label_login_register_now = "Register Now!";

  public static readonly LOGIN_PASSWORD_MSG_ERROR = "Incorrect  Creditials";
}

export class StudentExcelEn {
  public static readonly heading_attendance_excel_upload = "Upload File";
  public static readonly label_attendance_select_file = "Attendance";
  public static readonly label_student_upload = "Student Data Upload";
  public static readonly label_student_data_download_sample_excel =
    "Download Sample";
}

export class AppComponentEn {
  public static readonly heading_welcome = "Welcome";
  public static readonly label_user = "User";
  public static readonly label_change_password = "Change Password";
  public static readonly label_logout = "Logout";
  public static readonly label_msg =
    "Copyright &copy; 2018 SRVM. All rights reserved.";
  public static readonly label_privacy_policy = "Privacy Policy";
  public static readonly label_terms_of_use = "Terms of Use";
}

export class AppMenuMessagesEn {
  // Worker
  public static readonly label_home = "Home";
  public static readonly label_event_list = "Events";
  public static readonly label_user_list = "Users";
  public static readonly label_gallery = "Gallery";
  public static readonly label_alumni_list = "Alumni";
  public static readonly label_banner = "Banner";
  public static readonly label_quotes = "Quotes";
  public static readonly label_history = "History";
  public static readonly label_testimonials = "Testimonials";
  public static readonly label_donate = "Donate";
  public static readonly label_about_us = "About Us";

  public static readonly label_contact_us = "Contact Us";
  public static readonly label_worker_dashboard = "Worker Dashboard";
  public static readonly label_menu_dashboard = "Dashboard";
  public static readonly label_worker_menu_bank_details = "Bank Details";
  public static readonly label_worker_menu_client_and_project =
    "Client and Project";
  public static readonly label_worker_menu_company_official =
    "Company Official";

  //student excel
  public static readonly label_student_excel = "Student-Excels";

  //student save or update
  public static readonly label_student_save_update = "Student-Form";

  //forgot password
  public static readonly menu_label_Student = "Student";
  public static readonly menu_label_User = "User";
  public static readonly verification_code_head_message =
    "Get a verification code";
  public static readonly verification_code_message =
    "To get a verification code, first confirm the Email you added to your account";
  public static readonly generate_otp_label = "Generate OTP";
  public static readonly cancel_label = "Cancel";
  public static readonly enter_otp_label = "Enter OTP";
  public static readonly resend_otp_label = "Resend OTP";
  public static readonly otp_sent_success_message =
    "OTP sent successfully to your registered Email";
  public static readonly alumni_save_success_message =
    "Application Saved successfully ";
  public static readonly submit_label = "Submit";
  public static readonly change_password_label = "Change Password";
  public static readonly Old_password_label = "Old Password";
  public static readonly password_label = "New Password";
  public static readonly confirm_password_label = "Confirm Password";
  public static readonly mobile_number_label = "Enter your number";
  public static readonly EMAIL_label = "Enter Your Email";
  public static readonly otp_sent_failure_message =
    "Your account not found, kindly contact SRVM";
  public static readonly otp_verify_success_message =
    "OTP verified Successfully";
  public static readonly RESPONSE_STATUS_MSG_ERROR =
    "Some error occurred, please try again";
  public static readonly otp_verify_failure_message =
    "Wrong OTP, please try again";
  public static readonly password_updated_success_message =
    "Password Updated Successfully";
}

export class ChangePasswordMessagesEn {
  public static readonly heading_change_password = "Change Password";
  public static readonly username_label = "Username";
  public static readonly old_password_label = "Old Password";
  public static readonly password_label = "New Password";
  public static readonly confirm_password_label = "Confirm Password";
  public static readonly label_change_password_select_file = "Select File";
  public static readonly submit_label = "Submit";
  public static readonly cancel_label = "Cancel";
  public static readonly menu_label_Student = "Student";
  public static readonly change_password_label = "Change Password";
  public static readonly password_updated_success_message =
    "Password Updated Successfully";
  public static readonly RESPONSE_STATUS_MSG_ERROR =
    "Some error occurred, please try again";
}

export class ForgotPasswordMessagesEn {
  public static readonly label_email = "Email";
}

export class StudentList {
  public static readonly menu_label_Student_list = "Student List";
  public static readonly name_label = "Student Name";
  public static readonly no_data_found_message = "No Data Found";
  public static readonly edit_label = "Edit";
  public static readonly delete_label = "Delete";
  public static readonly role_label = "Role";
  public static readonly active_label = "Active";
}
export class UserList {
  public static readonly menu_label_User_list = "User List";
  public static readonly name_label = "User Name";
  public static readonly no_data_found_message = "No Data Found";
  public static readonly edit_label = "Edit";
  public static readonly delete_label = "Delete";
}
