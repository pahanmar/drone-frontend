async function send_sign_in_request(email, password) {
    try {
        let response = await post_with_fetch('/user/login', {
            email, password
        })

        console.log(response, response.status)

        let content = await response.json()
        if (response.status != 200) throw content?.message ?? 'Fetch error'

        const { token } = content
        localStorage.setItem("token", token)
        
        redirect('index.html')
    } catch (e) {
        console.log(e)
        alert(e)
    }
}

async function sign_in() {
    try {
        const login = document.getElementById("login_input_sign").value
        const password = document.getElementById("password_input_sign").value

        if (!login || login.length == 0) throw 'Invalid login'
        if (!password || password.length == 0) throw 'Invalid password'

        send_sign_in_request(login, password)
    } catch (e) {
        console.error(e)
        alert(e)
    }
}