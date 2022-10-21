function confirmationNumber() {
  // URL PARAMS pour récupérer le numero de commande dans l'url

  const URL = window.location.search;
  console.log(URL);

  const urlParams = new URLSearchParams(URL);

  const orderId = urlParams.get("orderId");
  console.log(orderId);

  // Insertion du numero de commande dans le DOM

  let orderIdDom = document.querySelector("#orderId");

  orderIdDom.innerHTML = `${orderId}`;

  // Suppression du localstorage une fois la commande passée

  localStorage.clear();
}

confirmationNumber();
