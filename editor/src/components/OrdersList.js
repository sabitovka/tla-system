import Accordion from 'react-bootstrap/Accordion';
import NewOrderModal from './NewOrderModal';
import OrderCard from './OrderCard';

const ORDERS = [1, 2, 3];

export default function OrdersList() {
  return (
    <div className='p-3'>
      <h4>Выбранные заказы</h4>
      <NewOrderModal className='mb-2' />
      <Accordion alwaysOpen defaultActiveKey={ORDERS}>
        {
          ORDERS.map(orderId => 
            <OrderCard eventKey={orderId} key={orderId}/>)
        }
      </Accordion>
    </div>
  )
}