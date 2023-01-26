import React from 'react';
import Table from 'react-bootstrap/Table';
import ProductTableRow from './ProductTableRow';

export default function ProductTable({ products }) {
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
          products.map((product, idx) => (<ProductTableRow product={product} key={idx} />))
        }
      </tbody>
    </Table>
    //), [products]
  )
}
