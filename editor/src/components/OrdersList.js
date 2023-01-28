import Accordion from 'react-bootstrap/Accordion';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import useHttp from '../hooks/http.hook';
import NewOrderModal from './NewOrderModal';
import OrderCard from './OrderCard';
import config from '../config/default';
import * as actions from "../store/actions";

export default function OrdersList() {
  const orders = useSelector((state) => state.rawOrders);
  const productsQueue = useSelector((state) => state.productsQueue);
  const dispatch = useDispatch();
  const { request } = useHttp();

  const orderIds = orders.map((order) => order.id);

  const onSave = () => {
    console.log(productsQueue)
    request(
      `${config.app.orderApiUrl}/app/web/api/products/save-batch`,
      'POST',
      productsQueue
    )
    .then(() => alert('Сохранено'))
    .catch((e) => dispatch(actions.addError('Произошла ошибка при выполнении запроса', e.message)));
  }

  return (
    <div className='p-3'>
      <h4>Выбранные заказы</h4>
      <NewOrderModal className='mb-2' />
      <Accordion alwaysOpen defaultActiveKey={orderIds}>
        {
          orders.map((order, idx) => 
            <OrderCard
              eventKey={order.id}
              key={idx}
              orderId={order.id}
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