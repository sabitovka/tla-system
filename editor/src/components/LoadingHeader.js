import { useSelector } from "react-redux"

export default function LoadingHeader({ loading, transport }) {
    const cost = useSelector((state) => state.totalCost);
    const volume = useSelector((state) => state.totalVolume);
    const weight = useSelector((state) => state.totalWeight);

    const getStyle = (val1, val2) => {
        return (val1 > val2) ? "text-danger" : "text-success";
    }
    
    return (
        <>
            <div className="d-flex">
                <div>
                    <h3>Погрузка транспорта №{loading.id} от {loading.creationDate}</h3>
                    <h4>Автомобиль: {transport.name} - {transport.state_number}</h4>
                    <h5 className="text-primary">Стоимость груза: {cost} руб.</h5>
                </div>
                <div className="ms-auto mt-auto">
                    <h5 className={getStyle(weight, transport.load_capacity)}>{weight || '?'}/{transport.load_capacity} кг.</h5>
                    <h5 className={getStyle(volume, transport.volume)}>{volume || '?'}/{transport.volume} л.</h5>
                </div>
            </div>
        </>
    )
}