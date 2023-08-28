import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAnecdote } from "../requests/anecdotes";
import { useNotification } from "../contexts/NotificationContext";

const AnecdoteForm = () => {
  const client = useQueryClient();
  const showNotification = useNotification();

  const newAnecdoteMutation = useMutation({
    mutationFn: addAnecdote,
    onSuccess: (anecdote) => {
      const anecdotes = client.getQueryState().data;
      client.setQueryData(["anecdotes"], [...anecdotes, anecdote]);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    if (content.length >= 5) {
      event.target.anecdote.value = "";
      newAnecdoteMutation.mutate({ content, votes: 0 });
      showNotification(`Added: "${content}"`, 5000);
    }
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
