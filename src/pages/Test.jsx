import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';

import _ from 'lodash';
import { isAuthenticated, isTestCompleted } from '../utils/authService';

function Test({}) {
  const [question, setQuestion] = useState({});
  const [open, setOpen] = useState(false);

  const [randomQuestions, setRandomQuestions] = useState([]);
  const [results, setResults] = useState(Array(10).fill(null));
  const [count, setCount] = useState(0); // Changed initial count to 0
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [notes, setNotes] = useState(''); // State to hold notes
  const navigate = useNavigate();
  const location = useLocation();
  const auth = isAuthenticated();
  const testCompleted = isTestCompleted();

  // useEffect(() => {
  //   if(localStorage.getItem('isTestCompleted')==='true'){
  //     navigate('/results')
  //     console.log(isTestCompleted)
  //   }
  // }, [navigate]);

  const category = location.state?.category.toLowerCase() || 'physics';
  console.log('category:', category);

  useEffect(() => {
    const fetchQuestions = async (category) => {
      try {
        const response = await fetch('questions.json');
        const data = await response.json();
        const filteredQuestions = data.filter(
          (question) => question.category === category
        );
        const shuffledQuestions = _.shuffle(filteredQuestions); // Shuffle using Lodash
        const selectedQuestions = _.slice(shuffledQuestions, 0, 10); // Get first 10 questions
        setRandomQuestions(selectedQuestions);
        setQuestion(selectedQuestions[0]); // Set the first question initially
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions(category);
  }, [category]);
  

  useEffect(() => {
    console.log(randomQuestions); // Log randomQuestions whenever it changes
    console.log(question);
    console.log(selectedAnswer); // Log selectedAnswer whenever it changes
  }, [randomQuestions, question, selectedAnswer]);

  const handleNextQuestion = (skipped = false) => {
    const isCorrect = skipped
      ? null
      : selectedAnswer === question.correct_option;
    const newResults = [...results];
    newResults[count] = isCorrect;
    setResults(newResults);

    if (count >= 9) {
      console.log(newResults);
      setOpen(true);
      // navigate('/results', { state: { results: newResults, notes: notes } }); // Pass updated results and notes as state
      return;
    }

    if (count < 9) {
      setResults(newResults);
      setCount(count + 1);
      setQuestion(randomQuestions[count + 1]);
      setSelectedAnswer(null);
    }
  };

  const handlePrevQuestion = () => {
    if (count > 0) {
      setCount(count - 1);
      setQuestion(randomQuestions[count - 1]); // Ensure to use the updated count here
      setSelectedAnswer(results[count - 1]); // Reset selected answer to the previous one
    }
  };

  const handleSubmit = () => {
    const newResults = [...results];
    const isCorrect = selectedAnswer === question.correct_option;
    newResults[count] = isCorrect;
    setResults(newResults);
    localStorage.setItem('isTestCompleted', 'true');
    navigate('/results', { state: { results: newResults, notes: notes } });
  };

  const handleOptionSelect = (event) => {
    setSelectedAnswer(parseInt(event.target.value)); // Ensure value is parsed to integer if needed
  };
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds (5 * 60)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          clearInterval(timer);
          const isCorrect = null;
          if (selectedAnswer !== null) {
            isCorrect = selectedAnswer === question.correct_option;
          }
          const newResults = [...results];
          newResults[count] = isCorrect;
          localStorage.setItem('isTestCompleted', 'true');
          navigate('/results', {
            state: { results: newResults, notes: notes },
          });

          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [count, results, notes]);
  // Empty dependency array to run effect only once on mount

  // Format time into mm:ss
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;

  return (
    <>
      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
            >
              <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationTriangleIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-red-600"
                    />
                  </div>
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      className="text-base font-semibold leading-6 text-gray-900"
                    >
                      Submit
                    </DialogTitle>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500">
                        Are you sure you want to submit the test? This action
                        cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={() => {
                    handleSubmit();
                    setOpen(false);
                  }}
                  className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                >
                  Submit
                </button>
                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>

      <div className="bg-[#f8f8f8] h-screen w-full font-roboto overflow-hidden">
        <Navbar />
        <div className="w-full font-bold text-3xl text-textGrey flex py-3 justify-center">
          {formattedTime}
        </div>
        <div className="h-full flex w-full">
          <div className="flex flex-col w-1/2 text-left px-10 gap-5">
            <div className="flex w-full justify-between items-center">
              <p className="text-md text-gray-600">
                Question {count + 1} of 10
              </p>
              <button
                onClick={() => setSelectedAnswer(null)}
                className="text-blue-500"
              >
                Clear Selection
              </button>
            </div>

            <p className="text-md text-textGrey font-semibold text-xl ">
              {question.question}
            </p>
            {question.options &&
              question.options.map((option) => (
                <div key={option.id} className="mb-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="answer"
                      value={option.id}
                      checked={selectedAnswer === option.id} // Check if selectedAnswer matches option.id
                      onChange={handleOptionSelect}
                      className="mr-2"
                    />
                    {option.value}
                  </label>
                </div>
              ))}

            <div className="w-full gap-5 flex items-center justify-start">
              {count > 0 ? (
                <button
                  onClick={handlePrevQuestion}
                  className="border-blue-500 border-2 text-blue-500 w-1/3 py-2 rounded-md hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Previous Question
                </button>
              ) : (
                <button
                  onClick={handlePrevQuestion}
                  className="border-blue-500 border-2 text-blue-500 w-1/3 py-2 rounded-md hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                  Go Back
                </button>
              )}

              {/* <div className="relative">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-40 bg-white border-gray-300 border-2 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your notes here..."
                />
                <p className="absolute bottom-2 right-2 text-sm text-gray-500">
                  {notes.length}/1000 characters
                </p>
              </div> */}

              <>
                {selectedAnswer !== null ? (
                  <button
                    onClick={() => handleNextQuestion(false)} // Not skipped
                    className="bg-blue-500 border-2 border-blue-500 text-white w-1/3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {count >= 9 ? 'Submit' : 'Next Question'}
                  </button>
                ) : (
                  <button
                    onClick={() => handleNextQuestion(true)} // Skipped
                    className="bg-blue-500 border-2 border-blue-500 text-white w-1/3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                  >
                    {count >= 9 ? 'Submit' : 'Skip Question'}
                  </button>
                )}
              </>
            </div>
          </div>
          <div className="flex flex-col w-1/2 items-center">
            <div className="w-2/3 flex flex-col rounded-md h-[23rem] bg-white">
              <p className="h-[15%] border-b-[1px] border-gray-200 text-gray-600 p-4 w-full h-">
                Notepad
              </p>
              <textarea
                name=""
                id="note"
                placeholder="Scribble Here..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-full bg-white  rounded-md p-4 focus:outline-none  focus:border-transparent"
              ></textarea>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Test;
