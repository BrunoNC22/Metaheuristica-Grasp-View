import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

async function getText() {
  const url =
    "https://metaheuristica-grasp-api-production.up.railway.app/teste";
  const options = {
    method: "GET",
  };
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the GET request.");
  }
}

async function createObj(text) {
  const graph = { nome: text };

  const url =
    "https://metaheuristica-grasp-api-production.up.railway.app/teste";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graph),
  };
  try {
    const response = await fetch(url, options);
    return response;
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the GET request.");
  }
}

async function showText() {
  const apiText = document.getElementById("api-text");
  const graph = {};
  try {
    const resp = await getText();
    if (resp.status === 200) {
      graph.value = await resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the GET request.");
  }

  apiText.textContent = graph.value.nome;
}

async function getObjText() {
  const inputText = document.getElementById("input-text");
  const text = document.getElementById("api-new-obj-response");
  const graph = {};

  try {
    const resp = await createObj(inputText.value);
    if (resp.status === 200) {
      graph.value = await resp.json();
    }
  } catch (error) {
    console.error("Error:", error);
    throw new Error("An error occurred while making the GET request.");
  }

  inputText.value = "";
  text.textContent = graph.value.nome;
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        {/* 
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        */}
      </div>
      <h1>Metaheuristica GRASP</h1>
      <div className="conteudo">
        <button onClick={showText} className="button test-response-button">
          Texto retirado da api:
        </button>
        <div className="test-response">
          <p id="api-text"></p>
        </div>

        <input
          id="input-text"
          className="input"
          placeholder="Nome do objeto"
          type="text"
        ></input>
        <button className="button test-response-button" onClick={getObjText}>
          Criar objeto na api
        </button>

        <div className="obj-response">
          <p id="api-new-obj-response"></p>
        </div>
      </div>
    </>
  );
}

export default App;
