// import appConfig from './appConfig';

/* export default {
  host: appConfig.hostEmail,
  port: appConfig.portEmail,
  secure: false,
  auth: {
    user: appConfig.auth.userEmail,
    pass: appConfig.auth.passEmail,
  },
  default: {
    from: 'Equipe Proglima <noreply@douglasproglima.com>',
  },
}; */

export default {
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
  default: {
    from: 'Equipe Proglima <noreply@douglasproglima.com>',
  },
};
