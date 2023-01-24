import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import Card from 'react-bootstrap/Card';
import OrdersList from './components/OrdersList';
import ToastHolder from './components/ToastHolder';
import useHttp from './hooks/http.hook';
import * as actions from "./store/actions";
import config from './config/default';

function App() {
  const { isLoading, request, error, clearError } = useHttp();
  const dispatch = useDispatch();

  const fetchLoadingData = useCallback(async () => {
    try {
      const fetched = await request(`${config.app.orderApiUrl}/orders`);
      console.log(fetched)
      //setLoadingData(fetched);
    } catch (e) {}
  }, [request]);

  useEffect(() => {
    fetchLoadingData();
  }, [fetchLoadingData]);

  useEffect(() => {
    if (error) {
      dispatch(actions.addError('Произошла ошибка при выполнении запроса. ', error));
      clearError();
    }
    console.log(error);
  }, [dispatch, error, clearError]);

  if (isLoading) {
    return 'Загрузка';
  }

  // if (error) {
  //   return 'Невозможно загрузить страницу'
  // }

  return (
    <>
      <ToastHolder />
      <Card>
        <Card.Header>
          <h3>Загрузки транспорта от 17.01.2023 21.16</h3>
          <h4>Автомобиль: ГАЗ будка А226ТУ</h4>
        </Card.Header>
        <OrdersList />
      </Card>
    </>
  );
}

export default App;
