import { selector } from 'recoil';
import { searchState } from '../atoms/search';
import { productsState } from '../atoms/products';

export const filteredProductsState = selector({
  key: 'filteredProductsState',
  get: ({ get }) => {
    const search = get(searchState);
    const products = get(productsState).products;

    return products.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );
  },
});