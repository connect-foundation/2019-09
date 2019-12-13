const ERROR_500_DATABASE = {
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
};

module.exports = { ERROR_500_DATABASE };
