const View = {
  renderProducts(products){
    const tbody = document.querySelector('#productTable tbody');
    tbody.innerHTML = '';
    products.forEach(p=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${p.nombre}</td>
        <td>$${parseFloat(p.precio).toFixed(2)}</td>
        <td>${p.cantidad}</td>
        <td>
          <button class="btn btn-sm btn-warning edit-product" data-id="${p.id}">Editar</button>
          <button class="btn btn-sm btn-danger delete-product" data-id="${p.id}">Eliminar</button>
          <button class="btn btn-sm btn-outline-primary ms-1 add-cart" data-id="${p.id}" data-cantidad="${p.cantidad}" data-nombre="${p.nombre}">Descontar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  },

  renderUsers(users){
    const tbody = document.querySelector('#userTable tbody');
    tbody.innerHTML = '';
    users.forEach(u=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${u.username}</td>
        <td>${u.rol}</td>
        <td>${u.rol !== 'admin' ? '<button class="btn btn-sm btn-danger delete-user" data-id="'+u.id+'">Eliminar</button>' : ''}</td>
      `;
      tbody.appendChild(tr);
    });
  },

  showUserInfo(user){
    document.getElementById('userInfo').textContent = user.username + ' (' + user.rol + ')';
    if(user.rol === 'admin') document.getElementById('userSection').classList.remove('d-none');
  },

  showError(msg, selector='#loginError'){
    const el = document.querySelector(selector);
    if(el) el.textContent = msg;
  },

  clearProductForm(){
    document.getElementById('productId').value = '';
    document.getElementById('productName').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productCantidad').value = '';
  },

  fillProductForm(p){
    document.getElementById('productId').value = p.id;
    document.getElementById('productName').value = p.nombre;
    document.getElementById('productPrice').value = p.precio;
    document.getElementById('productCantidad').value = p.cantidad;
  },

  updateCartCount(count){
    document.getElementById('cartCount').textContent = count;
  },

  renderCart(cart){
    const tbody = document.querySelector('#cartTable tbody');
    tbody.innerHTML = '';
    cart.forEach((item, idx)=>{
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td>${item.nombre}</td>
        <td>${item.cantidadActual}</td>
        <td><input class="form-control form-control-sm qty-descontar" data-idx="${idx}" type="number" min="1" max="${item.cantidadActual}" value="${item.descontar}"></td>
        <td><button class="btn btn-sm btn-danger remove-cart" data-idx="${idx}">Quitar</button></td>
      `;
      tbody.appendChild(tr);
    });
  }
};
