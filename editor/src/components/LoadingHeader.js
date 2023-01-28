import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from '../store/actions';

export default function LoadingHeader({ loading, transport }) {
    const cost = useSelector((state) => state.totalCost);
    const volume = useSelector((state) => state.totalVolume);
    const weight = useSelector((state) => state.totalWeight);
    const isValid = useSelector((state) => state.isValid);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.setValid((weight < transport.load_capacity) && (volume < transport.volume)))
    }, [volume, weight, dispatch, transport]);

    const variant = (cond) => cond ? 'text-success' : 'text-danger';
    
    return (
        <>
            <div className="d-flex justify-content-between align-items-end">
                <div>
                    <h3>Погрузка транспорта №{loading.id} от {loading.creationDate}</h3>
                    <h4>Автомобиль: {transport.name} - {transport.state_number}</h4>
                    <h5 className="text-primary">Стоимость груза: {cost} руб.</h5>
                </div>
                <div>
                    { !isValid && <h3 className="text-danger">ПРЕВЫШЕНЫ ПРЕДЕЛЫ</h3> }
                </div>
                <div className="ms-auto mt-auto">
                    <h5 className={variant(weight < transport.load_capacity)}>{weight || '?'}/{transport.load_capacity} кг.</h5>
                    <h5 className={variant(volume < transport.volume)}>{volume || '?'}/{transport.volume} л.</h5>
                </div>
            </div>
        </>
    )
}