<script setup>
import { reactive } from 'vue';
import { signIn } from "supertokens-web-js/recipe/emailpassword";

const form = reactive({
    email: '',
    password: ''
})

async function signin() {
    try {
        let response = await signIn({
            formFields: [{
                id: "email",
                value: form.email
            }, {
                id: "password",
                value: form.password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax).
                    window.alert(formField.error)
                }
            })
        } else if (response.status === "WRONG_CREDENTIALS_ERROR") {
            window.alert("Email password combination is incorrect.")
        } else {
            // sign in successful. The session tokens are automatically handled by
            // the frontend SDK.
            window.location.href = "/homepage"
        }
    } catch (err) {
        if (err.isSuperTokensGeneralError === true) {
            // this may be a custom error message sent from the API by you.
            window.alert(err.message);
        } else {
            window.alert("Oops! Something went wrong.");
        }
    }
}
</script>

<template>
  <div>
    <div>
      <label for="email">Email</label>
      <input type="text" id="email" v-model="form.email" />
    </div>
    <div>
      <label for="password">Password</label>
      <input type="text" id="password" v-model="form.password" />
    </div>
    <div>
      <button @click="signin()">Submit</button>
    </div>
  </div>
</template>
