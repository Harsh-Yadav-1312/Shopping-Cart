import { allproducts } from './data.js';

let productForm = document.getElementById("addProductForm");

productForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let pid = document.getElementById("pid");
    let pname = document.getElementById("pName");
    let price = document.getElementById("price");
    let discountedPrice = document.getElementById("discountedPrice");
   
    let pImage = document.getElementById("pImage");

    let newProduct = {
        pid: pid.value,
        pName: pname.value,
        price: price.value,
        discountedPrice: discountedPrice.value,
       
        pImage: pImage.value
    };
    allproducts.push(newProduct);

    localStorage.setItem('productData', JSON.stringify(allproducts));

    console.log("Product added");
});

document.getElementById("addProductForm").addEventListener("submit", function (event) {
    // Prevent the form from actually submitting
    event.preventDefault();

    // Clear the input field
    document.getElementById("onSubmit").value = "";

    // Redirect to another page
    window.location.href = "home.html";
})