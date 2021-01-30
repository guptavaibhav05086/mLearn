export const environment = {
  production: true,
  api_RegisterUser: "/api/Account/Register",
  baseUrl: "http://guptavaibhav-001-site7.ctempurl.com",
  //baseUrl: "http://localhost:39117",
  //
  userDetails: "/api/Students/GetUserProfile",
  tokenUrl: "/Token",
  guestRegister: "/api/Public/guestregister",
  registerFeedback: "/api/Public/userfeedback",
  getFeedback: "/api/Public/getuserfeedback?courseId=$courseId",
  forgotPassword: "/api/Public/resetPassword?email=$email",
  resetPassword: "/api/Account/ResetPassword",
  generateOrder: "/api/Public/generateorder",
  createBoooking: "/api/Public/CreateBooking",
  transactionValidate:
    "/api/Public/validateTransaction?paymentId=$paymentId&orderId=$orderId&signature=$signature"
};
