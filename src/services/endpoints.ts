export const baseUrl = '/api/';

export const endPoints = {
  //Auth Api
  Login: baseUrl + 'app/v1/auth/register',
  OTP_GENERATE: baseUrl + 'app/v1/auth/otp/generate',
  VERIFY_OTP: baseUrl + 'app/v1/auth/otp/verify',
  //Dashboard Api
  CROP_CATEGORY: baseUrl + 'app/v1/category/crop-category',
  BUYER_CATEGORY: baseUrl + 'app/v1/category/buyer-category',
  AGRO_CATEGORY: baseUrl + 'app/v1/category/agroshop-category',
  CROP_NAME: baseUrl + 'app/v1/crop-name',
  //Fetch User type basic apis
  FARMERS_GET: baseUrl + 'app/v1/user/farmer',
  BUYERS_GET: baseUrl + 'app/v1/user/buyer',
  AGRO_GET: baseUrl + 'app/v1/user/agroshop',
  FPO_GET: baseUrl + 'app/v1/user/fpo',
  SELECT_ROLE: baseUrl + 'app/v1/user/user-type',

  //Crop Type
  CROP_TYPE: baseUrl + 'app/v1/category/crop-type',

  //Requirements
  REQUIREMENTS: baseUrl + 'app/v1/requirement',
  REQUIREMENTS_LIKE_DISLIKED: baseUrl + 'app/v1/requirement/like-dislike',

  //Users
  USER_DATA: baseUrl + 'app/v1/auth/user/',
  IMAGE_UPLOAD: baseUrl + 'app/v1/media-upload/',
  IMAGE_UPLOAD_Bulk: baseUrl + 'app/v1/media-upload/bulk/',
  LOGOUT: baseUrl + 'app/v1/auth/logout',

  //USER-TYPE
  USER_TYPE: baseUrl + 'app/v1/user/user-type',

  //Sell Crops
  SELL_CROP: baseUrl + 'app/v1/crop/sell',
  //Favourite
  FAVOURITE: baseUrl + 'app/v1/favorite-unfavorite',
  //Community
  COMMUNTY_DATA: baseUrl + 'app/v1/community',
  COMMUNTY_COMMENT: baseUrl + 'app/v1/community/comment',
  COMMUNITY_LIKE_DISLIKE: baseUrl + 'app/v1/community/like-dislike',
  GET_COMMUNITY_LIKE_COMMET: baseUrl + 'app/v1/community/comments/likes',
  BLOCK_COMMUNTY: baseUrl + 'app/v1/community/reports/blocks',

  //About US && contact us
  ABOUT: baseUrl + 'app/v1/cms',
  CONTACT: baseUrl + 'app/v1/contact-us',

  //Notification
  NOTIFICATION: baseUrl + 'app/v1/notification/list',
};

export const reqestMethod = {
  GET: 'GET',
  DELETE: 'DELETE',
  POST: 'POST',
  PUT: 'PUT',
};

export const localDb = {
  LOGIN_TOKEN: 'LOGIN_TOKEN',
  AUTH: 'Auth',
  CROP_CATEGORY: 'CROP_CATEGORY',
};
