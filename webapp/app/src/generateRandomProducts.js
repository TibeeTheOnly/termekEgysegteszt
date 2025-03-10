
export function generateRandomProducts(count) {
    const categories = ['Electronics', 'Clothing', 'Books'];
    const products = [];
    for (let i = 0; i < count; i++) {
        const product = {
            name: `Product ${i + 1}`,
            category: categories[Math.floor(Math.random() * categories.length)],
            price: Math.floor(Math.random() * 1000) + 1
        };
        products.push(product);
    }
    return products;
}
