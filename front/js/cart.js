// FAIRE UN FETCH AVEC L'id du local storage !


let ajoutAuPanier = JSON.parse(localStorage.getItem('addtocart')); 

let idPanier = ajoutAuPanier;
let ID = idPanier[0];

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
                    <p>${ajoutAuPanier[1]}</p>
                    <p>${produit.price}€</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>Qté : "${ajoutAuPanier[2]}"</p>
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