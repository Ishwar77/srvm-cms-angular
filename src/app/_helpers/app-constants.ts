// Only Common Constants
export class AppConstants {
  // APP NAME
  public static readonly APP_NAME = "SVRM WebApp";
  // APP COMMON
  public static readonly GIGMOS_TOKEN = "5B4CF7D3FC4579796F1D9898EDFE1";
  public static readonly SRVM_TOKEN = "5B4CF7D3FC4579796F1D9898EDFE1";
  public static readonly BUILD_TYPE: string = "PROD"; // , DEV, TEST, PROD

  // RESPONSE STATUS CODES
  public static readonly RESPONSE_STATUS_CODE_SUCCESS = 200;
  public static readonly RESPONSE_STATUS_CODE_ALREADY_REPORTED = 208;
  public static readonly RESPONSE_STATUS_CODE_UNAUTHORIZE = 401;
  // RESPONSE STATUS CODES ENDS

  // VALIDATION
  // EMAIL VALIDATION PATTERN
  public static readonly EMAIL_PATTERN_EMPLOYEE =
    "[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@gigmos+\\.com";
  public static readonly EMAIL_PATTERN =
    "[a-zA-Z0-9._]+[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}";
  public static readonly INDIA_PAN_NUMBER_PATTERN =
    "^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}";
  // MOBILE NUMBER VALIDATION PATTERN
  public static readonly CELL_NUMBER_PATTERN = "[0-9+]*";
  // NAME VALIDATION PATTERN
  public static readonly APLHA_NUMERIC_PATTERN = "[a-zA-Z0-9- ]*";
  public static readonly APLHA_NUMERIC_NOSPACE_PATTERN = "[a-zA-Z0-9]*";
  public static readonly APLHABETS_ONLY_PATTERN = "[a-zA-Z ]*";
  public static readonly APLHABETS_ONLY_NOSPACE_PATTERN = "[a-zA-Z]*";
  // ONLY NUMBERS VALIDATION PATTERN
  public static readonly NUMERIC_PATTERN = "[0-9]*";
  // ONLY DECIMAL NUMBERS VALIDATION PATTERN
  public static readonly DECIMAL_PATTERN = "[0-9.]*";

  // ONLY FILE TYPES VALIDATION FOR IMAGE
  public static readonly IMAGE_FILE_FORMATS_ARRAY = ["png", "jpeg", "jpg"];

  // VALIDATION ENDS

  // DATE FORMATS
  public static readonly APP_UI_DATE_FORMAT_1 = "DD MMM YYYY";
  public static readonly APP_UI_DATE_FORMAT = "DD/MM/YYYY";
  public static readonly APP_UI_DATE_TIME_FORMAT = "DD/MM/YYYY hh:mm a";
  public static readonly APP_HTTP_REQUEST_RESPONSE_DATE_FORMAT =
    "DD-MM-YYYY HH:mm:ss";

  // APP DATE-PICKER FORMAT
  public static readonly APP_DATE_PICKER_FORMATS = {
    parse: {
      dateInput: "LL"
    },
    display: {
      dateInput: "DD/MM/YYYY",
      monthYearLabel: "MMM YYYY",
      dateA11yLabel: "LL",
      monthYearA11yLabel: "MMMM YYYY"
    }
  };
  // DATE FORMATS ENDS

  public static readonly UROLE_MASTER_ID = 1;
  public static readonly UROLE_ADMIN_ID = 2;

  // USER ROLE NAMES ENDS
  public static readonly UROLE_MASTER_NAME = "Master";
  public static readonly UROLE_ADMIN_NAME = "Admin";

  // USER ROLE ENDS
  // DOCUMENT UPLOAD
  public static readonly FILE_UPLOAD_MAX_SIZE_LIMIT_MB = 2;

  // ENUM STATUS
  public static readonly STATUS_YES = "Yes";
  public static readonly STATUS_NO = "No";

  public static readonly YEAR_DROPDOWN_ITERATION_COUNT = 5;

  // EXCEL UPLOAD ONE
  public static readonly EXCEL_UPLOAD_ONE_FILE_DOWNLOAD_NAME_PREFIX =
    "Excel One";
  // EMAIL VALIDATION PATTERN
  public static readonly emailPattern =
    "[a-zA-Z0-9._]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}";
  // MOBILE NUMBER VALIDATION PATTERN
  public static readonly cellNumberPattern = "[0-9+]*";
  // NAME VALIDATION PATTERN
  public static readonly aplhaNumberic = "[a-zA-Z0-9\u0600-\u06FF ]*";
  public static readonly aplhabetsOnly = "[a-zA-Z\u0600-\u06FF ]*";
  // ONLY NUMBERS VALIDATION PATTERN
  public static readonly numbericPattern = "[0-9]*";
  // ONLY DECIMAL NUMBERS VALIDATION PATTERN
  public static readonly decimalPattern = "[0-9.]*";
  // ONLY FILE TYPES VALIDATION FOR IMAGE
  public static readonly imageFileFormats = [
    "png",
    "bmp",
    "jpeg",
    "jpg",
    "gif"
  ];

  public static readonly SLASH = "/";
  public static readonly ASSETS_IMAGE_PATH = "assets";
  public static readonly IMAGE_PATH = "images";
  public static readonly ADVERTISER_IMAGE_PATH = "adCampaign";
  public static readonly ASSETS_FOLDER_PATH = "/assets/images/";
  public static readonly SYSTEM_PATH_FOR_STORAGE_DEV = "D:/opt/stavyah/cms";
  public static readonly MAX_SIZE_FOR_IMAGE_UPLOAD_IN_MB = 3;

  //year
  //public static readonly YEAR_DROPDOWN_ITERATION_COUNT = 5;
}
