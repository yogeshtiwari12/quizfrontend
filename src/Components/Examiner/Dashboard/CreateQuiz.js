import React, { useState } from "react";
import MANUAL_SVG from "./../../../Assets/icons/write-svgrepo-com (1).svg";
import Manual from "./QuizGenerationMethods/Manual";
import Preview from "./QuizGenerationMethods/preview";
import ConfirmationAndDetails from "./QuizGenerationMethods/ConfirmationAndDetails";

function CreateQuiz() {
  const [method, setMethod] = useState(0);
  
  return (
    <div>
      {method === 0 ? (
        <div className="flex flex-col justify-center items-center bg-slate-50">
          <section className="text-center mt-8 flex flex-col items-center ">
            <h1 className="text-3xl font-roboto font-bold p-6 border-b-4 rounded border-purple-300 w-1/2">
              Create a{" "}
              <span className="text-5xl text-blue-950 font-rubik">Quiz</span>{" "}
              That Rocks!
            </h1>
            <h2 className="font-roboto font-semibold text-center p-4 mt-8 w-2/3 text-blue-950">
              Bring your ideas to life by creating quizzes that capture
              attention and make learning fun. Design quizzes that encourage
              curiosity and keep participants engaged. Whether it's for
              education, training, or just for fun, your quiz can be an
              interactive and enjoyable way for people to learn something new.
            </h2>
          </section>
          <section className="flex flex-wrap bg-purple-100 justify-center p-8 items-center rounded-2xl ml-32 mr-32 m-10">
            <button
              onClick={() => setMethod(6)}
              className="bg-blue-950 w-60 h-60 m-6 rounded-md flex flex-col justify-around items-center cursor-pointer hover:scale-95 duration-500 hover:bg-blue-900"
            >
              <img
                src={MANUAL_SVG}
                className="w-28 h-28 mt-6"
                alt="Manual"
              ></img>
              <h2 className="mb-6 font-sans text-lg font-semibold text-slate-200">
                Manual
              </h2>
            </button>
          </section>
        </div>
      ) : method === 6 ? (
        <Manual setMethod={setMethod} />
      ) : method === 7 ? (
        <Preview setMethod={setMethod}></Preview>
      ) : (
        <ConfirmationAndDetails setMethod={setMethod}></ConfirmationAndDetails>
      )}
    </div>
  );
}

export default CreateQuiz;