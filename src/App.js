import axios from 'axios';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import Home from './Pages/Home/Home';
import Quiz from './Pages/Quiz/Quiz';
import Result from './Pages/Results/Results';

function App() {
  const [questions, setQuestions] = useState();
  const [name, setName] = useState();
  const [score, setScore] = useState(0);
  const fetchQuestions = async (category = "", difficulty = "") => {
    const { data } = await axios.get(
      `https://opentdb.com/api.php?amount=10${
        category && `&category=${category}`
      }${difficulty && `&difficulty=${difficulty}`}&type=multiple`
    );
    setQuestions(data.results);
  };
  return (
    <>
      <div className="app" style={{ backgroundImage: 'url("/quiz.jpg")' }}>
        <Header/>
        <Routes>
          <Route path='/' element={<Home name={name} setName={setName} fetchQuestions={fetchQuestions}/>}/>
          <Route path='/quiz' element={<Quiz name={name} questions={questions} score={score} setQuestions={setQuestions} setScore={setScore}/>}/>
          <Route path='/result' element={<Result score={score} name={name} />}/>
        </Routes>
      </div>
      <Footer/>
    </>
  );
}

export default App;
