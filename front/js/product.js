
// New URL PARAMS

const URL = window.location.search;
console.log(URL);

const urlParams = new URLSearchParams(URL);

const idDuProduit = urlParams.get('id');
console.log(idDuProduit);

let leId = idDuProduit;

// fetch + new URL 

fetch('http://localhost:3000/api/products/'+ leId)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((canape) => {
    console.log(canape);

    let unCanape = canape;

  // Query Selector

   let imageSelector = document.querySelector('.item__img');

   let titleSelector = document.querySelector('#title');

   let priceSelector = document.querySelector('#price');

   let descriptionSelector = document.querySelector('#description');

   let couleursSelector = document.querySelector('#colors');


   //Ajout des produits au DOM

   let couleursDOM ='';

   for (let i = 0; i<unCanape.colors.length; i++){
    let couleurs = unCanape.colors[i];
  
    
    
    couleursDOM += `<option value="${couleurs}">
    ${couleurs}</option>`;

    
   }

   

   couleursSelector.innerHTML += couleursDOM;



   let imageDOM = `<img src="${unCanape.imageUrl}" alt="Photographie d'un canapé">`;
   let titleDOM = unCanape.name;
   let priceDOM = unCanape.price;
   let descriptionDOM = unCanape.description;
  
   

imageSelector.innerHTML = imageDOM;
titleSelector.innerHTML = titleDOM;
priceSelector.innerHTML = priceDOM;
descriptionSelector.innerHTML = descriptionDOM;


//ADD TO CART : LOCAL STORAGE



const addBasket = () => {

  let button = document.querySelector('#addToCart');
  button.addEventListener('click', () => {

    let quantitéSelector = document.querySelector('#quantity');
   
let localCart = JSON.parse(localStorage.getItem('cart'));

    const currentProduct = {
      id : unCanape._id, 
      color : couleursSelector.value,
      quantity : quantitéSelector.value
    }


    if (localCart) {

      const findProduct = localCart.find ((product) => product.id === unCanape._id && product.color === couleursSelector.value);
      
        if(findProduct){
           updateQuantity (currentProduct.id, currentProduct.quantity);

          function updateQuantity (productID, quantity) {
            for (let product of localCart) {
              if (product.id == canape._id && product.color == couleursSelector.value){
                product.quantity = quantitéSelector.value;
              }
            }
      }
      localStorage.setItem('cart', JSON.stringify(localCart));
      console.log(localCart);
  } 
  else {
    localCart.push(currentProduct);
    localStorage.setItem('cart', JSON.stringify(localCart));
    console.log(localCart);
  }
}
  else {
  localCart = [];
  localCart.push(currentProduct);
  localStorage.setItem('cart', JSON.stringify(localCart));
  console.log(localCart);
}

    


    /*

    if(localCart == null){
      localCart = [];
      localCart.push(currentProduct);
      console.log(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart));
    } 
    
    for (let product of localCart) {
      if (product.id != currentProduct.id || product.color != currentProduct.color){
        localCart.push(currentProduct);
        console.log(localCart);
      }
    }
    localStorage.setItem('cart', JSON.stringify(localCart));
    
    
    quantitéSelector.addEventListener('change', (event) =>  {
      function updateQuantity (productID, quantity) {
        for (let product of localCart) {
          if (product.id == canape._id && product.color == couleursSelector.value){
            product.quantity = quantitéSelector.value;
          }
        }
        localStorage.setItem('cart', JSON.stringify(localCart));
      }
updateQuantity (currentProduct.id, currentProduct.quantity);

} ) 




   /* if (localCart != null) {

      localCart.push(currentProduct);
      console.log(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart));

  
     }*/

 
     /*
     quantitéSelector.addEventListener('change', (event) =>  {
      function updateQuantity (productID, quantity) {
        for (let product of localCart) {
          if (product.id == canape._id && product.color == couleursSelector.value){
            product.quantity = quantitéSelector.value;
          }
        }
        localStorage.setItem('cart', JSON.stringify(localCart));
      }
updateQuantity (currentProduct.id, currentProduct.quantity);

} ) 

*/
//let myFilter = localCart.filter(product => product.id !== unCanape.id)  

//localCart.push(myFilter)


    /*
    else{
      localCart.push(currentProduct);
      console.log(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart));
    }
      */
    

/*
    else 
    {
      localCart.push(currentProduct);
      console.log(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart));
    }

*/
    
     

    
        /*
    
           let value = event.target.value;
         //let test = (currentProduct.quantity = quantitéSelector.value);
        
        const cartProduct = localCart.find ((element) =>
        element.id)

        cartProduct.quantity = value;
        localStorage.setItem('cart', JSON.stringify(localCart));
        
         */
      
         
 


        

        
      
  
    

  

    


 /*

    if(localCart == null){
      localCart = [];
      localCart.push(currentProduct);
      console.log(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart));
    } 

    

    else (localCart != null)
    {

      localCart.push(currentProduct);
      console.log(localCart);
      localStorage.setItem('cart', JSON.stringify(localCart));

      if(currentProduct.quantity != currentProduct.quantity){
        console.log('hello');
      }
    }
      
  */


        })
       }

      

  


addBasket(); 
  
 })
.catch(function(err) {
  // Une erreur est survenue
  });


     

   

    
    
    
    




  



 