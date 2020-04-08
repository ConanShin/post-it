class SessionStorage {
    save(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
        return this.user()
    }
    load(key) {
        return JSON.parse(sessionStorage.getItem(key))
    }
    user() {
        const user = JSON.parse(sessionStorage.getItem('user'))
        if (!user) return {}

        return {
            saveName: (newName) => {
                user.properties.nickname = newName
                sessionStorage.setItem('user', JSON.stringify(user))
            },
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
