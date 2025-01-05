import React, { useState } from "react";
import axios from "axios";

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const handleAsk = async () => {
    try {
      const res = await axios.post("http://localhost:8000/api/fortune", { question });
      setResponse(res.data.response);
    } catch (error) {
      setResponse("Something went wrong. Please try again.");
    }
  };

  return (
    <div>
      <h1>Fortune Teller</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask your question..."
      />
      <button onClick={handleAsk}>Get Fortune</button>
      {response && <p>{response}</p>}
    </div>
  );
};

export default App;
