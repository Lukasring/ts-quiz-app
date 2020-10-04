import React, { useState, useEffect } from "react";
import {
  fetchQuizQuestions,
  Difficulty,
  QuestionState,
  fetchCategories,
  Category,
} from "./API";
//componenst
import QuestionCard from "./components/QuestionCard";
import { GlobalStyle, Wrapper, SelectWrapper } from "./App.styles";

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
};

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedDifficulty, setSelectedDifficulty] = useState(Difficulty.EASY);

  useEffect(() => {
    setLoading(true);
    const getAllCategories = async () => {
      const categoryData: Category[] = await fetchCategories();
      setCategories(categoryData);
      setLoading(false);
    };
    getAllCategories();
  }, []);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      selectedDifficulty,
      selectedCategory
    );
    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setQuestionNumber(0);
    setLoading(false);
  };

  const checkAnswer = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // user answer
      const answer = event.currentTarget.value;
      // check user asnwer against correct answer
      const correct = questions[questionNumber].correct_answer === answer;
      if (correct) setScore((prev) => prev + 1);

      const answerObject: AnswerObject = {
        question: questions[questionNumber].question,
        answer,
        correct,
        correctAnswer: questions[questionNumber].correct_answer,
      };
      setUserAnswers((prev) => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    const nextQuestion = questionNumber + 1;
    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setQuestionNumber(nextQuestion);
    }
  };

  const selectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(+event.target.value);
  };

  const selectDifficulty = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDifficulty(event.target.value as Difficulty);
  };
  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <h1>REACT QUIZ</h1>
        {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
          <>
            <button className="start" onClick={startTrivia}>
              {questionNumber === TOTAL_QUESTIONS - 1
                ? "Play Again"
                : "Start Game"}
            </button>
            <div style={{ display: "flex", width: "100%" }}>
              <SelectWrapper>
                <label>Category</label>
                <select onChange={selectCategory} value={selectedCategory}>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </SelectWrapper>
              <SelectWrapper>
                <label>Difficulty</label>
                <select onChange={selectDifficulty} value={selectedDifficulty}>
                  <option value={Difficulty.EASY}>{Difficulty.EASY}</option>
                  <option value={Difficulty.MEDIUM}>{Difficulty.MEDIUM}</option>
                  <option value={Difficulty.HARD}>{Difficulty.HARD}</option>
                </select>
              </SelectWrapper>
            </div>
          </>
        ) : null}
        {!gameOver && <p className="score">Score: {score}</p>}
        {loading && <p>Loading questions</p>}
        {!loading && !gameOver && (
          <QuestionCard
            questionNumber={questionNumber + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[questionNumber].question}
            answers={questions[questionNumber].answers}
            userAnswer={userAnswers ? userAnswers[questionNumber] : null}
            callback={checkAnswer}
          ></QuestionCard>
        )}

        {!loading &&
          !gameOver &&
          userAnswers.length === questionNumber + 1 &&
          questionNumber !== TOTAL_QUESTIONS - 1 && (
            <button className="next" onClick={nextQuestion}>
              Next Question
            </button>
          )}
      </Wrapper>
    </>
  );
};

export default App;
