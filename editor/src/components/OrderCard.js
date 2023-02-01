import { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import Accordion from 'react-bootstrap/Accordion';
import Placeholder from 'react-bootstrap/Placeholder';
import ProductTable from './ProductTable';
import useHttp from "../hooks/http.hook";
import * as actions from "../store/actions"; 
import config from '../config/default';

const OrderCard = ({ orderId, order, eventKey, onOrderLoaded, onError }) => {
  const { request } = useHttp();

  const fetchOrder = useCallback(async () => {
    try {
      request(`${config.app.orderApiUrl}/orders/${orderId}`)
        .then(onOrderLoaded)
        .catch(onError);
    } catch (e) {
        
    }
  }, [request, orderId, onOrderLoaded, onError]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  const header = (order) => {
    if (order && order.customer) {
      return `Заказ №${order.num} - ${order.customer.name}, ${order.customer.adress}, ${order.customer.tel}`;
    }
    return <Placeholder xs={8} />
  }

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        { header(order) }
      </Accordion.Header>
      <Accordion.Body className='p-0'>
        { order?.products && <ProductTable products={order.products} orderId={order.id} /> }
      </Accordion.Body>
    </Accordion.Item>
  )
}

const mapStateToProps = (state, ownProps) => ({
      order: state.orders.find((order) => ownProps['orderId'] === order.id),
})

const mapDispatchToProps = (dispatch) => ({
    onOrderLoaded: (fetched) => dispatch(actions.fetchOrder(fetched)),
    onError: (err) => dispatch(actions.addError('Произошла ошибка выполнения запроса', err.message))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderCard);
