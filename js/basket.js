async function renderBasket(){
    let list = document.getElementById('cart_section')
    let data = localStorage.getItem("cart")

    if (!data || data.length == 0) {
        list.innerHTML = 'Nothing in cart'
        return;
    }

    for (let item of data) {
        list.innerHTML +=`<section class="product">
        <div class="product__img"><img src="images/busket/product1.jpg" alt=""></div>
        <div class="product__title">DJI mini 2</div>
        <div class="product__count">
            <div class="count">
                <div class="count__box">
                    <input type="number" class="count__input" min="1" max="100" value="1">
                </div>
                <div class="count__controls">
                    <button type="button" class="count__up">
                        <img src="images/busket/icon-up.svg" alt="Increase">
                    </button>
                    <button type="button" class="count__down">
                        <img src="images/busket/icon-down.svg" alt="Decrease">
                    </button>
                </div>
            </div>
        </div>
        <div class="product__price">$700.</div>
        <div class="product__controls">
            <button type="button">
                <img src="images/busket/cross.svg" alt="Delete">
            </button>
        </div>
        </section>`
    }
  }
  
  renderBasket()