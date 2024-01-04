let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

openShopping.addEventListener('click', ()=>{
    body.classList.add('active');
})
total.addEventListener('click', ()=>{
    let link = `
 https://wa.me/85282865313?text=
`

let text = 'Saya ingin membeli'

let totalPrice = 0
listCards.forEach((card) => {
  text +=`\n${card.name} x${card.quantity}`
  totalPrice += card.quantity * card.price
})

text +=`\nTotal: Rp ${totalPrice.toLocaleString()}`

link += encodeURIComponent(text)
    window.open(link)
})
closeShopping.addEventListener('click', ()=>{
    body.classList.remove('active');
})

let products = [
    {
        id: 1,
        name: 'OSENG TIKUS',
        image: '1.PNG',
        price: 120000
    },
    {
        id: 2,
        name: 'AYAM BAKAR MADU',
        image: '2.PNG',
        price: 120000
    },
    {
        id: 3,
        name: 'SALAD TUNA',
        image: '3.PNG',
        price: 220000
    },
    {
        id: 4,
        name: 'GULAI JAMUR',
        image: '4.PNG',
        price: 123000
    },
    {
        id: 5,
        name: 'SALAD',
        image: '5.PNG',
        price: 320000
    },
    {
        id: 6,
        name: 'PIZZA ORIGINAL',
        image: '6.PNG',
        price: 120000
    }
];
let listCards  = [];
function initApp(){
    products.forEach((value, key) =>{
        let newDiv = document.createElement('div');
        newDiv.classList.add('item');
        newDiv.innerHTML = `
            <img src="image/${value.image}">
            <div class="title">${value.name}</div>
            <div class="price">Rp ${value.price.toLocaleString()}</div>
            <button onclick="addToCard(${key})">Add To Card</button>`;
        list.appendChild(newDiv);
    })
}
initApp();
function addToCard(key){
    if(listCards[key] == null){
        // copy product form list to list card
        listCards[key] = JSON.parse(JSON.stringify(products[key]));
        listCards[key].quantity = 1;
    }
    reloadCard();
}
function reloadCard(){
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key)=>{
        totalPrice = totalPrice + value.price;
        count = count + value.quantity;
        if(value != null){
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="image/${value.image}"/></div>
                <div>${value.name}</div>
                <div>Rp ${value.price.toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
                listCard.appendChild(newDiv);
        }
    })
    total.innerText = `Rp ${totalPrice.toLocaleString()}`;
    quantity.innerText = count;
}
function changeQuantity(key, quantity){
    if(quantity == 0){
        delete listCards[key];
    }else{
        listCards[key].quantity = quantity;
        listCards[key].price = quantity * products[key].price;
    }
    reloadCard();
}