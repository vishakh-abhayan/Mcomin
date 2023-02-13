function changeQuantity(cartId, proId, count) {
  let quantity = parseInt(document.getElementById(proId).innerHTML);
  count = parseInt(count);
  $.ajax({
    url: "/change-product-quantity",
    data: { cart: cartId, product: proId, count: count, quantity: quantity },
    method: "post",
    success: (response) => {
      if (response.removeProduct) {
        alert("product removed from cart");
        location.reload();
      } else {
        document.getElementById(proId).innerHTML = quantity + count;
      }
    },
  });
}
