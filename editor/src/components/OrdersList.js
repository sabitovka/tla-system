import Accordion from 'react-bootstrap/Accordion';
import NewOrderModal from './NewOrderModal';
import OrderCard from './OrderCard';

export default function OrdersList({ orders }) {
  const orderIds = orders.map((order) => order.id);

  return (
    <div className='p-3'>
      <h4>Выбранные заказы</h4>
      <NewOrderModal className='mb-2' />
      <Accordion alwaysOpen defaultActiveKey={orderIds}>
        {
          orders.map((order) => 
            <OrderCard eventKey={order.id} key={order.id} orderId={order.id} />)
        }
      </Accordion>
    </div>
  )
}