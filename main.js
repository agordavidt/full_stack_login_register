const cartIcon = document.querySelector("#cart-icon");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");


// function to add active class to the element with cart
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));



/// now we write javascript to show the product
const addCardButtons = document.querySelectorAll(".add-cart");
addCardButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-box");
        addToCart(productBox);
    });
});


const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    // check to ensure users do not add more than one of same item
    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart.");
            return;
        }
    }


    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    // use bat ticks instead of quoutes
    cartBox.innerHTML = `
                <img src="${productImgSrc}" class="cart-img">
                <div class="cart-detail">
                    <h2 class="cart-product-title">${productTitle}</h2>
                    <span class="cart-price">&#8358;${productPrice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="ri-delete-bin-line cart-remove"></i>
    `;

    cartContent.appendChild(cartBox);

    // remove item from the cart
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });


    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    // call the update total price funtion
    updateTotalPrice();

};



// update the total price
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price"); 
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");

        // Convert to numeric values
        const price = priceElement.textContent.replace("₦", "");
        const quantity = quantityElement.textContent;

        total += price * quantity;
    });

    // Update display
    totalPriceElement.textContent = `₦${total}`;
};



// add counter
let cartItemCount = 0;
const updateCartCount = change => {
    const cartItemCountBadge = document.querySelector(".cart-item-count");
    cartItemCount += change;
    if (cartItemCount > 0) {
        cartItemCountBadge.style.visibility = "visible";
        cartItemCountBadge.textContent = cartItemCount;
    } else {
        cartItemCountBadge.style.visibility = "hidden";
        cartItemCountBadge.textContent = "";
    }
}


const buyNowButton = document.querySelector(".btn-buy");
buyNowButton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemCount = 0;
    updateCartCount(0);


    updateTotalPrice();


    alert("Thank yu for your purchase");
})



// logout functionality
// Get the user icon and the dropdown menu
const userIcon = document.querySelector("#user-menu-icon");
const userDropdown = document.querySelector("#user-dropdown");

// Toggle the 'active' class on click
userIcon.addEventListener("click", (event) => {
    // Stop the click from propagating to the window object
    event.stopPropagation();
    userDropdown.classList.toggle("active");
});

// Close the dropdown if the user clicks anywhere else on the page
document.addEventListener("click", (event) => {
    // Check if the clicked element is NOT the user icon AND NOT inside the dropdown
    if (
        !userIcon.contains(event.target) && 
        !userDropdown.contains(event.target)
    ) {
        userDropdown.classList.remove("active");
    }
});