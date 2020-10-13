// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
	production: false,
	baseUrl: 'http://localhost:3000',
	avatarBaseUrl: 'https://ui-avatars.com/api/?name=',
	api: 'api',
	firebase: {
		apiKey: "AIzaSyCbz5w9Ch7zQpY9boDdl5WKUGAd9m_s--0",
		authDomain: "find-chat-rewards.firebaseapp.com",
		databaseURL: "https://find-chat-rewards.firebaseio.com",
		projectId: "find-chat-rewards",
		storageBucket: "find-chat-rewards.appspot.com",
		messagingSenderId: "1028956328555",
		appId: "1:1028956328555:web:11d52a4bfe552235ab972e",
		measurementId: "G-G9091ESZDZ"
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
