const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

describe('sortProductsByPrice', () => {
  test("все товары c 'asc' сортируются как [3, 6, 5, 4, 2, 1]", () => {
    expect(sortProductsByPrice(products, 'asc').map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test('все товары без направления сортируются как [3, 6, 5, 4, 2, 1]', () => {
    expect(sortProductsByPrice(products).map((product) => product.id)).toEqual([3, 6, 5, 4, 2, 1]);
  });

  test("товары [1, 3, 4] c 'asc' сортируются как [3, 4, 1]", () => {
    const items = [1, 3, 4].map((id) => products.find((item) => item.id === id));
    expect(sortProductsByPrice(items, 'asc').map((product) => product.id)).toEqual([3, 4, 1]);
  });

  test("все товары c 'desc' сортируются как [1, 2, 4, 5, 6, 3]", () => {
    expect(sortProductsByPrice(products, 'desc').map((product) => product.id)).toEqual([1, 2, 4, 5, 6, 3]);
  });


  test("товары [3, 1, 4] c 'desc' сортируются как [1, 4, 3]", () => {
    const items = [3, 1, 4].map((id) => products.find((item) => item.id === id));
    expect(sortProductsByPrice(items, 'desc').map((product) => product.id)).toEqual([1, 4, 3]);
  });

  test("товары [5, 2, 6] c 'desc' сортируются как [2, 5, 6]", () => {
    const items = [5, 2, 6].map((id) => products.find((item) => item.id === id));
    expect(sortProductsByPrice(items, 'desc').map((product) => product.id)).toEqual([2, 5, 6]);
  });

  test("'asc' не меняет исходный массив [1, 3, 4]", () => {
    const items = [1, 3, 4].map((id) => products.find((item) => item.id === id));
    sortProductsByPrice(items, 'asc');
    expect(items.map((product) => product.id)).toEqual([1, 3, 4]);
  });

  test("'desc' не меняет исходный массив [1, 3, 4]", () => {
    const items = [1, 3, 4].map((id) => products.find((item) => item.id === id));
    sortProductsByPrice(items, 'desc');
    expect(items.map((product) => product.id)).toEqual([1, 3, 4]);
  });

  test('направление по умолчанию не меняет исходный массив всех товаров',() => {
    sortProductsByPrice(products);
    expect(products.map((product) => product.id)).toEqual([1, 2, 3, 4, 5, 6]);
  });
});
