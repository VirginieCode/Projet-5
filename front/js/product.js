

const URL = window.location.search;
console.log(URL);

const urlParams = new URLSearchParams(URL);

const idDuProduit = urlParams.get('id');
console.log(idDuProduit);

let leId = idDuProduit;
fetch('http://localhost:3000/api/products/'+ leId)
  .then((response) => {
    if (response.ok) {
      return response.json();
    }
  })
  .then((canape) => {
    console.log(canape);

    let unCanape = canape;

   let imageSelector = document.querySelector('.item__img');

   let titleSelector = document.querySelector('#title');

   let priceSelector = document.querySelector('#price');

   let descriptionSelector = document.querySelector('#description');

   let couleursSelector = document.querySelector('#colors');

   let couleursDOM ='';

   for (let i = 0; i<unCanape.colors.length; i++){
    let couleurs = unCanape.colors[i];
  
    
    
    couleursDOM += `<option value="${couleurs}">
    ${couleurs}</option>`;

    
   }

   

   couleursSelector.innerHTML += couleursDOM;



   let imageDOM = `<img src="${unCanape.imageUrl}" alt="Photographie d'un canapé">`;
   let titleDOM = `${unCanape.name}`;
   let priceDOM = `${unCanape.price}`;
   let descriptionDOM = `${unCanape.description}`;
  
   

imageSelector.innerHTML = imageDOM;
titleSelector.innerHTML = titleDOM;
priceSelector.innerHTML = priceDOM;
descriptionSelector.innerHTML = descriptionDOM;


//------------------------------ ADD TO CART : LOCAL STORAGE ----------------------------------------//



let panier = [];
let myJSON = JSON.stringify(panier);



let button = document.querySelector('#addToCart');

button.addEventListener('click', () => {
  
  
  localStorage.setItem('id', unCanape._id);
  
  if(localStorage.getItem('id')){
    panier.push(unCanape._id);
  };

  //---------------------------------

  localStorage.setItem('couleur', (couleursSelector).value);
  
  if(localStorage.getItem('couleur')){
    panier.push((couleursSelector).value);
  };

  //-----------------------------------

  let quantitéSelector = document.querySelector('#quantity');
  
  localStorage.setItem('quantité', (quantitéSelector).value);
  
  if(localStorage.getItem('quantité')){
    panier.push((quantitéSelector).value);
  };

  function sauvegardePanier(){
  localStorage.setItem('addtocart', JSON.stringify(panier)); 
//let ajoutAuPanier = JSON.parse(panier.getItem('addtocart')); 
  };

 

  sauvegardePanier();
  
/*
function savePanier(panier){
  localStorage.setItem('panier', JSON.stringify(panier));
}

function getPanier(){
return JSON.parse(localStorage.getItem(panier));
}

function ajoutAuPanier(id, couleur, quantité){
panier.push(id, couleur, quantité);
savePanier(panier);
}

ajoutAuPanier(unCanape._id);



/*

let button = document.querySelector('#addToCart');

button.addEventListener('click', () => {

  
    let panierLocalStorage = [];
  
  
  localStorage.setItem('id', unCanape._id);
  
  if(localStorage.getItem('id')){
    panierLocalStorage.push(unCanape._id);
  };

  //---------------------------------

  localStorage.setItem('couleur', (couleursSelector).value);
  
  if(localStorage.getItem('couleur')){
    panierLocalStorage.push((couleursSelector).value);
  };

  //-----------------------------------

  let quantitéSelector = document.querySelector('#quantity');
  
  localStorage.setItem('quantité', (quantitéSelector).value);
  
  if(localStorage.getItem('quantité')){
    panierLocalStorage.push((quantitéSelector).value);
  };



localStorage.setItem('addtocart', JSON.stringify(panierLocalStorage)); //stringify object and store
var retrievedPerson = JSON.parse(localStorage.getItem('addtocart')); //retrieve the object

  //console.log(panierLocalStorage);

  */
});


//--------------------------------------------------- 





})
  .catch(function(err) {
    // Une erreur est survenue
    });
