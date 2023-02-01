<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { FormErrorState, InputErrorState } from '../types'

const formLoading = ref(false)

const form = ref({
    email: '',
})

const errState = ref<FormErrorState>({
    email: { error: false, classes: [] },
})

const updateEmail = (event: Event) => {
    const target = event.target as HTMLInputElement
    form.value.email = target.value
    setPropertyValidity('email', true)
}

const setPropertyValidity = (propertyName: string, valid: boolean) => {
    if (!(propertyName in errState.value)) {
        console.error(
            `cannot set property validity for nonexistent property ${propertyName}`,
        )
    }
    let newInputErrorState: InputErrorState = { error: false, classes: [] }
    if (!valid) {
        newInputErrorState = { error: true, classes: ['is-invalid'] }
    }
    errState.value[propertyName] = newInputErrorState
}

const validateForm = () => {
    if (!form.value.email) setPropertyValidity('email', false)
    return !!form.value.email
}

const submit = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!validateForm()) return

    formLoading.value = true

    const data = {
        email: form.value.email,
    }

    axios({ method: 'POST', url: '/api/admin/forgot', data })
        .then((response) => {
            console.log(response)
            // TODO pop a toast here that says 'we will send a message to that email if an account exists'
        })
        .catch((err) => {
            console.error(err)
        })
        .finally(() => {
            formLoading.value = false
        })
}
</script>

<template>
    <div class="admin-page d-flex flex-column justify-content-center">
        <div class="row">
            <div class="col-0 col-md-2 col-lg-3 col-xl-4" />
            <div class="col-12 col-md-8 col-lg-6 col-xl-4 admin-form">
                <h3 class="text-center">Password Reset</h3>
                <form class="d-flex flex-column mt-3">
                    <div class="mb-3">
                        <label class="form-label" for="email"
                            >Email address</label
                        >
                        <input
                            class="form-control"
                            :class="errState.email.classes"
                            type="email"
                            :value="form.email"
                            @input="updateEmail" />
                        <div class="invalid-feedback">
                            You must enter a valid email address
                        </div>
                    </div>
                    <button
                        class="btn btn-primary"
                        :disabled="formLoading"
                        @click="submit">
                        <div
                            class="spinner-border spinner-border-sm"
                            v-if="formLoading"></div>
                        <span v-else>Submit</span>
                    </button>
                    <router-link
                        to="/login"
                        class="link-secondary text-center mt-3"
                        >Back to login</router-link
                    >
                </form>
            </div>
            <div class="col-0 col-md-2 col-lg-3 col-xl-4" />
        </div>
    </div>
</template>
