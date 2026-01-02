import { url } from "./api.js";

let allProducts = []

export function showProducts(products) {
    allProducts = products
    productsBox.innerHTML = ""
    products.forEach((product) => {
        const div = document.createElement('div')
        div.className = "product";
        div.innerHTML = `<img class="avatar" src="${product.avatar}" alt="">
            <p class="name">${product.name}</p>
            <p>$${product.price}</p>
            <div class="icons">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="heart">
                    <path
                        d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="shop">
                    <path
                        d="M2.25 2.25a.75.75 0 0 0 0 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 0 0-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 0 0 0-1.5H5.378A2.25 2.25 0 0 1 7.5 15h11.218a.75.75 0 0 0 .674-.421 60.358 60.358 0 0 0 2.96-7.228.75.75 0 0 0-.525-.965A60.864 60.864 0 0 0 5.68 4.509l-.232-.867A1.875 1.875 0 0 0 3.636 2.25H2.25ZM3.75 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM16.5 20.25a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z" />
                </svg>

            </div>`
        productsBox.append(div)
        const avatar = div.querySelector('.avatar')
        avatar.onclick = () => {
            window.location = "../../../src/info/index.html"
            localStorage.setItem("product", JSON.stringify(product))
        }
        const shop = div.querySelector('.shop')
        shop.onclick = () => {
            const itsProduct = cart.find(prod => prod.id === product.id)
            if (itsProduct) {
                itsProduct.qty += 1
            } else {
                cart.push({
                    id: product.id,
                    name: product.name,
                    avatar: product.avatar,
                    price: product.price,
                    qty: 1
                })
            }
            saveCart()
            CntShop()
            CardShow()
        }
        const heart=div.querySelector('.heart')
        heart.onclick=()=>{
            if(heart.style.color=="red"){
                heart.style.color="white"
            }
            else{
                heart.style.color="red"
            }
        }
    })
}



const addCardModal = document.querySelector('.addCardModal')
const cntShop = document.querySelector('.cntShop')
const productsBox = document.querySelector('.products')
const cartList = document.querySelector('.addCardModalContent')
const totalPrice = document.querySelector('.totalPrice')
const shopIcon = document.querySelector('.shopIcon')
const closeModal = document.querySelector('.closeModal')

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

shopIcon.onclick = () => {
    addCardModal.showModal()
}

closeModal.onclick = () => {
    addCardModal.close()
}

CntShop()
CardShow()


const searchInput = document.querySelector('.searchInput')
searchInput.oninput = async () => {
    const searchValue = searchInput.value.toLowerCase().trim()
    try {
        const { data } = await axios.get(`${url}?q=${searchValue}`)
        showProducts(data)
    } catch (error) {
        console.error(error);
    }
}

const priceInput = document.querySelector('.priceInput')
const priceValue = document.querySelector('.priceValue')
priceInput.oninput = () => {
    const value = parseInt(priceInput.value)
    priceValue.textContent = `Value: $${value}`
    const filteredProducts = allProducts.filter(
        product => product.price >= value
    )
    showProducts(filteredProducts)
}