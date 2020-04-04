class KakaoConnector {
    constructor() {
        Kakao.init('8d154019fab779af4bff62678b0a6eb6')
    }
    fetchUserInfo() {
        return new Promise((resolve, reject) => {
            Kakao.API.request({
                url: '/v2/user/me',
                success: function(response) {
                    resolve(response)
                },
                fail: function(error) {
                    reject(error)
                }
            })
        })
    }
    login() {
        return new Promise((resolve, reject) => {
            const success = function(response) {
                console.log('succes??')
                Kakao.Auth.setAccessToken(response.access_token)
                console.log('success access token', response.access_token, this)
                resolve(response.access_token)
            }
            const fail = function(error) {
                alert(error)
                reject(error)
            }
            console.log('login trying')
            Kakao.Auth.login({
                success,
                fail
            })
            console.log('login tried!')
        })
    }
    logout() {
        Kakao.Auth.logout(function() {
            alert('success log out')
            Promise.resolve()
        })
    }
}

export default new KakaoConnector()
