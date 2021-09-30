import { useState } from "react";
import "./App.css";
import ExampleProp from "./pages/exampleProp";

interface Example {
  id: number;
  name: string;
}

function App(): JSX.Element {
  const [count, setCount] = useState<number>(0);

  const [markers, setMarkers] = useState<any[]>([
    { name: "Pavel", language: "Английский", levelLanguange: "A1" },
    { name: "Oleg", language: "Английский", levelLanguange: "A2" },
    { name: "Maxim", language: "Немецкий", levelLanguange: "A1" },
  ]);
  const [filters, setFilters] = useState<any[]>([]);

  const onSelectFilter = (value: any, type: any) => {
    const newFilter = { value, type };
    setFilters((prevFilters) => {
      return [...prevFilters, newFilter];
    });
  };

  const filterMarkers = () => {
    return markers.filter((marker) => {
      return filters.every((filter) => marker[filter.type] === filter.value);
    });
  };

  return (
    <div className="App">
      <div>
        {/* <h4>Фильтры</h4>
        <select onChange={(e) => onSelectFilter(e.target.value, "language")}>
          <option disabled selected>
            Язык
          </option>
          <option value="Английский">Английский</option>
          <option value="Немецкий">Немецкий</option>
        </select>
        <select
          onChange={(e) => onSelectFilter(e.target.value, "levelLanguange")}
        >
          <option disabled selected>
            Уровень
          </option>
          <option value="A1">A1</option>
          <option value="A2">A2</option>
        </select>
        <button onClick={() => setFilters([])}>Reset filters</button>
        <div>----------------</div>
        <div>
          <h4>Выбранные фильтры</h4>
          {filters.map((filter) => (
            <div>
              <span>Тип:{filter.type}</span>
              <span>Значение:{filter.value}</span>
            </div>
          ))}
        </div>
        <div>----------------</div>
        <h4>Все разметчики</h4>
        {markers.map((marker) => (
          <div className="marker">
            <span>{marker.name}</span>
            <span>{marker.language}</span>
            <span>{marker.levelLanguange}</span>
          </div>
        ))}
        <div>----------------</div>
        <h4>Фильтрованные разметчики</h4>
        {filterMarkers().map((marker) => (
          <div className="marker">
            <span>{marker.name}</span>
            <span>{marker.language}</span>
            <span>{marker.levelLanguange}</span>
          </div>
        ))}
        <div>----------------</div> */}
        <ExampleProp markers={markers} />
      </div>
    </div>
  );
}

export default App;
