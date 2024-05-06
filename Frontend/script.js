let shopCart = [];

    function addCart(itemName, price, quantity) {
        if (quantity <= 10 && quantity >= 1) {
            shopCart.push({ name: itemName, price: price, quantity: quantity });
            updateCartDisplay();
          } else {
            alert("Quantity must be between 1 and 10");}}
        shopCart = [];
    

    function updateCartDisplay() {
        let shopCartItemsElement = document.getElementById("cartItems");
        shopCartItemsElement.innerHTML = "";
        shopCart.forEach(item => {let shopCartItemElement = document.createElement("div");
            shopCartItemElement.classList.add("cart-item");
            shopCartItemElement.textContent = item.name+ " - Quantity: " +item.quantity +" - $" +(item.price * item.quantity).toFixed(2);
            shopCartItemsElement.appendChild(shopCartItemElement);
        });
    }

    function checkTotal() {
        let total = 0;
        for (let item of shopCart) {
            total += item.price * item.quantity;
        }

        return total;
    }

    function checkout() {
        let cartTotal = checkTotal();
        alert("Checkout Total: $" +(cartTotal).toFixed(2));
        cart = [];
        updateCartDisplay();
    }



    