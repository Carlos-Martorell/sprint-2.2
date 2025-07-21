
import { products } from './products.js';




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



const cleanCart = () =>  {
    cart.length = 0;
    }
    


const calculateTotal = () => {
    let total = 0;
    cart.forEach(product => {
      total += product.subtotalWithDiscount || product.price * product.quantity;
    });
    return total;
  };
    

  const applyPromotionsCart = () => {
    cart.forEach(product => {
      if (product.offer && product.quantity >= product.offer.number) {
        const subtotal = product.price * product.quantity;
        const discount = product.offer.percent;
        const discountedTotal = subtotal - (subtotal * discount / 100);
        product.subtotalWithDiscount = discountedTotal;
      } else {
        delete product.subtotalWithDiscount;
      }
    });
  };


const increaseQuantity = (id) => {
    const product = cart.find(p => p.id === id);
    if (product) {
      product.quantity += 1;
      applyPromotionsCart();
      printCart();
      updateCartCount();
    }
  };

const removeFromCart = (id) => {
    const index = cart.findIndex(product => product.id === id);
  
    if (index !== -1) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
      } else {
        cart.splice(index, 1);
      }
  
      applyPromotionsCart();
      printCart();
      updateCartCount();
    }
}
window.increaseQuantity = increaseQuantity;
window.removeFromCart = removeFromCart;


const printCart = () => {
    const cartContainer = document.getElementById("cart_list");
  
    cartContainer.innerHTML = cart.map(product => {
      const finalPrice = product.subtotalWithDiscount || product.price * product.quantity;
  
      return `
        <tr>
          <th scope="row">${product.name}</th>
          <td>$${product.price.toFixed(2)}</td>
          <td>
            <div class="cart-quantity-controls">
                <button class="btn btn-sm btn-outline-dark" onclick="removeFromCart(${product.id})">−</button>
                <span>${product.quantity}</span>
                <button class="btn btn-sm btn-outline-dark" onclick="increaseQuantity(${product.id})">+</button>
            </div>
          </td>
          <td>$${finalPrice.toFixed(2)}</td>
        </tr>`;
    }).join("");
  

    const totalEl = document.getElementById("total_price");
    totalEl.textContent = calculateTotal().toFixed(2);
  };
  

const updateCartCount = () => {
    const countBadge = document.getElementById("count_product");
    const totalQuantity = cart.reduce((sum, product) => sum + product.quantity, 0);
    countBadge.textContent = totalQuantity; 
  };
  



const open_modal = () => {
    applyPromotionsCart();
    printCart();
    updateCartCount();
  };

const cartModal = document.getElementById("cartModal");

cartModal.addEventListener("shown.bs.modal", open_modal);




document.addEventListener("DOMContentLoaded", () => {
    
    const cleanCartButton = document.getElementById("clean-cart");

    cleanCartButton.addEventListener("click", () => {
        cleanCart();
        printCart();         
        updateCartCount();   
    });
});


document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", () => {
      const id = parseInt(button.getAttribute("data-product-id"));
      buy(id);
      applyPromotionsCart();
      printCart();
      updateCartCount();
    });
  });



  