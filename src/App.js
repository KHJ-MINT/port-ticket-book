import './scss/reset.scss';
import './scss/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './include/Header';
import Main from './components/Main';

function App() {
  return (
    <div className="App" id='wrap'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
