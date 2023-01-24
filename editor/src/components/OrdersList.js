import Accordion from 'react-bootstrap/Accordion';
import OrderCard from './OrderCard';

const ORDERS = [1, 2, 3];

export default function OrdersList() {
  return (
    <div className='p-3'>
      <h5>Последние заказы</h5>
      <Accordion alwaysOpen defaultActiveKey={ORDERS}>
        {
          ORDERS.map(orderId => 
            <OrderCard eventKey={orderId} key={orderId}/>)
        }
      </Accordion>
    </div>
  )
}