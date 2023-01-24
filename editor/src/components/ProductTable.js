import Table from 'react-bootstrap/Table';
import ProductTableRow from './ProductTableRow';

export default function ProductTable() {
  return (
    <Table striped bordered hover size="sm">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <ProductTableRow />
      </tbody>
    </Table>
  )
}