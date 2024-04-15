import React, { useState, useEffect } from "react";

export function App() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hiddenIndexes, setHiddenIndexes] = useState([]);

  useEffect(() => {
    if (!loading) {
      return;
    }
    fetch("https://pokeapi.co/api/v2/pokemon")
      .then((response) => {
        if (!response.ok) {
          throw new Error("No se pudo obtener la lista de pokémon");
        }
        return response.json();
      })
      .then((data) => {
        setData(data.results);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [loading]);

  const handleClick = () => {
    setLoading(true);
  };

  const handleHide = (index) => {
    setHiddenIndexes([...hiddenIndexes, index]);
  };

  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col">
          <h1 className="text-center">Lista de Pokémon</h1>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col text-center">
          <button className="btn btn-primary mr-2" onClick={handleClick}>
            Mostrar Lista
          </button>
          <button className="btn btn-secondary" onClick={() => setHiddenIndexes([])}>
            Mostrar Todos
          </button>
        </div>
      </div>
      <div className="row mt-3">
        <div className="col">
          {loading ? (
            <p className="text-center">Cargando...</p>
          ) : error ? (
            <p className="text-center">Error: {error}</p>
          ) : (
            <div className="card">
              <ul className="list-group list-group-flush">
                {data.map((pokemon, index) => (
                  !hiddenIndexes.includes(index) && (
                    <li key={pokemon.url} className="list-group-item">
                      <span>{pokemon.name}</span> - <span>{pokemon.url}</span>
                      <button className="btn btn-danger ml-4 " onClick={() => handleHide(index)}>
                        X
                      </button>
                    </li>
                  )
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}