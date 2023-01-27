import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import NewOrderModal from './NewOrderModal';
import OrderCard from './OrderCard';

export default function OrdersList() {
  const orders = useSelector((state) => state.rawOrders);
  const productsQueue = useSelector((state) => state.productsQueue);
  const orderIds = orders.map((order) => order.orderId);

  const onSave = () => {
    console.log(productsQueue)
  }

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
              additionalId={order.id}
              />)
        }
      </Accordion>
      <div className='d-flex mt-3'>
        <Button variant='secondary'className='me-2 ms-auto'>Отменить</Button>
        <Button variant='primary' onClick={onSave}>Сохранить</Button>
      </div>
    </div>
  )
}