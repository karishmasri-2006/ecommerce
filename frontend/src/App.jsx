import { BrowserRouter, Routes, Route } from 'react-router-dom'
import home from './pages/home'  // lowercase import

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />  // lowercase component
      </Routes>
    </BrowserRouter>
  )
}

export default App