function showOneCanape() {
  // New URL PARAMS

  const URL = window.location.search;
  console.log(URL);

  const urlParams = new URLSearchParams(URL);

  const idDuProduit = urlParams.get("id");
  console.log(idDuProduit);

  let leId = idDuProduit;

  // fetch + new URL

  fetch("http://localhost:3000/api/products/" + leId)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((canape) => {
      console.log(canape);

      let unCanape = canape;

      // Query Selector

      let imageSelector = document.querySelector(".item__img");

      let titleSelector = document.querySelector("#title");

      let priceSelector = document.querySelector("#price");

      let descriptionSelector = document.querySelector("#description");

      let couleursSelector = document.querySelector("#colors");

      //Ajout des produits au DOM

      let couleursDOM = "";

      for (let i = 0; i < unCanape.colors.length; i++) {
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
        let button = document.querySelector("#addToCart");
        button.addEventListener("click", () => {
          let quantitéSelector = document.querySelector("#quantity");

          let localCart = JSON.parse(localStorage.getItem("cart"));

          const currentProduct = {
            id: unCanape._id,
            color: couleursSelector.value,
            quantity: quantitéSelector.value,
          };

          if (couleursSelector.value === "") {
            alert("Veuillez choisir une couleur");
            return;
          }
          if (quantitéSelector.value < 1 || quantitéSelector.value > 100) {
            alert("Veuillez choisir une quantité entre 1 et 100");
            return;
          }

          if (localCart) {
            const findProduct = localCart.find(
              (product) =>
                product.id === unCanape._id &&
                product.color === couleursSelector.value
            );

            if (findProduct) {
              for (let product of localCart) {
                if (
                  product.id == canape._id &&
                  product.color == couleursSelector.value &&
                  product.quantity == null
                ) {
                  product.quantity = quantitéSelector.value;
                }
                if (
                  product.id == canape._id &&
                  product.color == couleursSelector.value &&
                  product.quantity !== null
                ) {
                  product.quantity =
                    parseInt(quantitéSelector.value) +
                    parseInt(product.quantity);
                }
              }

              localStorage.setItem("cart", JSON.stringify(localCart));
              console.log(localCart);
            } else {
              localCart.push(currentProduct);
              localStorage.setItem("cart", JSON.stringify(localCart));
              console.log(localCart);
            }
          } else {
            localCart = [];
            localCart.push(currentProduct);
            localStorage.setItem("cart", JSON.stringify(localCart));
            console.log(localCart);
          }
        });
      };

      addBasket();
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}

showOneCanape();
