import Accordion from 'react-bootstrap/Accordion';
import ProductTable from './ProductTable';

export default function OrderCard(props) {
  
  return (
    <Accordion.Item eventKey={props.eventKey}>
      <Accordion.Header>Заказ #1 - Иванова Т.В.</Accordion.Header>
      <Accordion.Body className='p-0'>
        <ProductTable />
      </Accordion.Body>
    </Accordion.Item>
  )
}
