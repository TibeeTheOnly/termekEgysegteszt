export default class ProductStatistics {
    constructor(products) {
        if (!Array.isArray(products)) {
            throw new Error('Products should be an array');
        }
        
        products.forEach(product => {
            if (typeof product.name !== 'string') {
                throw new Error('Product name should be a string');
            }
            if (typeof product.category !== 'string') {
                throw new Error('Product category should be a string');
            }
            if (typeof product.price !== 'number') {
                throw new Error('Product price should be a number');
            }
        });

        this.products = products;
    }

    calculateAveragePrice() {
        if(this.products.length === 0) {
            throw new Error('Cannot calculate average price of 0 products');
        }
        
        const total = this.products.reduce((sum, product) => sum + product.price, 0);
        return total / this.products.length;
    }

    getMostExpensiveProduct() {
        return this.products.reduce((max, product) => product.price > max.price ? product : max, this.products[0]);
    }

    getCheapestProduct() {
        return this.products.reduce((min, product) => product.price < min.price ? product : min, this.products[0]);
    }

    getProductCountByCategory() {
        return this.products.reduce((count, product) => {
            count[product.category] = (count[product.category] || 0) + 1;
            return count;
        }, {});
    }

    getAveragePriceByCategory(category) {
        const filteredProducts = this.products.filter(product => product.category === category);
        if (filteredProducts.length === 0) {
            throw new Error(`No products found in category: ${category}`);
        }
        const total = filteredProducts.reduce((sum, product) => sum + product.price, 0);
        return total / filteredProducts.length;
    }

    getAveragePriceGroupByCategory() {
        const categoryPrices = this.products.reduce((acc, product) => {
            if (!acc[product.category]) {
                acc[product.category] = [];
            }
            acc[product.category].push(product.price);
            return acc;
        }, {});

        const averagePrices = {};
        for (const category in categoryPrices) {
            const total = categoryPrices[category].reduce((sum, price) => sum + price, 0);
            averagePrices[category] = total / categoryPrices[category].length;
        }
        return averagePrices;
    }
}
