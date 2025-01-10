import React, { useState } from 'react';
import './App.css';

function App() {
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = () => {
    if (!email || !image) {
      alert('Por favor, ingresa un correo y selecciona una imagen.');
      return;
    }

    // Simulando resultado del análisis
    setResult('Análisis completado: Grado leve de retinopatía.');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Análisis de Retinopatía Diabética</h1>
      </header>

      <main className="App-main">
        <div className="form-container">
          <div className="form-group">
            <label>Correo Electrónico:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Ingresa tu correo"
            />
          </div>

          <div className="form-group">
            <label>Cargar Imagen:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          {image && (
            <div className="image-preview">
              <img src={image} alt="Imagen seleccionada" className="preview-image" />
            </div>
          )}


          <button className="analyze-btn" onClick={handleAnalyze}>Analizar Imagen</button>

          {result && (
            <div className="result">
              <h2>Resultado del Análisis:</h2>
              <p>{result}</p>
            </div>
          )}
        </div>
      </main>

      <footer className="App-footer">
        <p>© 2025 Análisis de Retinopatía Diabética</p>
      </footer>
    </div>
  );
}

export default App;
