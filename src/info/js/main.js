const valueLocalstorage = JSON.parse(localStorage.getItem("product"))

const span = document.querySelector('.span')
span.innerHTML = valueLocalstorage.name
const infoImage = document.querySelector('.infoImage')
infoImage.src = valueLocalstorage.avatar
const nameProd = document.querySelector('.nameProd')
nameProd.innerHTML = valueLocalstorage.name
const price = document.querySelector('.price')
price.innerHTML = valueLocalstorage.price

const addCardModal = document.querySelector('.addCardModal')
const cntShop = document.querySelector('.cntShop')
const cartList = document.querySelector('.addCardModalContent')
const totalPrice = document.querySelector('.totalPrice')
const shopIcon = document.querySelector('.shopIcon')
const closeModal = document.querySelector('.closeModal')
const addCard = document.querySelector('.addCard')

let cart = JSON.parse(localStorage.getItem("cart")) || []

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
}

function CntShop() {
    let Cnt = 0
    cart.forEach(prod => {
        Cnt += prod.qty
    })
    cntShop.innerHTML = Cnt
}

function CardShow() {
    cartList.innerHTML = ""
    let suma = 0
    cart.forEach(prod => {
        suma += prod.price * prod.qty
        const row = document.createElement('div')
        row.className = "addCardModalContentItem"
        row.innerHTML = `<img class="avatarModal" src="${prod.avatar}" alt="">
            <div class="addCardInfo">
                <p class="nameModal">${prod.name}</p>
                <p class="priceModal">$${prod.price * prod.qty}</p>
                <div class="qtyControl">
                    <button class="plusProd">+</button>
                    <p class="cntProd">${prod.qty}</p>
                    <button class="minusProd">-</button>
                </div>
            </div>
            <button class="removeprod">×</button>`
        const plusProd = row.querySelector('.plusProd')
        const minusProd = row.querySelector('.minusProd')
        const removeprod = row.querySelector('.removeprod')
        plusProd.onclick = () => {
            prod.qty += 1
            saveCart()
            CntShop()
            CardShow()
        }
        minusProd.onclick = () => {
            if (prod.qty > 1) {
                prod.qty -= 1
                saveCart()
                CntShop()
                CardShow()
            } else {
                cart = cart.filter(p => p.id !== prod.id)
                saveCart()
                CntShop()
                CardShow()
            }
        }
        removeprod.onclick = () => {
            cart = cart.filter(p => p.id !== prod.id)
            saveCart()
            CntShop()
            CardShow()
        }
        cartList.append(row)
    })
    totalPrice.innerHTML = `$${suma}`
}

addCard.onclick = () => {
    const itsProduct = cart.find(prod => prod.id === valueLocalstorage.id)
    if (itsProduct) {
        itsProduct.qty += 1
    } else {
        cart.push({
            id: valueLocalstorage.id,
            name: valueLocalstorage.name,
            avatar: valueLocalstorage.avatar,
            price: valueLocalstorage.price,
            qty: 1
        })
    }
    saveCart()
    CntShop()
    CardShow()
}

shopIcon.onclick = () => {
    addCardModal.showModal()
}

closeModal.onclick = () => {
    addCardModal.close()
}

CntShop()
CardShow()
