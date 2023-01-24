import { useState } from 'react';
import Form from 'react-bootstrap/Form';

export default function ProductTableRow() {
  const [loaded, setLoaded] = useState(false);

  function onCheckChange(e) {
    console.log(e.target.checked, loaded);
    setLoaded(e.target.checked);
  }

  const style = {
    bg: loaded ? 'bg-success' : 'bg-warning',
    text: loaded ? 'text-light' : 'text-dark',
  }

  return (
    <tr className={style.bg}>
      <td className={style.text}>1</td>
      <td className={style.text}>Spring and summershoes</td>
      <td className={style.text}>20</td>
      <td className={style.text}>3 шт</td>
      <td className={style.text}>60</td>
      <td className={style.text}>3500 (100x150x50)</td>
      <td className={style.text}>1000</td>
      <td><Form.Check type="checkbox" defaultValue={loaded} onChange={onCheckChange} /></td>
    </tr>
  )
}