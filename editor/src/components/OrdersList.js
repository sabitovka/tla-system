import Accordion from 'react-bootstrap/Accordion';
import NewOrderModal from './NewOrderModal';
import OrderCard from './OrderCard';

export default function OrdersList({ orders }) {
  const orderIds = Object.keys(orders);

  return (
    <div className='p-3'>
      <h4>Выбранные заказы</h4>
      <NewOrderModal className='mb-2' />
      <Accordion alwaysOpen defaultActiveKey={orderIds}>
        {
          orderIds.map(orderId => 
            <OrderCard eventKey={orderId} key={orderId} orderId={orderId} />)
        }
      </Accordion>
    </div>
  )
}