// URL PARAMS pour récupérer le numero de commande dans l'url

const URL = window.location.search;
console.log(URL);

const urlParams = new URLSearchParams(URL);

const orderId = urlParams.get("orderId");
console.log(orderId);

// Insertion 

let orderIdDom = document.querySelector('#orderId');

orderIdDom.innerHTML =`${orderId}`;

localStorage.clear();
