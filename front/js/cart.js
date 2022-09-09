
// Recuperation du localCart dans le local storage

let ajoutAuPanier = JSON.parse(window.localStorage.getItem('cart')); 



 console.log(ajoutAuPanier)


 // Creation du display pour ajouter les produtis

  if (ajoutAuPanier) {
    
    console.log(ajoutAuPanier)

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
  </section>
            <div class="cart__price">
              <p>Total (<span id="totalQuantity"><!-- 2 --></span> articles) : <span id="totalPrice"><!-- 84,00 --></span> €</p>
            </div>
            <div class="cart__order">
              <form method="get" class="cart__order__form">
                <div class="cart__order__form__question">
                  <label for="firstName">Prénom: </label>
                  <input type="text" name="firstName" id="firstName" required>
                  <p id="firstNameErrorMsg"><!-- ci est un message d'erreur --></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="lastName">Nom: </label>
                  <input type="text" name="lastName" id="lastName" required>
                  <p id="lastNameErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="address">Adresse: </label>
                  <input type="text" name="address" id="address" required>
                  <p id="addressErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="city">Ville: </label>
                  <input type="text" name="city" id="city" required>
                  <p id="cityErrorMsg"></p>
                </div>
                <div class="cart__order__form__question">
                  <label for="email">Email: </label>
                  <input type="email" name="email" id="email" required>
                  <p id="emailErrorMsg"></p>
                </div>
                <div class="cart__order__form__submit">
                  <input type="submit" value="Commander !" id="order">
                </div>
              </form>
            </div>
          </section>`)

         
  }

//Recuperation de l'id de chaque produits
  
  let recupId = document.querySelectorAll('.cart__item');



recupId.forEach(e => {
    console.log(e.dataset.id);
  }
  ); 

  
/*

const panierDisplay = async () => {
  console.log('salut');
  if (ajoutAuPanier) {
    await ajoutAuPanier;
    console.log(ajoutAuPanier) 
  } 
} */

/*

let idPanier = ajoutAuPanier;
let ID = ajoutAuPanier.lo;

console.log(ID);

console.log(ID); // Ceci m'affiche l'id du produit je dois donc trouver le moyen de rajouter cet id dans l'url fetch 


fetch('http://localhost:3000/api/products' + '/' + ID)
.then((response) => {
  if (response.ok) {
    return response.json();
  }
})
.then((canapes) => {
  console.log(canapes);

  let produit = canapes;


let itemsPanier = document.querySelector('#cart__items');

let affichagePanier ="";

affichagePanier += `<article class="cart__item" data-id="${produit._id}" data-color="${produit.colors}">
                <div class="cart__item__img">
                  <img src="${produit.imageUrl}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${produit.name}</h2>
                    <p>${ajoutAuPanier.color}</p>
                    <p>${produit.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : "${ajoutAuPanier}"</p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`

              itemsPanier.innerHTML = affichagePanier;

});

*/