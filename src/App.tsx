import React, { useState } from "react";
import "./App.css";

// Función para generar un número aleatorio con un número de dígitos
const generarNumeroAleatorio = (digitos: number): number => {
  const min = Math.pow(10, digitos - 1);
  const max = Math.pow(10, digitos) - 1;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const App: React.FC = () => {
  const [numeroSecreto, setNumeroSecreto] = useState<number | null>(null);
  const [intento, setIntento] = useState<string>("");
  const [mensaje, setMensaje] = useState<string>("");
  const [digitos, setDigitos] = useState<number>(2);
  const [intentosRestantes, setIntentosRestantes] = useState<number>(5); // Intentos limitados
  const [pista, setPista] = useState<string>("");

  // Función para comenzar el juego
  const comenzarJuego = () => {
    const numero = generarNumeroAleatorio(digitos);
    setNumeroSecreto(numero);
    setMensaje("¡Adivina el número!");
    setIntento("");
    setPista("");
    setIntentosRestantes(5); // Reiniciar intentos
  };

  // Función para manejar el intento del jugador
  const manejarIntento = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIntento(e.target.value);
  };

  // Función para probar suerte
  const probarSuerte = () => {
    if (!numeroSecreto) {
      setMensaje("Debes comenzar el juego primero.");
      return;
    }

    if (intentosRestantes <= 0) {
      setMensaje("Te has quedado sin intentos. ¡Comienza un nuevo juego!");
      return;
    }

    const intentoNumero = parseInt(intento);

    if (intentoNumero === numeroSecreto) {
      setMensaje("¡Correcto! ¡Adivinaste el número!");
      setPista("");
    } else {
      setMensaje("Incorrecto.");
      setIntentosRestantes(intentosRestantes - 1);

      if (intentoNumero > numeroSecreto) {
        setPista("El número es menor.");
      } else {
        setPista("El número es mayor.");
      }
    }
  };

  // Función para manejar el cambio de dificultad
  const manejarDificultad = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const dificultad = parseInt(e.target.value);
    setDigitos(dificultad);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-6">
        Juego de Adivinanza de Números
      </h1>

      <div className="mb-6">
        <label htmlFor="dificultad" className="text-lg mr-2">
          Selecciona la dificultad:{" "}
        </label>
        <select
          id="dificultad"
          onChange={manejarDificultad}
          className="p-2 rounded border border-gray-400"
        >
          <option value="2">Fácil (2 dígitos)</option>
          <option value="3">Media (3 dígitos)</option>
          <option value="5">Difícil (5 dígitos)</option>
        </select>
      </div>

      <button
        onClick={comenzarJuego}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 mb-6"
      >
        Comenzar Juego
      </button>

      {numeroSecreto && (
        <div className="flex flex-col items-center">
          <input
            type="text"
            value={intento}
            onChange={manejarIntento}
            placeholder={`Ingresa un número de ${digitos} dígitos`}
            className="p-2 rounded border border-gray-400 mb-4"
          />

          <button
            onClick={probarSuerte}
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 mb-4"
          >
            Probar Suerte
          </button>

          <p className="text-xl">{mensaje}</p>
          <p className="text-lg text-gray-600">{pista}</p>
          <p className="text-lg font-semibold text-red-500">
            Intentos restantes: {intentosRestantes}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
