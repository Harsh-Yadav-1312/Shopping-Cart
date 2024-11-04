let allUsers, productData;

//USER REGISTRATION DATA
if (localStorage.getItem('userData') == null) {
   console.log("INSIDE DATA.JS FILE");
   allUsers = [];
   localStorage.setItem('userData', JSON.stringify(allUsers));
}
else {
   allUsers = JSON.parse(localStorage.getItem('userData'));
}

export { allUsers };


//FEATURED PRODUCT DATA
if (localStorage.getItem('productData') == null) {
   let allproducts = [
      { pid: 111, pName: 'Fan', price: 5000, discountedPrice: 4500, pImage: 'images/fan.webp' },
      { pid: 112, pName: 'Switch', price: 500, discountedPrice: 450,  pImage: 'images/switch.webp' },
      { pid: 113, pName: 'Cooler', price: 15000, discountedPrice: 12050,  pImage: 'images/cooler.webp' }

   ];
   localStorage.setItem('productData', JSON.stringify(allproducts));
   productData = allproducts;
}
else {
   productData = JSON.parse(localStorage.getItem('productData'));
}
export { productData as allproducts }; 