

// Recuperation du local storage

function createProductLine(localProduct, apiProduct) {
  return ` <article class="cart__item" data-id="${apiProduct._id}" data-color="${localProduct.color}">
<div class="cart__item__img">
  <img src="${apiProduct.imageUrl}" alt="Photographie d'un canapé">
</div>
<div class="cart__item__content">
  <div class="cart__item__content__description">
    <h2>${apiProduct.name}</h2>
    <p>${localProduct.color}</p>
    <p>${apiProduct.price} €</p>
  </div>
  <div class="cart__item__content__settings">
    <div class="cart__item__content__settings__quantity">
      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${localProduct.quantity}">
    </div>
    <div class="cart__item__content__settings__delete">
      <p class="deleteItem">Supprimer</p>
    </div>
  </div>
</div>
</article>
</section>`;
}

function qtyChange() {
  // Je boucle sur chaque item du DOM pour y ajouter un eventListener
  let quantitySelectors = document.querySelectorAll(".itemQuantity");
  quantitySelectors.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      if (event.target.value < 1 || event.target.value > 100) {
        alert("Veuillez choisir entre 1 et 100 articles");
      } else {
        //Faire les modifications ici
     
        


        const currentItem = event.target.closest('article');
       
        const currentItemId = currentItem.dataset.id;
       
        const currentItemColor = currentItem.dataset.color;

        
        const newCartLocal = JSON.parse(localStorage.getItem('cart'));
       
          for (let product of newCartLocal) {
            if (product.id == currentItemId && product.color == currentItemColor){
              product.quantity = event.target.value;
            }
          }
    console.log(newCartLocal)
   localStorage.setItem('cart', JSON.stringify(newCartLocal));
    

      

  }
      
        loadProducts();
      })
    });
  };


function removeClick() {
  // Je boucle sur chaque item du DOM pour y ajouter un eventListener
  const removeButtons = document.querySelectorAll(".deleteItem");
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", (event) => {
      // quand je click, je récupére dans le dom l'article le plus proche du button
      const currentItem = event.target.closest('article');
      // et je récupère la valeur du "data-id" (faire pareil pour color)
      const currentItemId = currentItem.dataset.id;
      console.log(currentItem)
     
      //Faire la suppression ici
      alert('FAKE DELETE of product with ID : '+ currentItemId+'  - Product list will reload right now');
      const currentItemColor = currentItem.dataset.color;
      
      
const cart = JSON.parse(localStorage.getItem('cart'));
const productPosition = cart.findIndex(item => item.id == currentItemId && item.color == currentItemColor);

console.log(productPosition)
cart.splice(productPosition, 1);
console.log(cart)
localStorage.setItem('cart', JSON.stringify(cart));

      
     
  
      loadProducts();
    });
  });
}

// calcul quantité totale 

function totalQuantity(){

  
}





// Cette fonction est a appeler au changement de la page & à chaque modif (change qty + delete)
async function loadProducts() {
  
  let cart = JSON.parse(localStorage.getItem("cart"));
  // le hmtl des produits est initialisé
  let htmlProducts = "";
  let totalPrice = 0;
  let totalQuantity = 0;
  // pour chaque produit dans le localstorage
  for (localProduct of cart) {
    // je vais chercher le produit dans le back
    await fetch("http://localhost:3000/api/products/" + localProduct.id)
      // converti en json
      .then((res) => res.json())
      .then((apiProduct) => {
        // je stocke dans hmltProduct le HTML généré par la function createProductLine
        htmlProducts += createProductLine(localProduct, apiProduct);
        totalPrice = totalPrice + apiProduct.price*localProduct.quantity;
        totalQuantity = totalQuantity + parseInt(localProduct.quantity);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // une fois que la boucle est terminée, et que tous les produits sont dans ma variable, je les afffiche
  // dans le DOM
  let cartDisplay = document.querySelector("#cart__items");
  cartDisplay.innerHTML = htmlProducts;
  console.log(totalPrice);
  console.log(totalQuantity);
  // j'appelle les event listener une fois que les éléments sont dans le DOM
  qtyChange();
  removeClick();
}

loadProducts();



/*
// Recuperation du local storage


let ajoutAuPanier = JSON.parse(localStorage.getItem('cart')); 

console.log(ajoutAuPanier)


 // fetch

 for (produit of ajoutAuPanier) {
 
  fetch('http://localhost:3000/api/products/' + produit.id)
  .then((res) => {
  return res.json();
  })
.then(async function (api_result) {
  article = await api_result;



  if (article) {

    console.log(produit)
// Ajout au DOM
 
  let cartDisplay = document.querySelector('#cart__items');
  cartDisplay.innerHTML += 
  ` <article class="cart__item" data-id="${api_result._id}" data-color="${produit.color}">
    <div class="cart__item__img">
      <img src="${api_result.imageUrl}" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${api_result.name}</h2>
        <p>${produit.color}</p>
        <p>${api_result.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${produit.quantity} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  </section>`
  }

  // Changement de la quantiter dans le panier 

let settingQuantity = document.querySelector('.cart__item__content__settings__quantity');
//console.log(settingQuantity);

let settingQuantityP = document.querySelector('.cart__item__content__settings__quantity p');
//console.log(settingQuantityP);

let settingQuantityValue = document.querySelector('.itemQuantity');
//console.log(settingQuantityValue.value);

//console.log(produit.quantity)

settingQuantityValue.addEventListener('change', (event) =>  {

    function updateQuantity () {

      for (let product of ajoutAuPanier) {
        if (product.quantity !== settingQuantityValue){
          produit.quantity = quantitéSelector.value;
        }
      }
      localStorage.setItem('cart', JSON.stringify(ajoutAuPanier));
    }
updateQuantity()
  })


  




  })



  .catch((error) => {
  console.log(error);
  });
}
  

  /*

 // Creation du display pour ajouter les produtis

  if (ajoutAuPanier) {
  

    let cartDisplay = document.querySelector('#cart__items');

    console.log(cartDisplay);

    cartDisplay.innerHTML = ajoutAuPanier.map((cart) => 
    ` <article class="cart__item" data-id="${cart.id}" data-color="${cart.color}">
    <div class="cart__item__img">
      <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>${cart.color}</p>
        <p>42,00 €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : ${cart.quantity} </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
  </section>`)

         
  }




*/




  /*

//Recuperation de l'id de chaque produits
  
  let recupId = document.querySelectorAll('.cart__item');



recupId.forEach(e => {
    console.log(e.dataset.id);
  }
  ); 

  let theID = document.querySelectorAll('.cart__item data-id');
  console.log(theID);




  const URL = fetch('http://localhost:3000/api/products/');
console.log(URL);

const urlParams = new URLSearchParams(URL);

const idDuProduit = urlParams.get('.cart__item');
console.log(idDuProduit);

let leId = idDuProduit;


// Changement de la quantiter dans le panier 

let settingQuantity = document.querySelector('.cart__item__content__settings__quantity');
console.log(settingQuantity);

let settingQuantityP = document.querySelector('.cart__item__content__settings__quantity p');
console.log(settingQuantityP);

let settingQuantityValue = document.querySelector('.itemQuantity');
console.log(settingQuantityValue.value);


// Suppression de produit du panier

function removeStorage() {
 


  sessionStorage.removeItem('image');
}

*/