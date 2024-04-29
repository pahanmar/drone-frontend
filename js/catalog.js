async function getAllCArds(){
  let list = document.querySelector('.tabs_content_item')

  try {
    let response = await fetch(`${config.serverUrl}/product`)
    let content = await response.json()

    if (!content?.rows || content.rows.length == 0) throw 'Invalid server data'

    for (let data of content.rows) {
        list.innerHTML +=`<div class="card">
        <img class="card_img" src="${data.img}" alt="">
        <div class="card_content">
        <h4 class="card_title">${data.name}</h4>
        <p class="card_price">${data.price}</p>
      </div>
        <a href="#" class="card_link">see details</a>
      </div>`
    }
  } catch (e) {
    list.innerHTML = 'No cards yet'
    console.log(e)
  }
}

getAllCArds()