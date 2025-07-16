// If you have time, you can move this variable "products" to a json or js file and load the data in this js. It will look more professional
const products = [
    {
        id: 1,
        name: 'cooking oil',
        price: 10.5,
        type: 'grocery',
        offer: {
            number: 3,
            percent: 20
        }
    },
    {
        id: 2,
        name: 'Pasta',
        price: 6.25,
        type: 'grocery'
    },
    {
        id: 3,
        name: 'Instant cupcake mixture',
        price: 5,
        type: 'grocery',
        offer: {
            number: 10,
            percent: 30
        }
    },
    {
        id: 4,
        name: 'All-in-one',
        price: 260,
        type: 'beauty'
    },
    {
        id: 5,
        name: 'Zero Make-up Kit',
        price: 20.5,
        type: 'beauty'
    },
    {
        id: 6,
        name: 'Lip Tints',
        price: 12.75,
        type: 'beauty'
    },
    {
        id: 7,
        name: 'Lawn Dress',
        price: 15,
        type: 'clothes'
    },
    {
        id: 8,
        name: 'Lawn-Chiffon Combo',
        price: 19.99,
        type: 'clothes'
    },
    {
        id: 9,
        name: 'Toddler Frock',
        price: 9.99,
        type: 'clothes'
    }
]

// => Reminder, it's extremely important that you debug your code. 
// ** It will save you a lot of time and frustration!
// ** You'll understand the code better than with console.log(), and you'll also find errors faster. 
// ** Don't hesitate to seek help from your peers or your mentor if you still struggle with debugging.

// Improved version of cartList. Cart is an array of products (objects), but each one has a quantity field to define its quantity, so these products are not repeated.
const cart = [];


const buy = (id) => {

        const productToAdd = products.find( product => product.id === id );
        const existingProduct = cart.find(product => product.id === id);

        if (!existingProduct) {
            const productWithQuantity = { ...productToAdd, quantity: 1 };
            cart.push(productWithQuantity);
        } else {
            existingProduct.quantity += 1;
        }
    }

    buy(1);
    buy(2);
    buy(3);
    buy(1);
    buy(4);


// Exercise 2

const cleanCart = () =>  {
    cart.length = 0;
    }
    
// Exercise 3



const calculateTotal = () => {
    let total = 0;
    cart.forEach(element => {
      total += element.quantity * element.price;
    });
    return total;
  };
    
  //product.subtotalWithDiscount || product.price * product.quantity
    

console.log(calculateTotal()); // This will log the total price of the cart without any discounts applied
console.log(cart); // This will log the cart array with products and their quantities
console.log(cart[0].subtotalWithDiscount); // This will log the subtotal with discount for the first product, if applicable
// Exercise 4
const applyPromotionsCart = () =>  
    // Apply promotions to each item in the array "cart"

    {
        cart.forEach(product => {
          if (product.offer && product.quantity >= product.offer.number) {
            const subtotal = product.price * product.quantity;
            const discount = product.offer.percent;
            const discountedTotal = subtotal - (subtotal * discount / 100);
            product.subtotalWithDiscount = discountedTotal;
          }
        });
      };




// Exercise 5
//const printCart = () => {
    // Fill the shopping cart modal manipulating the shopping cart dom

    //const cartContainer = document.getElementById("cart_list");
    //cartContainer.innerHTML = ""; 

    /*cartContainer.innerHTML = cart.map(product => {
        const subtotal = product.quantity * product.price;
        const subtotalWithDiscount = product.subtotalWithDiscount || subtotal;
        return `
            <tr>
                <th scope="row">${product.name}</th>
                <td>$${product.price.toFixed(2)}</td>
                <td>${product.quantity}</td>
                <td>$${subtotalWithDiscount.toFixed(2)}</td>
                <td><button class="btn btn-danger" onclick="removeFromCart(${product.id})">Remove</button></td>
            </tr>`;
    }).join("");*/
/*---------
// Versión limpia
cartContainer.innerHTML = cart.map(product => `
    <tr>
      <td>${product.name}</td>
      ...
    </tr>
  `).join("");
  ----------*/
  /*

        const cartContainer = document.getElementById("cart_list"); 
        cartContainer.innerHTML = ""; 
        cart.forEach( product => { 

        const finalPrice = product.subtotalWithDiscount || product.price * product.quantity
        cartContainer.innerHTML += `
            <tr>
            <th scope="row">${product.name}</th>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>$${finalPrice.toFixed(2)}</td>
            <tr>
            `; 
    })
 
}*/

const printCart = () => {
    const cartContainer = document.getElementById("cart_list"); 
    cartContainer.innerHTML = ""; 
    cartContainer.innerHTML = cart.map(product => {
        const finalPrice = product.subtotalWithDiscount || product.price * product.quantity;
        
        return `
        <tr>
            <th scope="row">${product.name}</th>
            <td>$${product.price}</td>
            <td>${product.quantity}</td>
            <td>$${finalPrice.toFixed(2)}</td>
        </tr>`
}).join("");
}
applyPromotionsCart();
printCart();







// ** Nivell II **

// Exercise 7
const removeFromCart = (id) => {

}

const open_modal = () =>  printCart(); 
