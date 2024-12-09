import { BrowserRouter, Routes, Route } from 'react-router';
import Root from './components/Root';
import Chat from './components/Chat';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Root />} />
          <Route path='/chat' element={<Chat />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}