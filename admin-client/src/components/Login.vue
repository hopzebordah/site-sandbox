<script setup lang="ts">
import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { FormErrorState, InputErrorState } from '../types'

const router = useRouter()

const formLoading = ref(false)

const form = ref({
    email: '',
    password: '',
})

const errState = ref<FormErrorState>({
    email: { error: false, classes: [] },
    password: { error: false, classes: [] },
})

const updateEmail = (event: Event) => {
    const target = event.target as HTMLInputElement
    form.value.email = target.value
    setPropertyValidity('email', true)
}

const updatePassword = (event: Event) => {
    const target = event.target as HTMLInputElement
    form.value.password = target.value
    setPropertyValidity('password', true)
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
    if (!form.value.password) setPropertyValidity('password', false)
    return form.value.email && form.value.password
}

const submit = (event: Event) => {
    event.preventDefault()
    event.stopPropagation()

    if (!validateForm()) return

    formLoading.value = true

    const data = {
        email: form.value.email,
        password: form.value.password,
    }

    axios({ method: 'POST', url: '/api/admin/login', data })
        .then((response) => {
            console.log(response)
            router.replace('/')
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
            <div class="col-1 col-lg-4" />
            <div class="col-1 col-lg-4 admin-form">
                <h3 class="text-center">Admin Logon</h3>
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
                    <div class="mb-3">
                        <label class="form-label" for="password"
                            >Password</label
                        >
                        <input
                            class="form-control"
                            :class="errState.password.classes"
                            type="password"
                            :value="form.password"
                            @input="updatePassword" />
                        <div class="invalid-feedback">
                            You must enter a password
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
                    <a class="link-secondary text-center mt-3" href="#"
                        >Forgot your password?</a
                    >
                </form>
            </div>
            <div class="col-1 col-lg-4" />
        </div>
    </div>
</template>

<style scoped></style>
