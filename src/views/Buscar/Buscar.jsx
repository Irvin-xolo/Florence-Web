import { useState } from 'react'
import './Buscar.css'

export default function Buscar() {
    const [buscar, setBuscar] = useState('')
    const [paciente, setPaciente] = useState(null)
    const [diagnosticoVisible, setDiagnosticoVisible] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()

        try{
            const response = await fetch(`https://florence-api.up.railway.app/v1/pacientes/paciente/${buscar}`)
            const data = await response.json()

            if(data.rows && data.rows.length > 0){
                const find = data.rows[0][0]
                setPaciente(find)
            }else{
                setPaciente(null)
            }
        }catch(error){
            console.error(error)
        }
    }

    const toggleDiagnostico = () => {
        setDiagnosticoVisible(!diagnosticoVisible)
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
                        <a href='/Buscar' className="menu active">
                            <i className='bx bx-search-alt' ></i>
                            <span>Buscar paciente</span>
                        </a>
                        <a href='/Historial' className="menu">
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
                    <header>Buscar paciente</header>
                    <div className="buscar-paciente">
                        <div className="buscar-nombre">
                            <form onSubmit={handleSubmit}>
                                <input type="text" name="nombre_buscar" id="nombre_buscar" placeholder='Nombre del paciente' value={buscar} onChange={(event) => setBuscar(event.target.value)} />
                                <button type="submit">Buscar</button>
                            </form>
                        </div>
                        <div className="datos-paciente">
                            <div className="content-paciente">
                                {paciente ? (
                                    <>
                                        <div className="right">
                                            <p>Nombre</p>
                                            <input type="text" name="name-buscar" id="name-buscar" value={paciente.NombreCompleto} disabled />
                                            <p>Fecha de nacimiento</p>
                                            <input type="text" name="nacimiento-buscar" id="nacimiento-buscar" value={paciente.FechaNacimiento ? paciente.FechaNacimiento.substring(0, 10) : ""} disabled />
                                            <p>Número de seguro social</p>
                                            <input type="text" name="seguro-buscar" id="seguro-buscar" value={paciente.NumSeguroSoc} disabled />
                                            <p>Teléfono</p>
                                            <input type="text" name="telefono" id="telefono" value={paciente.Telefono} disabled />
                                            <p>E-mail</p>
                                            <input type="text" name="email" id="email" value={paciente.Email} disabled />
                                        </div>
                                        <div className="left">
                                            <p>Nombre de contacto de emergencia</p>
                                            <input type="text" name="contacto-emergencia" id="contacto-emergencia" value={paciente.ContactoEmergenciaNombre} disabled />
                                            <p>Teléfono de contacto de emergencia</p>
                                            <input type="text" name="numero-emergencia" id="numero-emergencia" value={paciente.ContactoEmergenciaTelefono} disabled />
                                            <p>Alergias</p>
                                            <input type="text" name="alergias" id="alergias" value={paciente.Alergias} disabled />
                                            <p>Diabetes</p>
                                            <input type="text" name="diabetes" id="diabetes" value={paciente.Diabetes} disabled />
                                            <p>Discapacidad</p>
                                            <input type="text" name="discapacidad" id="discapacidad" value={paciente.Discapacidad} disabled />
                                        </div>
                                    </>
                                ): (
                                    <p>No se encontró ningún paciente.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
