import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Table from 'react-bootstrap/Table';
import ListGroup from 'react-bootstrap/ListGroup';
import { parseQuery } from './utils';

import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  console.log(parseQuery(window.location.search));
  return (
    <Container>
      <Card style={{ width: '100%', minHeight: '75vh' }}>
      <Card.Header>
        <h3>Загрузки транспорта от 17.01.2023 21.16</h3>
        <h4>Автомобиль: ГАЗ будка А226ТУ</h4>
      </Card.Header>
      <div className='d-flex'>
        <Card className='m-1 w-50'>
          <Card.Body>
            <Card.Title>Последние заказы </Card.Title>
            <Accordion>
              <Accordion.Item eventKey="0" className='m-1'>
                <Accordion.Header>Заказ #1 - Иванова Т.В.</Accordion.Header>
                <Accordion.Body className='p-0'>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                      </tr>
                      <tr>
                        <td>3</td>
                        <td colSpan={2}>Larry the Bird</td>
                        <td>@twitter</td>
                      </tr>
                    </tbody>
                  </Table>
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1" className='m-1'>
                <Accordion.Header>Заказ #2 - Петрова Л.С.</Accordion.Header>
                <Accordion.Body>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Card.Body>
        </Card>
      </div>
    </Card>
    </Container>
  );
}

export default App;
