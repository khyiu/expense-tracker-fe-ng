export const environment = {
  production: true,
  awsCognitoConfig: {
    loginEndpoint:
      'https://grocery-tracker-back-8.auth.eu-central-1.amazoncognito.com/login',
    loginFlowType: 'code',
    clientId: '4uq3crrcu59cbc408a4f7acijl',
    clientSecret: 'lo6vt6svaq6vejgk0upuockvaqnf23k755i3f10j0dpfdiioboo',
    loginRedirectUri: 'http://localhost:4200/purchases',
    tokenEndpoint:
      'https://grocery-tracker-back-8.auth.eu-central-1.amazoncognito.com/oauth2/token',
  },
};
