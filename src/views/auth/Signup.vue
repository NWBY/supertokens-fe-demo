<script setup>
import { reactive } from 'vue';
import { signUp } from "supertokens-web-js/recipe/emailpassword";

const form = reactive({
    email: '',
    password: ''
})

async function signup() {
    try {
        let response = await signUp({
            formFields: [{
                id: "email",
                value: form.email
            }, {
                id: "password",
                value: form.password
            }]
        })

        if (response.status === "FIELD_ERROR") {
            // one of the input formFields failed validaiton
            response.formFields.forEach(formField => {
                if (formField.id === "email") {
                    // Email validation failed (for example incorrect email syntax),
                    // or the email is not unique.
                    window.alert(formField.error)
                } else if (formField.id === "password") {
                    // Password validation failed.
                    // Maybe it didn't match the password strength
                    window.alert(formField.error)
                }
            })
        } else {
            // sign up successful. The session tokens are automatically handled by
            // the frontend SDK.
            console.log('Login successful')
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
        <button @click="signup()">Submit</button>
    </div>
  </div>
</template>
