# To run this app just:

- Clone this repository to your folder
- Type "npm install" in terminal
- Type "npm install firebase" in terminal
- Create "firebase-config" js file in scr/components and put there config from firebase
- Now you can run this by "npm start" or "yarn start"

## info

#### code in firebase-config.js is below

import { initializeApp } from "firebase/app"; <br/>
import { getAuth } from "firebase/auth"; <br/>

const firebaseConfig = { <br/>
apiKey: "xxxxxxxxxxxxxxxxxxxxxxxx", <br/>
authDomain: "xxxxxxxxxxxxxxxxxxxxxxxx", <br/>
projectId: "xxxxxxxxxxxxxxxxxxxxxxxx", <br/>
storageBucket: "xxxxxxxxxxxxxxxxxxxxxxxx", <br/>
messagingSenderId: "xxxxxxxxxxxxxxxxxxxxxxxx", <br/>
appId: "xxxxxxxxxxxxxxxxxxxxxxxx", <br/>
}; <br/> <br/>
const app = initializeApp(firebaseConfig); <br/>
export const auth = getAuth(app); <br/>
