import {useAppDispatch} from '../../hooks';
import {changeCity} from '../../store/action.ts';

type CitiesListProps = {
  cities: {
    name: string;
    id: number;
  }[];
};

function CitiesList({cities}: CitiesListProps): JSX.Element {
  const dispatch = useAppDispatch();

  const handleCityChange = (city: string) => {
    dispatch(changeCity(city));
  };

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li
          key={city.id}
          className="locations__item"
          onClick={() => handleCityChange(city.name)}
        >
          <a className="locations__item-link tabs__item" href="#">
            <span>{city.name}</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default CitiesList;
