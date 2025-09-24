import './scss/reset.scss';
import './scss/app.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './include/Header';
import Main from './components/Main';
import ticketsData from './data/ticket_list.json'; //기본 데이터가 있는 json 파일
import { useEffect, useState } from 'react';

function App() {
  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    //로컬 스토리지에서 'tickets'라는 키의 데이터가 있는지 확인
    const storedTickets = localStorage.getItem('tickets');

    //로컬 스토리지에 데이터가 없으면
    if (!storedTickets) {
      //json 객체를 문자열로 변환
      const ticketsString = JSON.stringify(ticketsData);

      //tickets라는 키로 로컬 스토리지에 저장
      localStorage.setItem('tickets', ticketsString);
    }

    const currentTickets = localStorage.getItem('tickets');
    if (currentTickets) {
      setTickets(JSON.parse(currentTickets));
    }
    console.log("기본 데이터가 로컬 스토리지에 저장되었습니다!");
  }, []); //빈 배열을 넣어 컴포넌트가 처음 랜더링 될 때만 실행되도록 함.

  return (
    <div className="App" id='wrap'>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Main setTickets={setTickets} tickets={tickets} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
