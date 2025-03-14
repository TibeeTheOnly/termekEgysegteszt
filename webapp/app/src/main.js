import ProductStatistics from './ProductStatistics.js';
import { generateRandomProducts } from './generateRandomProducts.js';

function displayProducts(products) {
    const tableBody = document.getElementById('products-table-body');
    tableBody.innerHTML = '';
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
        `;
        tableBody.appendChild(row);
    });
}

function displayStatistics(stats) {
    document.getElementById('average-price').innerText = stats.calculateAveragePrice().toFixed(2);
    document.getElementById('most-expensive-product').innerText = stats.getMostExpensiveProduct().name;
    document.getElementById('cheapest-product').innerText = stats.getCheapestProduct().name;
    const categoryCounts = stats.getProductCountByCategory();
    document.getElementById('product-count-by-category').innerText = JSON.stringify(categoryCounts, null, 2);
}

function displayAveragePriceByCategory(stats, category) {
    try {
        const averagePrice = stats.getAveragePriceByCategory(category);
        document.getElementById('average-price-by-category').innerText = averagePrice.toFixed(2);
    } catch (error) {
        document.getElementById('average-price-by-category').innerText = error.message;
    }
}

function displayAveragePriceGroupByCategory(stats) {
    const averagePrices = stats.getAveragePriceGroupByCategory();
    const chartData = Object.keys(averagePrices).map(category => ({
        category,
        averagePrice: averagePrices[category]
    }));

    const chartContainer = document.getElementById('chart-container');
    chartContainer.innerHTML = '';
    const maxPrice = Math.max(...chartData.map(data => data.averagePrice));
    chartData.forEach(data => {
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${(data.averagePrice / maxPrice) * 100}%`; // Adjust the height proportionally
        bar.innerText = `${data.category}: ${data.averagePrice.toFixed(2)}`;
        chartContainer.appendChild(bar);
    });
}

async function init() {
    const products = generateRandomProducts(10);
    const stats = new ProductStatistics(products);

    displayProducts(products);
    displayStatistics(stats);

    document.getElementById('calculate-average-price-by-category').addEventListener('click', () => {
        const category = document.getElementById('category-input').value;
        displayAveragePriceByCategory(stats, category);
    });

    displayAveragePriceGroupByCategory(stats);
}

document.addEventListener('DOMContentLoaded', async () => {
    await init();
});
