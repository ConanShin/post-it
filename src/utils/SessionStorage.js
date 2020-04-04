class SessionStorage {
    save(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    }
    load(key) {
        return JSON.parse(sessionStorage.getItem(key))
    }
    user() {
        const user = JSON.parse(sessionStorage.getItem('user'))
        return {
            id: user.id,
            name: user.properties.nickname,
            image: user.properties.thumbnail_image
        }
    }
    flush() {
        sessionStorage.clear()
    }
}

export default new SessionStorage()
