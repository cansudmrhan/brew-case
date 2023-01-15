import React, { useEffect, useState } from "react";
import List from "./components/List";
import LoadingPage from "./components/LoadingPage";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authorId, setAuthorId] = useState("OL26320A");
  const [authorName, setAuthorName] = useState(null);
  const [yearsList, setYearsList] = useState(null);

  const fetchData = async (key) => {
    if (!key) return;
    setLoading(true);
    setData(null);
    try {
      const response = await fetch(
        `http://openlibrary.org/search.json?author=${key}&language=eng`
      );
      const data = await response.json();
      const uniqueYears = new Set();
      data.docs.forEach((item) => {
        item.publish_year.forEach((year) => {
          uniqueYears.add(year);
        });
      });
      setYearsList([...uniqueYears].sort((a, z) => a - z));
      setData(data.docs);

      setAuthorName(data.docs[0]?.author_name[0]);
    } catch (e) {
      setData([]);
    }

    setLoading(false);
  };
  useEffect(() => {
    fetchData("OL26320A");
  }, []);

  const handleChange = (e) => {
    setAuthorId(e.target.value);
  };
  const handleSearch = async () => {
    await fetchData(authorId);
  };

  return (
    <>
      <header className="w-full h-20 bg-gray-400 grid place-items-center fixed z-50">
        <h1 className="text-2xl font-semibold">brewww</h1>
      </header>
      <div className=" w-screen h-screen pt-20 px-12 relative">
        <div className=" bg-[#efefef] w-full z-50 flex gap-x-5 fixed pt-16 items-center">
          <h1 className="text-2xl">Books of</h1>
          <input
            type="search"
            value={authorId}
            onChange={handleChange}
            className="v-full bg-transparent border-0 border-b border-black outline-none"
          />
          {authorName && <span>{authorName}</span>}
          <button
            disabled={loading}
            onClick={handleSearch}
            className={`bg-black rounded-md font-bold text-white text-sm py-0.5 px-1 ${
              loading ? "opacity-50 cursor-progress" : ""
            }`}
          >
            Submit
          </button>
        </div>
        <div className="pt-40 pb-10">
          {loading && <LoadingPage />}
          {data && !!data.length && <List data={data} yearsList={yearsList} />}
          {data && !data.length && (
            <div className="w-full h-full grid place-items-center">
              There is no board to show!
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
