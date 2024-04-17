import { useState } from 'react'
import * as XLSX from 'xlsx'

export default function Historial() {
    const [buscar, setBuscar] = useState('')
    const [paciente, setPaciente] = useState(null)
    const [diagnosticos, setDiagnosticos] = useState([])
    const [diagnosticoVisibles, setDiagnosticoVisibles] = useState([])

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            const response = await fetch(`https://florence-api.up.railway.app/v1/pacientes/nombre/${buscar}`)
            const data = await response.json()

            if (data.rows && data.rows.length > 0) {
                const pacienteData = data.rows[0][0]
                const diagnosticosData = data.rows[1].slice(0)
                setPaciente(pacienteData)
                setDiagnosticos(diagnosticosData)
                console.log(diagnosticosData)
            } else {
                setPaciente(null)
                setDiagnosticos([])
            }
        } catch (error) {
            console.error(error)
        }
    }

    const toggleDiagnostico = (index) => {
        setDiagnosticoVisibles((prevVisibles) => {
            const newVisibles = [...prevVisibles];
            newVisibles[index] = !newVisibles[index];
            return newVisibles;
        });
    }

    const excel = (paciente, diagnostico) => {
        try {
            const file = XLSX.readFile('./plantilla_diagnostico.xlsx');
            const sheetName = file.SheetNames[0];
            const ws = file.Sheets[sheetName];

            ws['F28'] = { t: 's', v: diagnostico.Temperatura };

            const newBook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(newBook, ws, sheetName);

            XLSX.writeFile(newBook, 'historial.xlsx');
        } catch (error) {
            console.error('Error al generar el historial:', error);
        }
    }

    return (
        <>
            <div className="body-buscar">
                <aside>
                    <div className="head">
                        <div className="logo">
                            <img src="/src/assets/images/Enfermera.png" alt="logo" />
                            <h2 className="logo-title">Florence</h2>
                        </div>
                    </div>
                    <div className="nav">
                        <a href='/Dashboard' className="menu">
                            <i className="bx bx-pie-chart-alt"></i>
                            <span>Dashboard</span>
                        </a>
                        <a href='/Paciente' className="menu">
                            <i className='bx bxs-user-plus'></i>
                            <span>Registrar paciente</span>
                        </a>
                        <a href='/Diagnostico' className="menu">
                            <i className='bx bx-plus-medical'></i>
                            <span>Registrar diágnostico</span>
                        </a>
                        <a href='/Buscar' className="menu">
                            <i className='bx bx-search-alt' ></i>
                            <span>Buscar paciente</span>
                        </a>
                        <a href='/Historial' className="menu active">
                            <i className='bx bxs-file-doc'></i>
                            <span>Generar historial</span>
                        </a>
                        <a href='/Registro' className="menu">
                            <i className='bx bxs-save'></i>
                            <span>Registrar empleado</span>
                        </a>
                        <a href='https://expo.dev/artifacts/eas/fyMZDpZ7W1it5mYEUEawVz.apk' className="menu">
                            <i className='bx bxs-download'></i>
                            <span>Descargar APP</span>
                        </a>
                    </div>
                    <div className="foot">
                        <div className="menu menu-logout">
                            <i className="bx bx-log-out"></i>
                            <span>Salir</span>
                        </div>
                    </div>
                </aside>
                <main>
                    <header>Generar Historial</header>
                    <div className="buscar-paciente">
                        <div className="buscar-nombre">
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="nombre_buscar" id="nombre_buscar" placeholder='Nombre del paciente' value={buscar} onChange={(event) => setBuscar(event.target.value)} />
                                <button type="submit">Buscar</button>
                            </form>
                        </div>
                        <div className="datos-paciente">
                        {paciente && diagnosticos && diagnosticos.length > 0 ? (
                            diagnosticos.map((diagnostico, index) => (
                                <div key={index} className="card-diagnostico">
                                    <div className="datos-diagnostico">
                                        <div className="checkbox-custom" onClick={() => toggleDiagnostico(index)}>
                                            <span className={`checkbox-icon ${diagnosticoVisibles[index] ? 'checked' : ''}`} />
                                            <label htmlFor={`diagnostico-${index}`}>
                                                <h3>Diagnóstico {index + 1}</h3>
                                                <i className={`bx ${diagnosticoVisibles[index] ? 'bx-chevron-up' : 'bx-chevron-down'} arrow`} />
                                            </label>
                                        </div>
                                        {diagnosticoVisibles[index] && (
                                            <div className="content-diagnostico">
                                                <div className="right">
                                                    <p>Temperatura</p>
                                                    <input type="text" name="temperatura" value={diagnostico.Temperatura} disabled />
                                                    <p>Altura</p>
                                                    <input type="text" name="altura" value={diagnostico.Altura} disabled />
                                                    <p>Peso</p>
                                                    <input type="text" name="peso" value={diagnostico.Peso} disabled />
                                                    <p>Presión arterial</p>
                                                    <input type="text" name="presion" value={diagnostico.PresionArterial} disabled />
                                                    <p>Oxigenación</p>
                                                    <input type="text" name="oxigenacion" value={diagnostico.Oxigenacion} disabled />
                                                    <p>Latidos por minuto</p>
                                                    <input type="text" name="latidos" value={diagnostico.LatidosPorMinuto} disabled />
                                                </div>
                                                <div className="left">
                                                    <p>Respiración por minuto</p>
                                                    <input type="text" name="respiracion" value={diagnostico.RespiracionPorMinuto} disabled />
                                                    <p>Fecha</p>
                                                    <input type="text" name="fecha" value={diagnostico.FechaHora.slice(0, 10)} disabled />
                                                    <p>Observaciones</p>
                                                    <input type="text" name="observaciones" value={diagnostico.Observaciones} disabled />
                                                    <p>Alergias</p>
                                                    <input type="text" name="alergias" value={paciente.Alergias} disabled />
                                                    <p>Discapacidades</p>
                                                    <input type="text" name="discapacidades" value={paciente.Discapacidad} disabled />
                                                    <p>Diabetes</p>
                                                    <input type="text" name="diabetes" value={paciente.Diabetes} disabled />
                                                </div>
                                            </div>
                                        )}
                                        <div className="btn-download">
                                            <button style={{ paddingInline: 40, paddingBlock: 10, fontSize: 14, border: "none", background: "#1e1e1e", color: "#fff", cursor: "pointer", marginTop: 15 }} onClick={() => excel(paciente, diagnostico)}>Descargar historial</button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p style={{ marginLeft: 20 }}>No se encontró ningún diagnóstico para el paciente.</p>
                        )}
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
