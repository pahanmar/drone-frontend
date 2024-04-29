async function send_add_card_request(email, password) {
    try {
        let response = await post_with_fetch('/user/login', {
            email, password
        })

        console.log(response, response.status)

        let content = await response.json()
        if (response.status != 200) throw content?.message ?? 'Fetch error'

        const { token } = content
        localStorage.setItem("token", token)
    } catch (e) {
        console.log(e)
        alert(e)
    }
}

async function add_card(event) {
    try {
        const token = localStorage.getItem("token")
        if (!token) throw 'Please, login'

        event.preventDefault()

        const name = document.getElementById("input_name").value
        const type = document.getElementById("input_type").value
        const cost = document.getElementById("input_cost").value

        const input = document.querySelector('input[type="file"]')

        const data = new FormData()
        data.append('img', input.files[0])
        data.append('name', name)
        data.append('typeId', type)
        data.append('price', cost)
        data.append('count', 1)

        const response = await fetch(`${config.serverUrl}/product/`, {
            method: 'POST',
            body: data,
            headers: {
                'Authorization': `Token ${token}`
            }
        })

        const json = await response.json()

        if (response.status == 200) {
            return redirect('catalog.html')
        }

        throw json?.message ?? 'Failed to create card'
    } catch (e) {
        console.error(e)
        alert(e)
    }
}