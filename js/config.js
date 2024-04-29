const baseUrl = 'http://5.35.89.88:5000'

const config = {
    serverUrl: `${baseUrl}/api`,
    imageServerUrl: baseUrl
}

function post_with_fetch(endpoint, data) {
    return fetch(`${config.serverUrl}${endpoint}`, {
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(data)
    })
}

async function check_token(forward) {
    try {
        const token = localStorage.getItem("token")
        if (!token) return false

        const response = await fetch(`${config.serverUrl}/user/auth`, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        })

        const { status } = response
        const auth = status == 200

        if (forward) {
            redirect('index.html')
        }

        return auth
    } catch (e) {
        console.error(e)
    }
}

function redirect(url) {
    window.location.href = url
}