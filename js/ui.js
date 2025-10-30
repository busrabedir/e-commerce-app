import { onQuantityChange, removeFromCart } from "./cart.js";
import { calculateTotalPrice, calculateTotalQuantity } from "./helpers.js";

// ui içindeki elemenetlere eriş
const uiElements = {
	menuBtn: document.querySelector("#menu-btn"),
	nav: document.querySelector("nav"),
	productsList: document.querySelector("#products-list"),
	cartItems: document.querySelector(".cart-items"),
	cartQuantity: document.querySelector("#basket-btn"),
	totalAmount: document.querySelector(".cart-total"),
};

// API dan alınan ürünler için birer html render et
const renderProduct = (products, callBackFunction) => {
	// tüm elemanlar için sırası ile html oluştur ve ekle
	const productHtml = products
		.map(
			(product) => `  <div class="product">
         
          <img
            src="${product.image}"
            alt="${product.title}"
          />
        

          <div class="product-info">
            <h2>${product.title}</h2>

            <p>$${product.price.toFixed(2)}</p>

            <button class="add-to-cart" data-id="${
							product.id
						}"  >Add to cart</button>
          </div>
        </div>`
		)
		.join("");

	// oluşturulan html i productList adlı div e ekle
	uiElements.productsList.innerHTML = productHtml;

	// addToCart butonuna eriş
	const addToCartButtons = document.querySelectorAll(".add-to-cart");

	// tüm butonlara eriş ve callback ile ilgili yere click olmasını haber et
	addToCartButtons.forEach((button) => {
		button.addEventListener("click", callBackFunction);
	});
};

// sepetteki ürünleri renderlayan fonksiyon
const renderCartItems = (cart) => {
	// cart=sepet, elemanlarını map ile dön yeni bir html içeriği ver
	const cartItemsHtml = cart
		.map(
			(item) => `  <div class="cart-item">
          
            <img
              src="${item.image}"
              alt="cart-item-image"
            />

        
            <div class="cart-item-info">
              <h2 class="cart-item-title">${item.title}</h2>

              <input
                type="number"
                min="1"
                value="${item.quantity}"
                class="cart-item-quantity"
                data-id='${item.id}'
              />
            </div>

           
            <h3 class="cart-item-price">$${item.price}</h3>

     
            <button class="remove-button" data-id='${item.id}'>Remove</button>
          </div>`
		)
		.join("");

	// oluşturulan bu html i arayüze ekle
	uiElements.cartItems.innerHTML = cartItemsHtml;

	// remove butonuna tıklanırsa
	const removeButtons = document.querySelectorAll(".remove-button");

	// butonlara geç
	removeButtons.forEach((button) => {
		// her birine eğer tıklanırsa
		button.addEventListener("click", (e) => {
			// ekrandan ve veri tabanından kaldır
			removeFromCart(e);
		});
	});

	// azaltma ve arttırma durumuna eriş
	const quantityInputs = document.querySelectorAll(".cart-item-quantity");

	// tüm inputları gez
	quantityInputs.forEach((input) => {
		// üzerinde işlem yapılması
		input.addEventListener("change", (e) => {
			// elemandaki değişimi fonksiyona bildir
			onQuantityChange(e);
		});
	});
};

//sepette ürün yoksa uyarı ver
const renderNotFound = () => {
	uiElements.cartItems.innerHTML = ` 
<div class="cookieCard">
  <h1 class="cookieHeading">No items found in cart</h1>
  <p class="cookieDescription">Go to home page to add items to your cart</p>
  <div>
  <a href='../index.html' class="acceptButton">Go to home page</a>
  </div>
</div>
`;
};

// sepetteki sayıya göre icon yanındaki sayıyı güncelle
const renderCartQuantity = (cart) => {
	// toplam sayıyı bul
	const totalQuantity = calculateTotalQuantity(cart);

	// cdn den aldığımız basket iconunun sayısını güncelle
	uiElements.cartQuantity.setAttribute("data-quantity", totalQuantity);
};

// sepetin toplam fiyatını render et
const renderCartTotal = (cart) => {
	// toplam fiyatı getir
	const totalCartAmount = calculateTotalPrice(cart);

	uiElements.totalAmount.innerText = `$ ${totalCartAmount.toFixed(2)}`;
};

export {
	uiElements,
	renderProduct,
	renderCartItems,
	renderNotFound,
	renderCartQuantity,
	renderCartTotal,
};
