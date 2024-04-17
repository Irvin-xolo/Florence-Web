import { useEffect, useState } from 'react'
import './Diagnostico.css'

export default function Diagnostico(){
    const [pacientes, setPacientes] = useState([])
    const [buscar, setBuscar] = useState('')
    const [resultados, setResultados] = useState([])

    const [nombre, setNombre] = useState('');
    const [temperatura, setTemperatura] = useState('')
    const [altura, setAltura] = useState('')
    const [peso, setPeso] = useState('')
    const [presion, setPresion] = useState('')
    const [oxigenacion, setOxigenacion] = useState('')
    const [latidos, setLatidos] = useState('')
    const [respiracion, setRespiracion] = useState('')
    const [observaciones, setObservaciones] = useState('')

    useEffect(() => {
        setResultados(pacientes)
    }, [pacientes])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://florence-api.up.railway.app/v1/pacientes')
                if (!response.ok) {
                    throw new Error('No se pudo obtener los datos del usuario')
                }
                const data = await response.json()
                console.log('Data obtenida:', data);
                const pacientesData = data.rows[0].map(row => ({
                    id: row.id_pacientes,
                    NombreCompleto: row.NombreCompleto
                }));
                setPacientes(pacientesData);
            } catch (error) {
                console.error('Error al obtener los datos: ', error.message)
            }
        }
        fetchData()
    }, [])

    const buscarPaciente = (e) => {
        e.preventDefault()
    
        console.log('Pacientes:', pacientes);
    
        const searchResults = pacientes.filter((paciente) => paciente.NombreCompleto.toLowerCase().includes(buscar.toLowerCase()))
        setResultados(searchResults)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');

        const fecha = `${year}/${month}/${day}`;

        const formData = {
            NombreCompleto: nombre,
            Temperatura: temperatura,
            Altura: altura, 
            Peso: peso, 
            PresionArterial: presion, 
            Oxigenacion: oxigenacion, 
            LatidosPorMinuto: latidos,
            RespiracionPorMinuto: respiracion, 
            FechaHora: fecha, 
            Observaciones: observaciones
        }

        try{
            const response = await fetch('https://florence-api.up.railway.app/v1/diagnostico', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if(!response.ok){
                throw new Error('No se pudo completar la solicitud')
            }

            const data = await response.json();
            console.log('API Response: ', data);

            if(response.status === 200){
                alert("Registrado correctamente.")
                setTemperatura('')
                setAltura('')
                setPeso('')
                setPresion('')
                setOxigenacion('')
                setLatidos('')
                setRespiracion('')
                setObservaciones('')
            }
        }catch(error){
            console.log(nombre)
            console.error('Error al enviar los datos:', error.message);
            alert('Hubo un problema al procesar la solicitud. Por favor, inténtalo de nuevo más tarde.');
        }
    }

    return (
        <>
            <div className="body-diagnostico">
                <div className="registro-diagnostico">
                    <div className="search">
                        <form onSubmit={buscarPaciente}>
                            <input type="text" name="search" id="search" placeholder="Nombre del paciente" value={buscar} onChange={(event) => setBuscar(event.target.value)} />
                            <button type="submit">Buscar</button>
                        </form>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="top">
                            <div className="right">
                                <div className="input">
                                    <label htmlFor="nombre">Nombre completo</label>
                                    <select name="nombre" id="nombre" value={nombre} onChange={(event) => setNombre(event.target.value)}>
                                    {Array.isArray(resultados) && resultados.map((paciente, index) => (
                                        <option key={index} value={paciente.NombreCompleto}>{paciente.NombreCompleto}</option>
                                    ))}
                                    </select>
                                </div>
                                <div className="input">
                                    <label htmlFor="temperatura">Temperatura</label>
                                    <input type="text" name="temperatura" id="temperatura" placeholder="Temperatura" value={temperatura} onChange={(event) => setTemperatura(event.target.value)} />
                                </div>
                                <div className="input">
                                    <label htmlFor="altura">Altura</label>
                                    <input type="text" name="altura" id="altura" placeholder="Altura" value={altura} onChange={(event) => setAltura(event.target.value)} />
                                </div>
                                <div className="input">
                                    <label htmlFor="peso">Peso</label>
                                    <input type="tel" name="peso" id="peso" placeholder="Peso" value={peso} onChange={(event) => setPeso(event.target.value)} />
                                </div>
                                <div className="input">
                                    <label htmlFor="presion_arterial">Presión arterial</label>
                                    <input type="text" name="presion_arterial" id="presion_arterial" placeholder="Presión arterial" value={presion} onChange={(event) => setPresion(event.target.value)} />
                                </div>
                            </div>
                            <div className="left">
                                <div className="input">
                                    <label htmlFor="oxigenacion">Oxigenación</label>
                                    <input type="text" name="oxigenacion" id="oxigenacion" placeholder="Oxigenación" value={oxigenacion} onChange={(event) => setOxigenacion(event.target.value)} />
                                </div>
                                <div className="input">
                                    <label htmlFor="latidos">Latidos por minuto</label>
                                    <input type="text" name="latidos" id="latidos" placeholder="Latidos" value={latidos} onChange={(event) => setLatidos(event.target.value)} />
                                </div>
                                <div className="input">
                                    <label htmlFor="respiracion">Respiración por minuto</label>
                                    <input type="text" name="respiracion" id="respiracion" placeholder="Respiración" value={respiracion} onChange={(event) => setRespiracion(event.target.value)} />
                                </div>
                                <div className="input">
                                    <label htmlFor="observaciones">Observaciones</label>
                                    <textarea name="observaciones" id="observaciones" rows="4" placeholder="Observaciones" value={observaciones} onChange={(event) => setObservaciones(event.target.value)}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="button">
                            <a href="/Dashboard">Regresar</a>
                            <button type="submit">Registrar</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
