import { allUsers, allproducts } from "./data.js";

const featuredLi = document.querySelector('#featuredProducts');
let productsLi = '';

for(let i = 0; i<allproducts.length; i++){

    let newLi = document.createElement('li');
    newLi.innerHTML = 
    `<h3>${allproducts[i].pName}</h3>
     <img src='${allproducts[i].pImage}'>
    <h6>${allproducts[i].price}</h6>
    <h6>${allproducts[i].discountedPrice}
    <small>Available Qty: ${allproducts[i].availableQty}
    <button class="addToCartBtn" data-id='${allproducts[i].pid}'>Add To Cart</button>
    `;
    
    featuredLi.appendChild(newLi);
}

const cart = [];

const cartBtn = document.querySelectorAll('.addToCartBtn');
const cartQty = document.querySelector('#cartQty');

cartBtn.forEach(function(cartbtnsingle){
    cartbtnsingle.addEventListener('click', function(e){
        console.log(e);
        console.log(e.target.dataset.id);
        cart.push(e.target.dataset.id);
        cartQty.innerHTML = cart.length;
    });

});
