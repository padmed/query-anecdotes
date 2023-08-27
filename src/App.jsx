import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAnecdotes } from "./requests/anecdotes";

const App = () => {
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: getAnecdotes,
    retry: 3,
  });

  const anecdotes = result.data;

  const handleVote = (anecdote) => {
    console.log("vote");
  };

  if (result.isLoading) {
    return <h1>Loading...</h1>;
  }

  if (result.isError) {
    return <h1>Service not aviable due to problems in server</h1>;
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
