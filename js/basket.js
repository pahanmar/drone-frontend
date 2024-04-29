async function renderBasket(){
    let list = document.getElementById('cart_section')
    let d = localStorage.getItem("cart")

    if (!d) {
        list.innerHTML = 'Nothing in cart'
        return;
    }

    let data = JSON.parse(d)

    if (data.length == 0) {
        list.innerHTML = 'Nothing in cart'
        return;
    }

    let sum = 0
    let count = 0

    for (let key in data) {
        const item = data[key]
        sum += item.price * (item.count ?? 1)
        count +=  (item.count ?? 1)

        list.innerHTML +=`<section class="product">
        <div class="product__img"><img src="${config.imageServerUrl}/${item.img}" alt=""></div>
        <div class="product__title">${decodeURI(item.name)}</div>
        <div class="product__count">
            <div class="count">
                <div class="count__box">
                    <input type="number" class="count__input" min="1" max="100" value="${item.count ?? 1}">
                </div>
                <div class="count__controls">
                    <button type="button" class="count__up" onClick="change_count(${key}, 1)">
                        <img src="images/busket/icon-up.svg" alt="Increase">
                    </button>
                    <button type="button" class="count__down" onClick="change_count(${key}, -1)">
                        <img src="images/busket/icon-down.svg" alt="Decrease">
                    </button>
                </div>
            </div>
        </div>
        <div class="product__price">$${item.price}.</div>
        <div class="product__controls">
            <button type="button" onClick="remove_item(${key})">
                <img src="images/busket/cross.svg" alt="Delete">
            </button>
        </div>
        </section>`
    }

    document.getElementById('total_count').innerHTML = `${count} product units`
    document.getElementById('total_price').innerHTML = `$${sum}.`
  }

  function remove_item(index) {
    let cartData = localStorage.getItem("cart")
    let cart 
   
    if (!cartData) {
        return
    } else {
      cart = JSON.parse(cartData)
    }
  
    cart.splice(index, 1)
  
    localStorage.setItem("cart", JSON.stringify(cart))
    alert("Item removed")
    redirect('busket.html')
  }

  function change_count(index, by) {
    let cartData = localStorage.getItem("cart")
    let cart 
   
    if (!cartData) {
        return
    } else {
      cart = JSON.parse(cartData)
    }
  
    let count = cart[index].count = (cart[index].count ?? 1) + by

    if (count <= 0) {
        return remove_item(index)
    }
  
    localStorage.setItem("cart", JSON.stringify(cart))
    redirect('busket.html')
  }
  
  renderBasket()