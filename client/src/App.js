import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [coms, setComs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      await axios
        .get("/api/comments")
        .then((res) => {
          setComs(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.err(err);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <div>Comments</div>
      {!loading &&
        coms.map((com) => (
          <div key={com.id}>
            {com.name}: {com.content}
          </div>
        ))}
    </div>
  );
}

export default App;
