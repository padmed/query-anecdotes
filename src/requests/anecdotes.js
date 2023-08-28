import axios from "axios";
const baseUrl = "http://localhost:3001/anecdotes";

export const getAnecdotes = () => axios.get(baseUrl).then((res) => res.data);

export const addAnecdote = (anecdote) => {
  if (anecdote.content.length >= 5) {
    return axios.post(baseUrl, anecdote).then((res) => res.data);
  }
  throw new Error("Anecdote should be at least 5 characters long");
};

export const updateAnecdote = (anecdote) =>
  axios.put(`${baseUrl}/${anecdote.id}`, anecdote).then((res) => res.data);
