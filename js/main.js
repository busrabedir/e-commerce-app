import fetchProducts from "./api.js";
import { addToCart } from "./cart.js";
import { getFromLocal } from "./helpers.js";
import {
	renderCartItems,
	renderCartQuantity,
	renderCartTotal,
	renderNotFound,
	renderProduct,
	uiElements,
} from "./ui.js";

// sayfa yüklendiğinde html kısmı
document.addEventListener("DOMContentLoaded", async () => {
	// menuBtn ile aç kapa
	uiElements.menuBtn.addEventListener("click", () => {
		// uielement içerisindeki nav elemanına class ekle/çıkar
		uiElements.nav.classList.toggle("open");
	});

	// localstorage dan sepete eklenen ürünleri al
	let cart = getFromLocal("cart");

	// header daki toplam iconu güncelle
	renderCartQuantity(cart);

	// eğer anasayfada isem
	if (window.location.pathname.includes("/index.html")) {
		// tüm verileri db den okudu
		const products = await fetchProducts();

		// alınan ürünleri render et
		renderProduct(products, (e) => {
			addToCart(e, products);
		});
	} else {
		if (cart.length > 0) {
			// sepetteki ürün miktarı 0 dan fazla ise sepet alanını çalıştır
			renderCartItems(cart);

			// ürün toplam maliyeti yaz
			renderCartTotal(cart);
		} else {
			// ürün yoksa, yok göster
			renderNotFound();
		}
	}
});
