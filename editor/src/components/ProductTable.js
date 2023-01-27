import React from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import ProductTableRow from './ProductTableRow';
import * as actions from "../store/actions";

export default function ProductTable({ products, orderId }) {
  const dispatch = useDispatch();

  function onChecked(product, action) {
    dispatch(actions.addProduct(product.id, orderId, action));
  }

  function onUnchecked(product) {
    console.log(product);
    dispatch(actions.deleteProduct(product));
  }

  return (//React.useMemo(() => (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>Название</th>
          <th>Цена, руб.</th>
          <th>Кол-во</th>
          <th>Всего, руб.</th>
          <th>Габариты, см^3</th>
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
    //), [products]
  )
}
