

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров
import { v4 as uuidv4 } from 'uuid';

import {useHttp} from '../../hooks/http.hook';
import { useDispatch, useSelector} from 'react-redux';
import { useState } from "react";
import { heroCreated } from '../heroesList/heroesSlice';
import store from '../../store'
import { selectAll } from '../heroesFilters/filtersSlice';

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const [name, setName] = useState('');
    const [descr, setDescr] = useState('');
    const [type, setType] = useState('');
    const {filterLoadingStatus} = useSelector(state => state.filter);
    const {request} = useHttp();
    const filters = selectAll(store.getState());

    const getCharacter = (e) => {
        e.preventDefault();
        const character = {
            "id": uuidv4(),
            "name": name,
            "description": descr,
            "element": type
        }
        request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(character))
            .then(data => console.log(data, 'POST'))
            .then(dispatch(heroCreated(character)))
            .catch(err => console.log(err));
        setDescr('');
        setName('');
        setType('');
    }

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        
        if (filters && filters.length > 0 ) {
            return filters.map(({name, label}) => {
                // eslint-disable-next-line
                if (name === 'all')  return;

                return <option key={name} value={name}>{label}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={getCharacter}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    onChange={(e) => setDescr(e.target.value)}
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={type}
                    onChange={(e) => setType(e.target.value)}>
                    <option value="">Я владею элементом...</option>
                    {renderFilters(filters, filterLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary" >Создать</button>
        </form>
    )
}

export default HeroesAddForm;