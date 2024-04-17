import { useState } from 'react'
import './Registro.css'

export default function Registro() {
    const [nombre, setNombre] = useState('')
    const [cargo, setCargo] = useState('')
    const [codigo, setCodigo] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const formData = {
            nombre: nombre,
            cargo: cargo,
            codigo: codigo,
        }

        try{
            const response = await fetch('https://florence-api.up.railway.app/v1/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if(!response.ok){
                throw new Error('No se pudo completar la solicitud')
            }

            const data = await response.json()
            console.log(data)

            if(response.status === 200){
                alert("Registrado correctamente.")
                setNombre('')
                setCargo('')
                setCodigo('')
            }
        }catch(error){
            console.error(error)
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
                        <a href='/Historial' className="menu">
                            <i className='bx bxs-file-doc'></i>
                            <span>Generar historial</span>
                        </a>
                        <a href='/Registro' className="menu active">
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
                    <header>Registrar empleado</header>
                    <div className="body-register">
                        <div className="form-register">
                            <form onSubmit={handleSubmit}>
                                <h3 className="title-register">Por favor, rellene los campos.</h3>
                                <div className="form-group">
                                    <label htmlFor="nombre">Nombre</label>
                                    <input type="text" name="nombre" id="nombre" placeholder='Nombre completo' value={nombre} onChange={(event) => setNombre(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cargo">Cargo</label>
                                    <input type="text" name="cargo" id="cargo" placeholder='Cargo' value={cargo} onChange={(event) => setCargo(event.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="codigo">Código</label>
                                    <input type="text" name="codigo" id="codigo" placeholder='Código de empleado' value={codigo} onChange={(event) => setCodigo(event.target.value)} />
                                </div>
                                <div className="form-btn">
                                    <button type="submit">Registrar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
