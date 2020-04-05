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
                Kakao.Auth.setAccessToken(response.access_token)
                resolve(response.access_token)
            }
            const fail = function(error) {
                alert(error)
                reject(error)
            }
            Kakao.Auth.login({
                success,
                fail
            })
        })
    }
    logout() {
        Kakao.Auth.logout(function() {
            Promise.resolve()
        })
    }
}

export default new KakaoConnector()
