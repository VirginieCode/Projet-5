
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