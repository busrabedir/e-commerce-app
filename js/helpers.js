// localStorage a kayıt yapma
const saveToLocal = (key, data) => {
	// verileri anahtar değer ilişkisi ile kaydet
	localStorage.setItem(key, JSON.stringify(data));
};

// localStorage dan almak
const getFromLocal = (key) => {
	// gelen veriyi al ve JSON a çevir
	return JSON.parse(localStorage.getItem(key)) || [];
};

// toplam ürün miktarını hesaplayan fonksiyon
const calculateTotalQuantity = (cart) => {
	// reduce fonksiyonu ile
	const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);

	return totalQuantity;
};

// sepetteki ürün miktarını hesaplayan fonksiyon
const calculateTotalPrice = (cart) => {
	// sepetteki tüm ürünlerin toplam fiyatı
	const cartItemsAmount = cart.reduce(
		(total, product) => total + product.quantity * product.price,
		0
	);

	// sepet boşsa toplam 0 olsun
	if (cartItemsAmount === 0) return 0;

	// toplam fiyat
	let totalAmount;

	// eğer toplam fiyat 500 ün altında ise 100 dolar kargo ücreti ekle
	if (cartItemsAmount < 500) {
		totalAmount = cartItemsAmount + 100;
	} else {
		totalAmount = cartItemsAmount;
	}
	return totalAmount;
};

export {
	saveToLocal,
	getFromLocal,
	calculateTotalQuantity,
	calculateTotalPrice,
};
