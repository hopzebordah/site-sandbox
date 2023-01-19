import { createApp } from 'https://unpkg.com/petite-vue?module'

const MOUNT_TARGET = '#admin-page'

const component = () => {
    return {
        logOut() {
            fetch('/api/logout', {
                method: 'DELETE',
            })
                .then(() => {
                    window.location.replace('/login')
                })
                .catch((err) => {
                    console.error(err)
                })
        },
    }
}

createApp(component()).mount(MOUNT_TARGET)
