const API = {
  ERROR_500_DATABASE: {
    error: {
      errors: [
        {
          domain: 'Database',
          reason: 'Internal error',
          message: 'Database failed to send data.',
        },
      ],
      code: 500,
      message: 'Database failed to send data.',
    },
  },
  PATH: {
    RANKING: '/ranking',
    RANKING_INFORMATION: '/ranking/information',
  },
};

module.exports = API;
