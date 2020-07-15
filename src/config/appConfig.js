require('dotenv').config();

/* export default {
  hostEmail: process.env.EMAIL_G_HOST,
  portEmail: process.env.EMAIL_G_PORT,
  secureEmail: false,
  auth: {
    userEmail: process.env.EMAIL_G_USER,
    passEmail: process.env.EMAIL_G_PASSWORD,
  },
}; */

export default {
  url: process.env.APP_URL,
  hostEmail: process.env.EMAIL_HOST,
  portEmail: process.env.EMAIL_PORT,
  secureEmail: false,
  auth: {
    userEmail: process.env.EMAIL_USER,
    passEmail: process.env.EMAIL_PASSWORD,
  },
};

/* export const redis = () => {
  return {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  };
}; */
