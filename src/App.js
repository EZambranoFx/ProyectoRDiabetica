import React, { useState } from 'react';
import './App.css';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    operario: '',
    paciente: '',
    cedula: '',
    telefono: '',
    correo: '',
  });
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    const { operario, paciente, cedula, telefono, correo } = formData;

    if (!operario || !paciente || !cedula || !telefono || !correo) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleAnalyze = () => {
    if (!image) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    setResult('Análisis completado: Grado leve de retinopatía.');
  };

  const handleGenerateReport = () => {
    alert('Función "Generar Reporte" en desarrollo.');
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Análisis de Retinopatía Diabética</h1>
      </header>

      <main className="App-main">
        {step === 1 && (
          <div className="form-container">
            <h2>Datos del Operario y del Paciente</h2>
            <div className="form-group">
              <label>Operario:</label>
              <input
                type="text"
                name="operario"
                value={formData.operario}
                onChange={handleChange}
                placeholder="Ingresa el nombre del operario"
              />
            </div>
            <div className="form-group">
              <label>Nombre del Paciente:</label>
              <input
                type="text"
                name="paciente"
                value={formData.paciente}
                onChange={handleChange}
                placeholder="Ingresa el nombre del paciente"
              />
            </div>
            <div className="form-group">
              <label>Cédula:</label>
              <input
                type="text"
                name="cedula"
                value={formData.cedula}
                onChange={handleChange}
                placeholder="Ingresa la cédula"
              />
            </div>
            <div className="form-group">
              <label>Número de Teléfono:</label>
              <input
                type="tel"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                placeholder="Ingresa el número de teléfono"
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico:</label>
              <input
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                placeholder="Ingresa el correo electrónico"
              />
            </div>
            <button onClick={handleNext} className="primary-button">Siguiente</button>
          </div>
        )}

        {step === 2 && (
          <div className="form-container">
            <h2>Subir y Analizar Imagen</h2>
            <div className="form-group">
              <label>Cargar Imagen:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            {image && (
              <div className="image-preview">
                <img src={image} alt="Imagen seleccionada" className="preview-image" />
              </div>
            )}

            <div className="button-group">
              <button onClick={handleAnalyze} className="primary-button">Analizar Imagen</button>
              <button onClick={handleGenerateReport} className="secondary-button">Generar Reporte</button>
            </div>

            {result && (
              <div className="result">
                <h2>Resultado del Análisis:</h2>
                <p>{result}</p>
              </div>
            )}
            {
              <button onClick={handleBack} className="secondary-button back-button">Regresar</button>
            }
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2025 ESPOL</p>
      </footer>
    </div>
  );
}

export default App;
