import { describe, it, expect } from 'vitest';
import ProductStatistics from '../webapp/app/src/ProductStatistics.js';

describe('ProductStatistics Class', () => {
    // Constructor tesztelése

    it('should create the ProductStatistics instance', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: 100 }
        ];
        const stats = new ProductStatistics(products);
        expect(stats).toBeInstanceOf(ProductStatistics);
    });

    it('should throw an error if products is not an array', () => {
        expect(() => new ProductStatistics()).toThrow('Products should be an array');
    });

    it('should throw an error if product name is not a string', () => {
        const products = [
            { name: 1, category: 'Category 1', price: 100 }
        ];
        expect(() => new ProductStatistics(products)).toThrow('Product name should be a string');
    });

    it('should throw an error if product category is not a string', () => {
        const products = [
            { name: 'Product 1', category: 1, price: 100 }
        ];
        expect(() => new ProductStatistics(products)).toThrow('Product category should be a string');
    });

    it('should throw an error if product price is not a number', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: '100' }
        ];
        expect(() => new ProductStatistics(products)).toThrow('Product price should be a number');
    });

    // Átlagár számítás tesztelése 

    it('should calculate the average price of products', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: 100 },
            { name: 'Product 2', category: 'Category 2', price: 200 },
            { name: 'Product 3', category: 'Category 1', price: 300 }
        ];
        const stats = new ProductStatistics(products);
        expect(stats.calculateAveragePrice()).toBe(200);
    });

    it('should not calculate the average price of products if there are no products', () => {
        const stats = new ProductStatistics([]);
        expect(() => stats.calculateAveragePrice()).toThrow('Cannot calculate average price of 0 products');
    });

    it('should not calculate the average price of products if the price is not a number', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: '100' },
            { name: 'Product 2', category: 'Category 2', price: 200 },
            { name: 'Product 3', category: 'Category 1', price: 300 }
        ];
        expect(() => new ProductStatistics(products)).toThrow('Product price should be a number');
    });

    // Legdrágább termék tesztelése

    it('should return the most expensive product', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: 100 },
            { name: 'Product 2', category: 'Category 2', price: 200 },
            { name: 'Product 3', category: 'Category 1', price: 300 }
        ];
        const stats = new ProductStatistics(products);
        expect(stats.getMostExpensiveProduct()).toEqual({ name: 'Product 3', category: 'Category 1', price: 300 });
    });

    it('should return the first product if all products have the same price', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: 100 },
            { name: 'Product 2', category: 'Category 2', price: 100 },
            { name: 'Product 3', category: 'Category 1', price: 100 }
        ];
        const stats = new ProductStatistics(products);
        expect(stats.getMostExpensiveProduct()).toEqual({ name: 'Product 1', category: 'Category 1', price: 100 });
    });

    // Legolcsóbb termék tesztelése

    it('should return the cheapest product', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: 100 },
            { name: 'Product 2', category: 'Category 2', price: 200 },
            { name: 'Product 3', category: 'Category 1', price: 300 }
        ];
        const stats = new ProductStatistics(products);
        expect(stats.getCheapestProduct()).toEqual({ name: 'Product 1', category: 'Category 1', price: 100 });
    });

    it('should return the first product if all products have the same price', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: 100 },
            { name: 'Product 2', category: 'Category 2', price: 100 },
            { name: 'Product 3', category: 'Category 1', price: 100 }
        ];
        const stats = new ProductStatistics(products);
        expect(stats.getCheapestProduct()).toEqual({ name: 'Product 1', category: 'Category 1', price: 100 });
    });

    // Kategóriák számolása tesztelése

    it('should count products by category', () => {
        const products = [
            { name: 'Product 1', category: 'Category 1', price: 100 },
            { name: 'Product 2', category: 'Category 2', price: 200 },
            { name: 'Product 3', category: 'Category 1', price: 300 }
        ];
        const stats = new ProductStatistics(products);
        expect(stats.getProductCountByCategory()).toEqual({ 'Category 1': 2, 'Category 2': 1 });
    });

    it('should return an empty object if there are no products', () => {
        const stats = new ProductStatistics([]);
        expect(stats.getProductCountByCategory()).toEqual({});
    });
});