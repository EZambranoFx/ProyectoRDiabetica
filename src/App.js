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
  const [imageFile, setImageFile] = useState(null);   // Archivo real
  const [imagePreview, setImagePreview] = useState(null); // URL para previsualizar

  // Estados para mostrar resultado en el modal:
  const [predictedClass, setPredictedClass] = useState(null);
  const [predictedLabel, setPredictedLabel] = useState('');
  const [probabilities, setProbabilities] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Mapeo de clase => descripción
  const labelMap = {
    0: 'Sin retinopatía diabética',
    1: 'Leve',
    2: 'Moderada',
    3: 'Severa',
    4: 'Retinopatía diabética proliferativa',
  };

  // Manejo de formulario (Paso 1)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
    // Limpiamos estados de resultado
    setPredictedClass(null);
    setPredictedLabel('');
    setProbabilities([]);
  };

  // Manejo de imagen (Paso 2)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  // Llamada a la API Flask
  const handleAnalyze = async () => {
    if (!imageFile) {
      alert('Por favor, selecciona una imagen.');
      return;
    }

    // FormData para envío multipart
    const formDataToSend = new FormData();
    formDataToSend.append('file', imageFile);

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        const errorData = await response.json();
        alert('Error al procesar la imagen: ' + errorData.error);
        return;
      }

      const data = await response.json();
      // Estructura esperada: { predicted_class: number, predictions: number[] }
      const cls = data.predicted_class;
      const probs = data.predictions;

      // Seteamos estados para el modal
      setPredictedClass(cls);
      setPredictedLabel(labelMap[cls] ?? 'Desconocido');
      setProbabilities(probs);

      // Mostramos modal
      setShowModal(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Ocurrió un error al analizar la imagen.');
    }
  };

  const handleGenerateReport = () => {
    alert('Función de "Generar Reporte" en desarrollo.');
  };

  // Cierra el modal
  const handleCloseModal = () => {
    setShowModal(false);
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
            <button onClick={handleNext} className="primary-button">
              Siguiente
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="form-container">
            <h2>Subir y Analizar Imagen</h2>
            <div className="form-group">
              <label>Cargar Imagen:</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />
            </div>

            {imagePreview && (
              <div className="image-preview">
                <img src={imagePreview} alt="Vista previa" className="preview-image" />
              </div>
            )}

            <div className="button-group">
              <button onClick={handleAnalyze} className="primary-button">
                Analizar Imagen
              </button>
              <button onClick={handleGenerateReport} className="secondary-button">
                Generar Reporte
              </button>
            </div>

            <button onClick={handleBack} className="secondary-button back-button">
              Regresar
            </button>
          </div>
        )}
      </main>

      <footer className="App-footer">
        <p>© 2025 ESPOL</p>
      </footer>

      {/* MODAL para mostrar resultados */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Resultado del Análisis</h2>
            <p>
              Clase Predicha: <strong>{predictedClass}</strong> (
              <strong>{predictedLabel}</strong>)
            </p>
            <hr />
            <table className="prob-table">
              <thead>
                <tr>
                  <th>Clase</th>
                  <th>Probabilidad</th>
                </tr>
              </thead>
              <tbody>
                {probabilities.map((prob, idx) => (
                  <tr key={idx}>
                    <td>{idx}</td>
                    <td>{prob.toFixed(4)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button onClick={handleCloseModal} className="close-button">
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;