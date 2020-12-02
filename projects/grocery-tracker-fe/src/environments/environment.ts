// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
