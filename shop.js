fetch('http://localhost:5000/api/products')
  .then(res => res.json())
  .then(products => {
    const el = document.getElementById('products');
    el.innerHTML = products.map(p =>
      `<div>
        <h3>${p.name}</h3>
        <p>€${p.price}</p>
      </div>`
    ).join('');
  });
