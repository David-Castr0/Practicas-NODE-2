import { useState } from 'react';

function App() {
  const [contador, setContador] = useState(0);
  const minimo = 0;
  const maximo = 10;
  
  function incrementar() {
    if (contador < maximo) {
      setContador(contador + 1);
    }
  }
  
  function decrementar() {
    if (contador > minimo) {
      setContador(contador - 1);
    }
  }
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Contador con Límites</h2>
      
      <h1 style={{ fontSize: '60px', margin: '20px' }}>{contador}</h1>
      
      <div>
        <button 
          onClick={decrementar} 
          disabled={contador === minimo}
          style={{ padding: '10px 20px', margin: '5px' }}
        >
          -
        </button>
        
        <button 
          onClick={incrementar}
          disabled={contador === maximo}
          style={{ padding: '10px 20px', margin: '5px' }}
        >
          +
        </button>
      </div>
      
      {contador === minimo && (
        <p style={{ color: 'red', marginTop: '20px' }}>
          ⚠️ Has llegado al mínimo
        </p>
      )}
      
      {contador === maximo && (
        <p style={{ color: 'green', marginTop: '20px' }}>
          ✅ Has llegado al máximo
        </p>
      )}
    </div>
  );
}

export default App;