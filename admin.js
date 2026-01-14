function addProduct() {
  fetch('/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: document.getElementById('name').value,
      price: document.getElementById('price').value
    })
  }).then(()=>alert('Product toegevoegd!'));
}
