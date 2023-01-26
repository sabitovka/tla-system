import Accordion from 'react-bootstrap/Accordion';
import { useSelector } from 'react-redux';
import { Mutex } from '../utils';
import NewOrderModal from './NewOrderModal';
import OrderCard from './OrderCard';

export default function OrdersList() {
  const orders = useSelector((state) => state.orders);
  const orderIds = orders.map((order) => order.orderId);

  //const mutex = new Mutex();
  console.log(1);

  return (
    <div className='p-3'>
      <h4>Выбранные заказы</h4>
      <NewOrderModal className='mb-2' />
      <Accordion alwaysOpen defaultActiveKey={orderIds}>
        {
          orders.map((order, idx) => 
            <OrderCard
              eventKey={order.orderId}
              key={idx}
              orderId={order.orderId}
              />)
        }
      </Accordion>
    </div>
  )
}