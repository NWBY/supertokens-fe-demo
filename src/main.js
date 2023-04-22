import { createApp } from 'vue'
import { createPinia } from 'pinia'

import SuperTokens from 'supertokens-web-js';
import Session from 'supertokens-web-js/recipe/session';
import EmailPassword from 'supertokens-web-js/recipe/emailpassword'

import App from './App.vue'
import router from './router'

import './assets/main.css'

SuperTokens.init({
    appInfo: {
        apiDomain: "http://localhost:8000",
        apiBasePath: "/auth",
        appName: "ena-template",
    },
    recipeList: [
        Session.init(),
        EmailPassword.init(),
    ],
});

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
