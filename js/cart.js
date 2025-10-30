import { saveToLocal, getFromLocal } from "./helpers.js";
import {
	renderCartItems,
	renderCartQuantity,
	renderCartTotal,
	renderNotFound,
} from "./ui.js";

// localden sepete eklenen ürünleri al "cart" olarak kayıt ettik
let cart = getFromLocal("cart"); //dizi

// sepete ürün ekleyecek fonksiyon
const addToCart = (e, products) => {
	// sepete eklenen ürünü tespit et
	const productId = +e.target.dataset.id;

	// id ye göre product ı bul
	const foundProduct = products.find((product) => product.id === productId);

	// şimdi ürün var mı diye bak
	const existingProduct = cart.find((item) => item.id === productId);

	if (existingProduct) {
		// eğer ürün localde varsa
		existingProduct.quantity++;
	} else {
		const cartItem = {
			...foundProduct,
			quantity: 1,
		};
		cart.push(cartItem);
	}
	// locale kaydet
	saveToLocal("cart", cart);
	e.target.textContent = "Added";
	setTimeout(() => {
		e.target.textContent = "Add to Cart";
	}, 1000);
	// kartı burada render et, header içindeki icon miktarını güncelle
	renderCartQuantity(cart);
};

// sepetten eleman kaldırılacak
const removeFromCart = (e) => {
	// kullanıcıdan silmek için onay iste
	const response = confirm("Silmek istediğinize emin misiniz?");

	if (response) {
		// tıklanan ürünün id sini al
		const productId = Number(e.target.dataset.id);

		// kaldırılan id hariç diğerlerini cart dizime ekle/güncelle
		cart = cart.filter((item) => item.id !== productId);

		// ürünü locale kaydet
		saveToLocal("cart", cart);

		// sepetteki toplam fiyatı güncelle
		renderCartTotal(cart);

		if (cart.length > 0) {
			// ekranı güncelle
			renderCartItems(cart);
		} else {
			// ekranı kart yok diye güncelle
			renderNotFound();
		}
	}
	// header alanındaki toplam ürün miktarını da güncelle
	renderCartQuantity(cart);
};

// sepetteki ürün miktarı güncellenirse
const onQuantityChange = (e) => {
	// elemanın id sini bul
	const productId = parseInt(e.target.dataset.id);

	// güncellenecek elemanın güncel değerine eriş
	const newQuantity = parseInt(e.target.value);

	// anlık değer 0 dan büyükse
	if (newQuantity > 0) {
		// önce ilgili id ye sahip elemanı bul
		const updateItem = cart.find((item) => item.id === productId);

		// ürün miktarını güncelle
		updateItem.quantity = newQuantity;

		// local i güncelle
		saveToLocal("cart", cart);

		// sepeti güncelle
		renderCartTotal(cart);

		// header daki toplam eleman sayısını güncelle
		renderCartQuantity(cart);
	} else {
		alert("Miktar 0'dan büyük olmalı");
		return;
	}
};

export { addToCart, removeFromCart, onQuantityChange };
