import { createApp } from 'https://unpkg.com/petite-vue?module'

const MOUNT_TARGET = '#login-form'

const defaultErrState = {
    error: false,
    classes: [],
}

const component = () => {
    return {
        email: '',
        emailErr: defaultErrState,
        password: '',
        passwordErr: defaultErrState,
        formLoading: false,
        updateEmail(e) {
            if (e.target.value) {
                this.setPropertyValidity('email', true)
                this.email = e.target.value
            }
        },
        updatePassword(e) {
            if (e.target.value) {
                this.setPropertyValidity('password', true)
                this.password = e.target.value
            }
        },
        setPropertyValidity(name, valid) {
            const propertyKey = `${name}Err`

            if (!(propertyKey in this)) {
                console.error(
                    `cannot set property validity for ${name}: ${propertyKey} not found in state!`,
                )
                return
            }

            if (valid) {
                this[propertyKey] = defaultErrState
            } else {
                this[propertyKey] = {
                    error: true,
                    classes: ['is-invalid'],
                }
            }
        },
        validateForm() {
            if (!this.email) this.setPropertyValidity('email', false)
            if (!this.password) this.setPropertyValidity('password', false)
            return this.email && this.password
        },
        submit(e) {
            e.preventDefault()
            e.stopPropagation()

            if (!this.validateForm()) return

            this.formLoading = true

            setTimeout(() => {
                this.formLoading = false
            }, 2000)

            console.log(
                `form submitted: email ${this.email} and password ${this.password}`,
            )
        },
    }
}

createApp(component()).mount(MOUNT_TARGET)
