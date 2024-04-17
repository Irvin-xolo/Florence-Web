import { useState } from 'react';
import './Dashboard.css'

export default function Dashboard(){
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        '0.png',
        '1.png',
        '2.png'
    ];

    const prevImage = () => {
        const newIndex = (currentImageIndex - 1 + images.length) % images.length;
        setCurrentImageIndex(newIndex);
    };

    const nextImage = () => {
        const newIndex = (currentImageIndex + 1) % images.length;
        setCurrentImageIndex(newIndex);
    };

    const handleLogout = () => {
        fetch('https://florence-api.up.railway.app/v1/auth/logout', {
            method: 'POST',
            credentials: 'omit'
        })
        .then((response) => {
            if(response.ok){
                window.location.href = '/'
            }else{
                console.log(response)
            }
        })
        .catch((error) => {
            console.error('Error al realizar el logout: ', error)
        })
    }
    return (
        <>
            <div className="body-dashboard">
                <aside>
                    <div className="head">
                        <div className="logo">
                            <img src="/src/assets/images/logo-empresa.jpg" alt="logo" />
                            <h2 className="logo-title">Florence</h2>
                        </div>
                    </div>
                    <div className="nav">
                        <a href='/Dashboard' className="menu active">
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
                        <div className="menu menu-logout" onClick={handleLogout}>
                            <i className="bx bx-log-out"></i>
                            <span>Salir</span>
                        </div>
                    </div>
                </aside>
                <main>
                    <header>Bienvenid@ a Florence</header>
                    <div className="carousel">
                        <img src={`/src/assets/Imgs/${images[currentImageIndex]}`} alt={`Imagen ${currentImageIndex + 1}`} />
                        <div className="btn-carrusel">
                            <button onClick={prevImage}>Anterior</button>
                            <button onClick={nextImage}>Siguiente</button>
                        </div>
                    </div>
                </main>
            </div>
        </>
    )
}
