import { Routes, Route } from 'react-router-dom'
import LoginPersonal from './views/LoginPersonal/Login'
import Dashboard from './views/Dashboard/Dashboard'
import LoginPaciente from './views/Pacientes/LoginPaciente'
import Diagnostico from './views/Diagnostico/Diagnostico'
import Buscar from './views/Buscar/Buscar'
import Historial from './views/Historial/Historial'
import Registro from './views/Registro/Registro'

function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPersonal />}></Route>
      <Route path='/Dashboard' element={<Dashboard />}></Route>
      <Route path='/Paciente' element={<LoginPaciente />}></Route>
      <Route path='/Diagnostico' element={<Diagnostico />}></Route>
      <Route path='/Buscar' element={<Buscar />}></Route>
      <Route path='/Historial' element={<Historial />}></Route>
      <Route path='/Registro' element={<Registro />}></Route>
    </Routes>
  )
}

export default App
