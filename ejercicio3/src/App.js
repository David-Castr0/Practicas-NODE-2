import { createContext, useContext, useState } from 'react';

const TemaContext = createContext();

function ProveedorTema({ children }) {
  const [tema, setTema] = useState('claro');
  
  const cambiarTema = () => {
    setTema(tema === 'claro' ? 'oscuro' : 'claro');
  };
  
  return (
    <TemaContext.Provider value={{ tema, cambiarTema }}>
      {children}
    </TemaContext.Provider>
  );
}


function Header() {
  const { tema } = useContext(TemaContext);
  
  return (
    <header style={{
      padding: '20px',
      backgroundColor: tema === 'claro' ? '#f0f0f0' : '#333',
      color: tema === 'claro' ? 'black' : 'white'
    }}>
      <h1>Mi Aplicación</h1>
    </header>
  );
}


function Contenido() {
  const { tema } = useContext(TemaContext);
  
  return (
    <main style={{
      padding: '20px',
      minHeight: '300px',
      backgroundColor: tema === 'claro' ? 'white' : '#222',
      color: tema === 'claro' ? 'black' : 'white'
    }}>
      <p>Este es el contenido principal de la aplicación.</p>
      <p>El tema cambia automáticamente en todos los componentes.</p>
    </main>
  );
}

function BotonTema() {
  const { tema, cambiarTema } = useContext(TemaContext);
  
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <button 
        onClick={cambiarTema}
        style={{
          padding: '10px 20px',
          fontSize: '16px',
          backgroundColor: tema === 'claro' ? '#333' : '#f0f0f0',
          color: tema === 'claro' ? 'white' : 'black',
          border: 'none',
          cursor: 'pointer'
        }}
      >
        Cambiar a tema {tema === 'claro' ? 'oscuro' : 'claro'}
      </button>
    </div>
  );
}

function App() {
  return (
    <ProveedorTema>
      <Header />
      <Contenido />
      <BotonTema />
    </ProveedorTema>
  );
}

export default App;