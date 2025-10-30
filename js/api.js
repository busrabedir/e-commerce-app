// API üzerinden veri çekmek

const fetchProducts = async () => {
	try {
		// geridönen cevap
		const response = await fetch("../db.json");

		// api den gelen veriyi json a çevir
		const data = await response.json();

		console.log("data:", data);
		return data.products;
	} catch (error) {
		alert(error);
		return [];
	}
};

export default fetchProducts;
