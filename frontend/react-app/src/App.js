import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Survey from './components/Survey'

function App() {

  return (
    <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/survey/:questionnaireID' element={<Survey />} />
        </Routes>
    </Router> 
  )
}

export default App