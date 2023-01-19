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
        plaintext: '',
        plaintextErr: defaultErrState,
        formLoading: false,
        updateEmail(e) {
            if (e.target.value) {
                this.setPropertyValidity('email', true)
                this.email = e.target.value
            }
        },
        updatePlaintext(e) {
            if (e.target.value) {
                this.setPropertyValidity('plaintext', true)
                this.plaintext = e.target.value
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
            if (!this.plaintext) this.setPropertyValidity('plaintext', false)
            return this.email && this.plaintext
        },
        submit(e) {
            e.preventDefault()
            e.stopPropagation()

            if (!this.validateForm()) return

            this.formLoading = true

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: this.email,
                    plaintext: this.plaintext,
                }),
            })
                .then((response) => {
                    return response.json()
                })
                .then((data) => {
                    window.location.replace('/admin/settings')
                })
                .catch((err) => {
                    // TODO pop error toast
                    console.error(err)
                })
                .finally(() => {
                    this.formLoading = false
                })
        },
    }
}

createApp(component()).mount(MOUNT_TARGET)
