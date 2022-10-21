function showCanape() {
  // FETCH

  fetch("http://localhost:3000/api/products")
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
    })
    .then((canapes) => {
      console.log(canapes);
      const items = document.querySelector("#items");
      let affichageCanapes = "";

  // For pour recupérer tous les canapes
      for (i = 0; i < canapes.length; i++) {
        let canape = canapes[i];

  // Affichage des canapés dans le DOM 
  
        affichageCanapes += `<a href="./product.html?id=${canape._id}">
<article>
  <img src="${canape.imageUrl}" alt="Lorem ipsum dolor sit amet, Kanap name1">
  <h3 class="productName">${canape.name}</h3>
  <p class="productDescription">${canape.description}</p>
</article>
</a>`;
        items.innerHTML = affichageCanapes;
      }
    })
    .catch(function (err) {
      // Une erreur est survenue
    });
}

showCanape();
