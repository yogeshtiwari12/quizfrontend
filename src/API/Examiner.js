import axios from "axios";
import { URL } from "./url";
export const addExaminer = async (data) => {
  try {
    let res = await axios.post(`${URL}/addExaminer`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getExaminer = async (data) => {
  try {
    let res = await axios.post(`${URL}/getExaminer`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const getTextFromUrl = async (data) => {
  try {
    let res = await axios.post(`${URL}/getTextFromUrl`, data);
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const generateQuestions = async (data) => {
  try {
    let res = await axios.post(
      "https://quizgenerator-1.onrender.com/generate-quiz",
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
};
