import { useState } from 'react';

function App() {
  const [tareas, setTareas] = useState([]);
  const [texto, setTexto] = useState('');
  const [filtro, setFiltro] = useState('todas'); // todas, completadas, pendientes
  
  function agregarTarea() {
    if (texto.trim() === '') return;
    
    const nuevaTarea = {
      id: Date.now(),
      texto: texto,
      completada: false
    };
    
    setTareas([...tareas, nuevaTarea]);
    setTexto('');
  }
  
  function toggleCompletada(id) {
    setTareas(tareas.map(tarea =>
      tarea.id === id 
        ? { ...tarea, completada: !tarea.completada }
        : tarea
    ));
  }
  
  const tareasFiltradas = tareas.filter(tarea => {
    if (filtro === 'completadas') return tarea.completada;
    if (filtro === 'pendientes') return !tarea.completada;
    return true; // todas
  });
  
  return (
    <div style={{ padding: '20px', maxWidth: '500px' }}>
      <h2>Lista de Tareas</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input 
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nueva tarea..."
          style={{ padding: '8px', width: '70%' }}
        />
        <button 
          onClick={agregarTarea}
          style={{ padding: '8px', marginLeft: '5px' }}
        >
          Añadir
        </button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setFiltro('todas')}
          style={{ 
            padding: '5px 10px', 
            margin: '2px',
            backgroundColor: filtro === 'todas' ? '#007bff' : '#ccc',
            color: filtro === 'todas' ? 'white' : 'black'
          }}
        >
          Todas ({tareas.length})
        </button>
        
        <button 
          onClick={() => setFiltro('pendientes')}
          style={{ 
            padding: '5px 10px', 
            margin: '2px',
            backgroundColor: filtro === 'pendientes' ? '#007bff' : '#ccc',
            color: filtro === 'pendientes' ? 'white' : 'black'
          }}
        >
          Pendientes ({tareas.filter(t => !t.completada).length})
        </button>
        
        <button 
          onClick={() => setFiltro('completadas')}
          style={{ 
            padding: '5px 10px', 
            margin: '2px',
            backgroundColor: filtro === 'completadas' ? '#007bff' : '#ccc',
            color: filtro === 'completadas' ? 'white' : 'black'
          }}
        >
          Completadas ({tareas.filter(t => t.completada).length})
        </button>
      </div>
      
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tareasFiltradas.map(tarea => (
          <li 
            key={tarea.id}
            style={{
              padding: '10px',
              marginBottom: '5px',
              backgroundColor: '#f5f5f5',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}
          >
            <span style={{
              textDecoration: tarea.completada ? 'line-through' : 'none',
              color: tarea.completada ? '#999' : 'black'
            }}>
              {tarea.texto}
            </span>
            
            <button onClick={() => toggleCompletada(tarea.id)}>
              {tarea.completada ? '✅' : '↩️'}
            </button>
          </li>
        ))}
      </ul>
      
      {tareasFiltradas.length === 0 && (
        <p style={{ color: 'gray', textAlign: 'center' }}>
          No hay tareas en esta categoría
        </p>
      )}
    </div>
  );
}

export default App;