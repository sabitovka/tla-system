import Card from 'react-bootstrap/Card';
import OrdersList from './components/OrdersList';
import { parseQuery } from './utils';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log(parseQuery(window.location.search));
  return (
    <Card>
      <Card.Header>
        <h3>Загрузки транспорта от 17.01.2023 21.16</h3>
        <h4>Автомобиль: ГАЗ будка А226ТУ</h4>
      </Card.Header>
      <OrdersList />
    </Card>
  );
}

export default App;
