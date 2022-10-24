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

// Création de la fonction pour le changement de quantiter dans le panier

function qtyChange() {
  // Je boucle sur chaque item du DOM pour y ajouter un eventListener
  let quantitySelectors = document.querySelectorAll(".itemQuantity");
  quantitySelectors.forEach((quantityInput) => {
    quantityInput.addEventListener("change", (event) => {
      if (event.target.value < 1 || event.target.value > 100) {
        alert("Veuillez choisir entre 1 et 100 articles");
      } else {
        const currentItem = event.target.closest("article");

        const currentItemId = currentItem.dataset.id;

        const currentItemColor = currentItem.dataset.color;

        const newCartLocal = JSON.parse(localStorage.getItem("cart"));

        for (let product of newCartLocal) {
          if (
            product.id == currentItemId &&
            product.color == currentItemColor
          ) {
            product.quantity = event.target.value;
          }
        }
        console.log(newCartLocal);
        localStorage.setItem("cart", JSON.stringify(newCartLocal));
      }

      loadProducts();
    });
  });
}

// Création de la fonction pour supprimer un produit de panier

function removeClick() {
  // Je boucle sur chaque item du DOM pour y ajouter un eventListener
  const removeButtons = document.querySelectorAll(".deleteItem");
  removeButtons.forEach((removeButton) => {
    removeButton.addEventListener("click", (event) => {
      // quand je click, je récupére dans le dom l'article le plus proche du button
      const currentItem = event.target.closest("article");
      // et je récupère la valeur du "data-id"
      const currentItemId = currentItem.dataset.id;
      console.log(currentItem);

      // et je récupère la valeur du "data-color"
      const currentItemColor = currentItem.dataset.color;

      const cart = JSON.parse(localStorage.getItem("cart"));
      const productPosition = cart.findIndex(
        (item) => item.id == currentItemId && item.color == currentItemColor
      );

      console.log(productPosition);
      cart.splice(productPosition, 1);
      console.log(cart);
      localStorage.setItem("cart", JSON.stringify(cart));

      loadProducts();
    });
  });
}

// Création de la fonction du chargement de la page

// Cette fonction est a appeler au changement de la page & à chaque modif (change qty + delete)
async function loadProducts() {
  let cart = JSON.parse(localStorage.getItem("cart"));

  // le hmtl des produits est initialisé
  let htmlProducts = "";
  let cartEmpty = `Votre panier est vide`;
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
        totalPrice = totalPrice + apiProduct.price * localProduct.quantity;
        totalQuantity = totalQuantity + parseInt(localProduct.quantity);

        // Création du tableau de produit

        let ProductArray = [localProduct];
        console.log(ProductArray);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (totalPrice === 0) {
    htmlProducts += `<div class='center'>Votre panier est vide</div>`;
  }

  // une fois que la boucle est terminée, et que tous les produits sont dans ma variable, je les afffiche
  // dans le DOM
  let cartDisplay = document.querySelector("#cart__items");
  let totalQuantityDom = document.querySelector("#totalQuantity");
  totalQuantityDom.innerHTML = totalQuantity;
  let totalPriceDom = document.querySelector("#totalPrice");
  totalPriceDom.innerHTML = totalPrice;
  cartDisplay.innerHTML = htmlProducts;

  console.log(totalPrice);
  console.log(totalQuantity);
  // j'appelle les event listener une fois que les éléments sont dans le DOM
  qtyChange();
  removeClick();
}

loadProducts();

// Création de l'événement click sur le boutton commander

const orderButton = document.querySelector("#order");
const form = document.querySelector(".cart__order__form");
const formSubmit = document.querySelector(".cart__order__form__submit");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Création des querySelector
  const firstNameInput = document.querySelector("#firstName").value;
  const lastNameInput = document.querySelector("#lastName").value;
  const addressInput = document.querySelector("#address").value;
  const cityInput = document.querySelector("#city").value;
  const emailInput = document.querySelector("#email").value;

  const firstNameErrorMsg = document.querySelector("#firstNameErrorMsg");
  const lastNameErrorMsg = document.querySelector("#lastNameErrorMsg");
  const addressErrorMsg = document.querySelector("#addressErrorMsg");
  const cityErrorMsg = document.querySelector("#cityErrorMsg");
  const emailErrorMsg = document.querySelector("#emailErrorMsg");

  // Declaration de regex

  const regexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const regexPrenom = /^.{2,}$/;
  const regexNom = /^.{2,}$/;
  const regexAddress = /^.{2,}$/;
  const regexVille = /^.{1,}$/;

  // Declaration des fonction pour le test de regex

  let error = 0;

  function emailValidation() {
    if (regexEmail.test(emailInput)) {
      console.log("Bon email");

      emailErrorMsg.innerHTML = "";
    } else {
      console.log("Mauvais email");

      let message = `Adresse email non valide`;
      emailErrorMsg.innerHTML = message;
      error++;
    }
  }

  function PrenomValidation() {
    if (regexPrenom.test(firstNameInput)) {
      console.log("Prenom valide");

      firstNameErrorMsg.innerHTML = "";
    } else {
      console.log("Prenom non valide");

      let message = `2 caractères minimum`;
      firstNameErrorMsg.innerHTML = message;
      error++;
    }
  }

  function nomValidation() {
    if (regexNom.test(lastNameInput)) {
      console.log("nom valide");

      lastNameErrorMsg.innerHTML = "";
    } else {
      console.log("nom non valide");

      let message = `2 caractères minimum`;
      lastNameErrorMsg.innerHTML = message;
      error++;
    }
  }

  function addressValidation() {
    console.log("adresse input");
    console.log(addressInput);
    if (regexAddress.test(addressInput)) {
      console.log("adresse valide");

      addressErrorMsg.innerHTML = "";
    } else {
      console.log("adresse non valide");

      let message = `2 caractères minimum`;
      addressErrorMsg.innerHTML = message;
      error++;
    }
  }

  function villeValidation() {
    if (regexVille.test(cityInput)) {
      console.log("Ville valide");

      cityErrorMsg.innerHTML = "";
    } else {
      console.log("Ville non valide");

      let message = `1 caractères minimum`;
      cityErrorMsg.innerHTML = message;
      error++;
    }
  }
  emailValidation();
  PrenomValidation();
  nomValidation();
  addressValidation();
  villeValidation();

  //Création de l'objet user

  let produitsLocal = JSON.parse(localStorage.getItem("cart"));

  const user = {
    firstName: firstNameInput,
    lastName: lastNameInput,
    address: addressInput,
    city: cityInput,
    email: emailInput,
  };

  //Création de l'objet product

  let products = [];

  for (let i = 0; i < produitsLocal.length; i++) {
    products.push(produitsLocal[i].id);
  }

  console.log(products);
  //Création de l'objet userInfosOrder

  const UserInfosOrder = {
    contact: user,
    products: products,
  };

  console.log(UserInfosOrder);
  // Requette fetch pour obtenir le numero de commande

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(UserInfosOrder),
  };

  if (error === 0) {
    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        console.log(data.orderId);

        window.location.href = `./confirmation.html?orderId=${data.orderId}`;
      });
  } else {
    alert("Veuillez remplir tous les champs correctement");
  }
});
