const product = {
  name: 'Orion Steel',
  price: 349,
  desc: 'Luxe horloge met stalen kast'
};

document.getElementById('name').innerText = product.name;
document.getElementById('price').innerText = '€' + product.price;
document.getElementById('desc').innerText = product.desc;

function addToCart() {
  alert('Toegevoegd aan winkelwagen');
}
