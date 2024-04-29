async function getAllCArds(){
  let list = document.querySelector('.tabs_content_item')

  try {
    let response = await fetch(`${config.serverUrl}/product`)
    let content = await response.json()

    if (!content?.rows || content.rows.length == 0) throw 'Invalid server data'

    for (let data of content.rows) {
        list.innerHTML +=`<div class="card">
        <img class="card_img" src="${config.imageServerUrl}/${data.img}" alt="">
        <div class="card_content">
        <h4 class="card_title">${data.name}</h4>
        <p class="card_price">$${data.price}</p>
      </div>
        <button onClick={add_to_cart('${data.img}','${data.name}','${data.price}')} class="card_link">add to bucket</button>
      </div>`
    }
  } catch (e) {
    list.innerHTML = 'No cards yet'
    console.log(e)
  }
}

getAllCArds()

function add_to_cart(img, name, price) {
  let cartData = localStorage.getItem("cart")
  let cart 
 
  if (!cartData) {
    cart = []
  } else {
    cart = JSON.parse(cartData)
  }

  let found = false

  for (let item of cart) {
    if (item.name == name) {
      found = true
      item.count = (item.count ?? 1) + 1
      break
    }
  }

  if (!found) {
    cart.push({
      img, name, price, count: 1
    })
  }

  localStorage.setItem("cart", JSON.stringify(cart))
  alert("Item added to cart")
}