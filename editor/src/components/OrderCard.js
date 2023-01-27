import { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import Accordion from 'react-bootstrap/Accordion';
import Placeholder from 'react-bootstrap/Placeholder';
import ProductTable from './ProductTable';
import useHttp from "../hooks/http.hook";
import * as actions from "../store/actions"; 
import config from '../config/default';

const OrderCard = ({ orderId, additionalId, order, eventKey, onOrderLoaded, onError }) => {
  const { request } = useHttp();

  const fetchOrder = useCallback(async () => {
    try {
      request(`${config.app.orderApiUrl}/app/web/api/orders/${orderId}`)
        .then((data) => onOrderLoaded(data, additionalId))
        .catch(onError);
    } catch (e) {
        
    }
  }, [request, orderId, onOrderLoaded, onError, additionalId]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const header = (order) => {
    if (order && order.customer) {
      return `Заказ №${order.id} - ${order.customer.name}, ${order.customer.adress}, ${order.customer.tel}`;
    }
    return <Placeholder xs={8} />
  }

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        { header(order) }
      </Accordion.Header>
      <Accordion.Body className='p-0'>
        { order?.products && <ProductTable products={order.products} additionalOrderId={order.additionalId} /> }
      </Accordion.Body>
    </Accordion.Item>
  )
}

const mapStateToProps = (state, ownProps) => ({
      order: state.orders.find((order) => ownProps['orderId'] === order.orderId),
})

const mapDispatchToProps = (dispatch) => ({
    onOrderLoaded: (fetched, additionalId) => dispatch(actions.fetchOrder(fetched, additionalId)),
    onError: (err) => dispatch(actions.addError('Произошла ошибка выполнения запроса', err.message))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
