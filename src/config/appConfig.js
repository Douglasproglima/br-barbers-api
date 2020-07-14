require('dotenv').config();

export default {
  url: process.env.APP_URL,
  urlEmail: process.env.APP_URL,
  hostEmail: process.env.EMAIL_HOST,
  portEmail: process.env.EMAIL_PORT,
  secureEmail: false,
  auth: {
    userEmail: process.env.EMAIL_USER,
    passEmail: process.env.EMAIL_PASSWORD,
  },
};
