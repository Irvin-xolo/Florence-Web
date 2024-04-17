import './Login.css'

export default function Login(){
    return(
        <>
            <div className="container">
                <div className="content">
                    <div className="right">
                        <img src="/src/assets/images/Enfermera.png" alt="" />
                    </div>
                    <div className="left">
                        <form action="">
                            <div className="form-info">
                                <p className='title'>Login</p>
                                <p className='parrafo'>Por favor, ingresa tu código de acceso.</p>
                                <div className="input">
                                    <label htmlFor="codigo">Código</label>
                                    <input type="password" name="codigo" id="codigo" placeholder='Código de acceso' />
                                    <div className="button">
                                        <button><a href="/Login">Continuar</a></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
