function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше 0');
  }

  const curentItem = cart.find((item) => item.id === product.id);
  const currentQuantity = curentItem ? curentItem.quantity : 0;
  const totalQuantity = currentQuantity + quantity;

  if (totalQuantity > product.stock) {
    throw new RangeError('Количество должно быть чем в наличии');
  }

  if (curentItem) {
    return cart.map((item) => (item.id === product.id ? { ...item, quantity: totalQuantity } : item));
  }

  return [...cart, { ...product, quantity: totalQuantity }];
}
function changeQuantity(cart, productId, totalQuantity) {
  const current = cart.find((product) => product.id === productId);

  if (!current) {
    return cart;
  }

  if (totalQuantity <= 0) {
    throw new RangeError('Количество должно быть больше 0');
  }

  if (totalQuantity > current.stock) {
    throw new RangeError('Количество не должно быть больше чем в наличии');
  }

  return cart.map((product) => (product.id === productId) ? {...product, quantity: totalQuantity}: product);
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promeCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promeCode === 'SAVE10' && subtotal >= 20000 ?  Math.round(subtotal * 0.1) : 0;

  const delivery = subtotal >= 50000 ? 0 : 30000;

  const total = subtotal + delivery - discount;

  return {subtotal, discount, delivery, total};
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
