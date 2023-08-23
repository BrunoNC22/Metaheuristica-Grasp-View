import { useState } from "react";
import "./App.css";

async function createObj(requestObj) {
  const url =
    "https://metaheuristica-grasp-api-production.up.railway.app/teste";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestObj),
  };

  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the GET request.");
  }
}

function App() {
  const [itens, setItens] = useState([{ peso: undefined, valor: undefined }]);

  const [capacidade, setCapacidade] = useState(undefined);

  const [isRequestSend, setIsRequestSend] = useState(false);

  const [responseObj, setResponseObj] = useState([]);

  const handleFormChange = (index, event) => {
    try {
      let data = [...itens];
      data[index][event.target.name] = parseInt(event.target.value);
      setItens(data);
    } catch (e) {}
  };

  const addItens = () => {
    let newItem = { peso: undefined, valor: undefined };

    let data = [...itens];
    data.push(newItem);
    setItens(data);
  };

  const submitEventHandler = async (event) => {
    event.preventDefault();
    let data = {
      capacidade: capacidade,
      numeroDeItens: itens.length,
      itens: itens,
    };

    try {
      setIsRequestSend(true);
      console.log(data);
      const resp = await createObj(data);
      if (resp.status === 200) {
        setResponseObj(await resp.json());
      }
    } catch (error) {
      console.error("Error:", error);
      throw new Error("An error occurred while making the POST request.");
    }
  };

  const removeItem = (index) => {
    let data = [...itens];
    data.splice(index, 1);
    setItens(data);
  };

  const calcularGanhoTotal = () => {
    let ganho = 0;

    for (let obj in responseObj) {
      ganho += responseObj[obj].valor;
    }

    return ganho;
  };

  const calcularPesoTotal = () => {
    let peso = 0;

    for (let obj in responseObj) {
      peso += responseObj[obj].peso;
    }

    return peso;
  };

  return (
    <>
      <div className="container">
        <h1 className="title">Metaheuristica GRASP</h1>
        <p>O problema da mochila binária resolvido com um algoritmo GRASP</p>
        <p>Informe os dados da mochila e as informações dos itens:</p>
        <div className="pre-form">
          <form action="POST" onSubmit={submitEventHandler} className="form">
            <div className="capacidade-div">
              Capacidade da mochila
              <input
                type="number"
                name="capacidade"
                placeholder="Capacidade"
                value={capacidade}
                onChange={(e) => setCapacidade(parseInt(e.target.value))}
                className="capacidade"
              />
            </div>
            <div className="input-header">
              <div className="input-header-peso">Peso</div>
              <div className="input-header-ganho">Ganho</div>
              <div className="mobile-input-header-remove">Remover</div>
            </div>
            {itens.map((item, index) => (
              <div key={index} className="item">
                <input
                  type="number"
                  placeholder="Peso"
                  name="peso"
                  value={item.peso}
                  onChange={(e) => handleFormChange(index, e)}
                  className="item-input"
                ></input>
                <input
                  type="number"
                  placeholder="Ganho"
                  name="valor"
                  value={item.valor}
                  onChange={(e) => handleFormChange(index, e)}
                  className="item-input"
                />
                <button
                  type="button"
                  name="index"
                  className="desktop-remove-button"
                  onClick={() => {
                    removeItem(index);
                  }}
                >
                  Remover
                </button>
                <button
                  type="button"
                  name="index"
                  className="mobile-remove-button"
                  onClick={() => {
                    removeItem(index);
                  }}
                >
                  X
                </button>
              </div>
            ))}
            <div className="form-buttons">
              <button type="button" onClick={addItens}>
                Adicionar item
              </button>
              <button type="submit">Enviar</button>
            </div>
          </form>
        </div>

        {isRequestSend ? (
          responseObj ? (
            <div className="response">
              <div className="response-body">
                <div className="quantidade">
                  {"Quantidade de itens possiveis de serem colocados na bolsa: " +
                    responseObj.length}
                </div>
                <div className="itens">
                  <div className="itens-head">
                    <p>#</p>
                    <p>peso</p>
                    <p>valor</p>
                  </div>
                  {responseObj.map((item, index) => (
                    <div className="response-item" key={index}>
                      <p>{index + 1}</p>
                      <p>{item.peso}</p>
                      <p>{item.valor}</p>
                    </div>
                  ))}
                </div>
                <div className="total">
                  <div className="total__">
                    <p>Ganho total: {calcularGanhoTotal()}</p>
                    <p>Peso total: {calcularPesoTotal()}</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="response">Carregando...</div>
          )
        ) : (
          <div className="response"></div>
        )}
      </div>
    </>
  );
}

export default App;
