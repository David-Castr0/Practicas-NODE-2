import { useState, useEffect } from 'react';

function useTemporizador(tiempoInicial) {
  const [tiempoRestante, setTiempoRestante] = useState(tiempoInicial);
  const [activo, setActivo] = useState(false);
  
  useEffect(() => {
    if (!activo || tiempoRestante === 0) return;
    
    const intervalo = setInterval(() => {
      setTiempoRestante(tiempo => tiempo - 1);
    }, 1000);
    
    return () => clearInterval(intervalo);
  }, [activo, tiempoRestante]);
  
  const iniciar = () => setActivo(true);
  const pausar = () => setActivo(false);
  const reiniciar = () => {
    setTiempoRestante(tiempoInicial);
    setActivo(false);
  };
  
  return { tiempoRestante, activo, iniciar, pausar, reiniciar };
}

function App() {
  const temporizador = useTemporizador(10);
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Temporizador de Cuenta Atrás</h2>
      
      <h1 style={{ 
        fontSize: '80px', 
        margin: '20px',
        color: temporizador.tiempoRestante === 0 ? 'red' : 'black'
      }}>
        {temporizador.tiempoRestante}
      </h1>
      
      <div>
        {!temporizador.activo && temporizador.tiempoRestante > 0 && (
          <button 
            onClick={temporizador.iniciar}
            style={{ padding: '10px 20px', margin: '5px' }}
          >
            Iniciar
          </button>
        )}
        
        {temporizador.activo && (
          <button 
            onClick={temporizador.pausar}
            style={{ padding: '10px 20px', margin: '5px' }}
          >
            Pausar
          </button>
        )}
        
        <button 
          onClick={temporizador.reiniciar}
          style={{ padding: '10px 20px', margin: '5px' }}
        >
          Reiniciar
        </button>
      </div>
      
      {temporizador.tiempoRestante === 0 && (
        <p style={{ color: 'red', fontSize: '24px', marginTop: '20px' }}>
          ⏰ ¡Tiempo agotado!
        </p>
      )}
    </div>
  );
}

export default App;