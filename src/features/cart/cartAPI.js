export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
}
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    //TODO: we will not hard-code server URL here
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    resolve(data);
  });
}
export function updateCart(updatedItem) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + updatedItem.id, {
      method: "PATCH",
      body: JSON.stringify(updatedItem),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve(data);
  });
}
export function deleteCartItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    resolve({ id: itemId });
  });
}
export function resetCart(userId) {
  // get all items of user's cart - and then delete each
  return new Promise(async (resolve) => {
    const data = await fetchItemsByUserId(userId);
    const items = data;
    for (let item of items) {
      await deleteCartItem(item.id);
    }
    resolve({ status: 'success' })
  });
}