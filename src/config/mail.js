import appConfig from './appConfig';

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
};
