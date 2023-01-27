import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import ProductTableRow from './ProductTableRow';
import * as actions from "../store/actions";

export default function ProductTable({ products, orderId }) {
  const dispatch = useDispatch();

  const onChecked = (product, action) => {
    dispatch(actions.addProduct(product, orderId, action));
  }

  const onUnchecked = (product) => {
    dispatch(actions.deleteProduct(product, orderId));
  }

  useEffect(() => {
    const loadedProducts = products.filter((product) => product.isLoaded);
    const totalWeight = loadedProducts.reduce((prev, cur) => prev + cur.totalWeight, 0);
    const totalVolume = loadedProducts.reduce((prev, cur) => prev + cur.totalVolume, 0);
    const totalCost = loadedProducts.reduce((prev, cur) => prev + cur.total, 0);

    console.log('Вес', totalWeight);
    dispatch(actions.setWeight(totalWeight));
    console.log('Объем', totalVolume);
    dispatch(actions.setVolume(totalVolume));
    console.log('Стоимость', totalCost);
    dispatch(actions.setCost(totalCost));
  }, [products, dispatch]);

  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Цена, руб.</th>
          <th>Кол-во</th>
          <th>Всего, руб.</th>
          <th>Объем, л.</th>
          <th>Вес, кг</th>
          <th>Погружено</th>
        </tr>
      </thead>
      <tbody>
        {
          products.map((product, idx) => (
            <ProductTableRow
              key={idx}
              product={product}
              onChecked={onChecked}
              onUnchecked={onUnchecked}
            />
          ))
        }
      </tbody>
    </Table>
  )
}
