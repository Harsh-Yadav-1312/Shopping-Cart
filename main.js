import { allUsers, allproducts } from "./data.js";

const featuredLi = document.querySelector('#featuredProducts');
let productsLi = '';


for (let i = 0; i < allproducts.length; i++) {
    if (allproducts[i]) {

        let newLi = document.createElement('li');
        newLi.innerHTML =
            `<h2> ${allproducts[i].pName}</h2>
     <img src='${allproducts[i].pImage}'>
    <h4>Price - ₹<del>${allproducts[i].price}</del></h4>
    <h4>Discounted Price - ₹${allproducts[i].discountedPrice}
    <br>
    <br>
    <button class="decreaseQtyBtn">-</button>
    <input type="number" min="1" max="15" value="1" class="quantityInput" id="quantityInput_${allproducts[i].pid}" readonly>
    <button class="increaseQtyBtn">+</button>
    <button class="addToCartBtn" data-id='${allproducts[i].pid}'>Add To Cart</button>
    <button class="trashBtn">Reset</button>
    `;

        featuredLi.appendChild(newLi);
    }
}



const cart = [];
const cartBtn = document.querySelectorAll('.addToCartBtn');
const cartQty = document.querySelector('#cartQty');


const increaseQtyBtns = document.querySelectorAll('.increaseQtyBtn');
const decreaseQtyBtns = document.querySelectorAll('.decreaseQtyBtn');
const quantityInputs = document.querySelectorAll('.quantityInput')
const deleteBtns = document.querySelectorAll('.trashBtn');






cartBtn.forEach(function (cartbtnsingle) {
    cartbtnsingle.addEventListener('click', function (e) {
        const productId = e.target.dataset.id;
        const quantityInput = document.querySelector(`#quantityInput_${productId}`);
        const quantity = parseInt(quantityInput.value);

        // Find the product by productId
        const product = allproducts.find(p => p.pid == productId);

        if (product) {
            cart.push({ product, quantity });
            renderCart();
            updateTotal();
            toggleBuyNowButton();

            // Reset quantity input value
            quantityInput.value = 1;
        } else {
            console.log("Product not found.");
        }
    });
});









increaseQtyBtns.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        const currentValue = parseInt(quantityInputs[index].value);
        quantityInputs[index].stepUp();
        // if (currentValue == maxQuantity - 1) {
        //     btn.disabled = true;
        // }
        decreaseQtyBtns[index].disabled = false;
        updateTotal();
    });
});



decreaseQtyBtns.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        quantityInputs[index].stepDown();
        const currentValue = parseInt(quantityInputs[index].value);
        if (currentValue = 1) {
            btn.disabled = true;
        } else {
            increaseQtyBtns[index].disabled = false;
        }
        updateTotal();
    });
});








deleteBtns.forEach(function (btn, index) {
    btn.addEventListener('click', function () {
        quantityInputs[index].value = 1;
        // cart.splice(index, 1);
        renderCart();
        updateTotal();
    });
});

function renderCart() {
    cartList.innerHTML = '';
    let totalQuantity = 0; // Initialize total quantity counter
    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <img src='${item.product.pImage}' style='width: 50px; height: auto;'>
            ${item.product.pName}  (${item.quantity})
            
            
            <button class="deleteCartItemBtn" data-product-id="${item.product.pid}"> <i class="fas fa-trash-alt"></i></button>
        `;
        cartList.appendChild(li);

        // Add event listener to delete button
        const deleteButton = li.querySelector('.deleteCartItemBtn');

        deleteButton.addEventListener('click', function deleteItem() {
            const productId = this.dataset.productId;
            console.log("Product ID to delete:", productId);
            // Find the index of the item in the cart array
            const indexToRemove = cart.findIndex(item => item.product.pid == productId);
            console.log("Index to remove:", indexToRemove);
            if (indexToRemove == -1 || indexToRemove == indexToRemove) {
                // Remove item from cart
                cart.splice(indexToRemove, 1);
                // Re-render the cart
                renderCart();
                // Update total
                updateTotal();
                // Update total quantity
                totalQuantity -= item.quantity;
                updateCartQuantity(totalQuantity);
            }
            // Remove the event listener after deleting the item
            deleteButton.removeEventListener('click', deleteItem);
        });

        // Increment total quantity
        totalQuantity += item.quantity;
    });

    // Update total quantity display
    updateCartQuantity(totalQuantity);
}



function updateCartQuantity(quantity) {
    cartQty.textContent = quantity;
}


function toggleBuyNowButton() {
    const buyNowBtn = document.getElementById("buyNowBtn");
    const totalPrice = parseFloat(document.getElementById("totalPrice").textContent);
    if (totalPrice <= 0 || cart.length === 0) {
        buyNowBtn.style.display = "none"; // Hide the button
    } else {
        buyNowBtn.style.display = "block"; // Show the button
    }
}

// Call the function to toggle the Buy Now button initially
toggleBuyNowButton();



function updateTotal() {
    const total = cart.reduce((acc, item) => acc + (item.product.discountedPrice * item.quantity), 0);

    document.getElementById("totalPrice").textContent = `Total: ₹${total.toFixed(2)}`;
    toggleBuyNowButton();
}



// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const buyNowBtn = document.getElementById("buyNowBtn");

// Get the <span> element that closes the modal
const closeBtn = document.getElementsByClassName("close")[0];


closeBtn.addEventListener('click', function () {
    // Hide the modal box when the close button is clicked
    modal.style.display = "none";

    // Empty the cart
    cartQty.textContent = 0
    cart.length = 0

    cartList.innerHTML = ''
    document.getElementById("totalPrice").innerHTML = 0;

    updateTotal()




    // Update the total to 0
    // document.getElementById("subtotal").textContent = "Subtotal: Your Total Price is ₹0";
});

// When the user clicks the button, open the modal
buyNowBtn.onclick = function () {
    modal.style.display = "block";
    renderOrderDetails();
}
// When the user clicks on <span> (x), close the modal
closeBtn.onclick = function () {
    modal.style.display = "none";

}

// Function to render order details in the modal
function renderOrderDetails() {
    const orderDetails = document.getElementById("orderDetails");
    const subtotal = document.getElementById("subtotal");
    // orderDetails.innerHTML = ''; // Clear existing content
    subtotal.innerHTML = `<section class="success-content">
    <div class="thanks" >Your order has been successfully placed.Thank You!
    </div>
    <div class="sub">Subtotal: Your Total Price is ₹<span id="totalPrice">${calculateSubtotal()}</span></div>
    </section>`
        ;



    // Render each item in the cart
    cart.forEach(item => {
        // const li = document.createElement('li');
        // li.textContent = `${item.product.pName}: ${item.quantity}`;
        // orderDetails.appendChild(li);
    });
}

// Function to calculate subtotal
function calculateSubtotal() {
    return cart.reduce((total, item) => total + (item.product.discountedPrice * item.quantity), 0);
}


