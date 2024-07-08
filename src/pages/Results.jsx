import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { RadialBarChart, RadialBar, Legend } from 'recharts';
import { useLocation, useNavigate } from 'react-router-dom';

// Reusable RadialBarChart component
const CustomRadialBarChart = ({ data }) => (
  <div className="relative w-fit flex flex-col">
    <RadialBarChart
      width={200}
      height={150}
      data={data}
      innerRadius="50"
      outerRadius="70"
      startAngle={90}
      endAngle={-270}
      paddingAngle={2}
    >
      <RadialBar minAngle={15} dataKey="x" background={true} clockWise={true} />
      {/* <Legend
        iconSize={0}
        width={50}
        height={50}
        layout="vertical"
        verticalAlign="middle"
        align="center"
      /> */}
    </RadialBarChart>
  </div>
);

function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  const results = location.state?.results || [];
  const notes = location.state?.notes || '';

  const [graphData, setGraphData] = useState({
    correct: 0,
    wrong: 0,
    skipped: 0,
  });
  

  useEffect(() => {
    console.log('new results:', results);
    console.log('new notes:', notes);
    const counts = results.reduce(
      (acc, result) => {
        if (result === null) {
          acc.skipped += 1;
        } else if (result === true) {
          acc.correct += 1;
        } else if (result === false) {
          acc.wrong += 1;
        }
        return acc;
      },
      { correct: 0, wrong: 0, skipped: 0 }
    );
    setGraphData(counts);
  }, [results]);

  return (
    <>
      <div className="bg-[#f8f8f8] h-screen w-full font-roboto overflow-hidden">
        <Navbar />
        <div className="relative h-full flex flex-col w-full items-center">
          <div className="relative top-[2vh] w-2/3 flex flex-col bg-white h-fit rounded-xl p-10">
            <div className="w-full flex items-center justify-center">
              <div className="w-1/4 h-[40%] flex flex-col items-start">
                <p className="text-md text-gray-500 mb-3">
                  Score:{' '}
                  <span className="text-xl text-grey-500 font-semibold">
                    {graphData.correct - graphData.wrong}
                  </span>
                  /100
                </p>
                <p className="text-md text-gray-500 mb-3">Time Taken: 04:20</p>
                <p className="text-4xl text-blue-600 font-bold">
                  {((graphData.correct - graphData.wrong) / 10) * 100 < 1
                    ? 0
                    : ((graphData.correct - graphData.wrong) / 10) * 100}
                  %
                </p>
                <p className="text-lg text-blue-600 font-semibold">
                  Total Score
                </p>
              </div>
              <div className="w-3/4 h-2/3 flex justify-center items-center">
                <div className="relative w-fit flex flex-col items-center ">
                  <p className="absolute text-blue-500 text-xl top-[3.5rem]">
                    {((graphData.correct - graphData.wrong) / 10) * 100 < 1
                      ? 0
                      : ((graphData.correct - graphData.wrong) / 10) * 100}
                    %
                  </p>
                  <CustomRadialBarChart
                    data={[
                      {
                        name: `${
                          ((graphData.correct - graphData.wrong) / 10) * 100
                        }%`,
                        x: ((graphData.correct - graphData.wrong) / 10) * 100,
                        fill: '#007DEA',
                      },
                      { x: 100, fill: 'white' },
                    ]}
                  />
                  <p className="text-center text-md text-gray-500">
                    Final Score
                  </p>
                </div>
                <div className="relative w-fit flex flex-col items-center">
                  <p className="absolute text-blue-500 text-xl top-[3.5rem]">
                    {graphData.correct}
                  </p>

                  <CustomRadialBarChart
                    data={[
                      { name: 'A', x: graphData.correct, fill: '#007DEA' },
                      { name: 'max', x: 10, fill: 'white' },
                    ]}
                  />
                  <p className="text-center text-md text-gray-500">Correct</p>
                </div>
                <div className="relative w-fit flex flex-col items-center">
                  <p className="absolute text-blue-500 text-xl top-[3.5rem]">
                    {graphData.wrong}
                  </p>

                  <CustomRadialBarChart
                    data={[
                      { name: 'A', x: graphData.wrong, fill: '#007DEA' },
                      { name: 'max', x: 10, fill: 'white' },
                    ]}
                  />
                  <p className="text-center text-md text-gray-500">Wrong</p>
                </div>
                <div className="relative w-fit flex flex-col items-center">
                  <p className="absolute text-blue-500 text-xl top-[3.5rem]">
                    {graphData.skipped}
                  </p>

                  <CustomRadialBarChart
                    data={[
                      { name: 'A', x: graphData.skipped, fill: '#007DEA' },
                      { name: 'max', x: 10, fill: 'white' },
                    ]}
                  />
                  <p className="text-center text-md text-gray-500">Skipped</p>
                </div>
              </div>
            </div>
            <div className=" justify-center items-center  mt-7 w-full flex flex-col   h-[13rem] ">
              <div className="w-full h-[9rem] rounded-md border-[1.5px] border-gray-300 p-5 overflow-auto">
                <p className="text-xl text-textGrey font-semibold mb-2">
                  Your scribbled notes:
                </p>
                <p className="text-sm text-gray-500 font-normal break-words">
                  {notes}
                </p>
              </div>
              <button
                onClick={() => {
                  localStorage.removeItem('isAuthenticated');
                  localStorage.removeItem('isTestCompleted');
                  navigate('/');
                }}
                className="border-blue-500 border-2 text-blue-500 w-[13rem] py-2 rounded-md hover:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-3"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default Results;
