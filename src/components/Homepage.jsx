import React, { useEffect, useRef, useState } from "react";
import "../styles/Homepage.css";

const Homepage = () => {
  const inputRef = useRef();
  const suggestionAreaRef = useRef();
  const [searchQuery, setSearchQuery] = useState("");
  const [list, setList] = useState([]);
  const [suggestionAreaVisible, setSuggestionAreaVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("click", (e) => {
      if (
        e.target !== inputRef.current &&
        e.target !== suggestionAreaRef.current
      ) {
        setSuggestionAreaVisible(false);
      }

      return () => {
        window.removeEventListener("click", () => {});
      };
    });
  });

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchQuery(value);
    makeApiCall(value);
  };

  const makeApiCall = async (query) => {
    try {
      let resp = await getSuggestions(query);
      setList(resp);
    } catch (e) {
      setList([]);
      console.log("Error while making API call in searching the query", e);
    }
  };

  const getSuggestions = (query) => {
    let idx = Math.floor(Math.random() * (4 - 1) + 1);
    // Here will be the loogic to fetch the suggestions by the api using fetch or axios.
    // I have done it locally by setting up 3 arrays and sending them in the random manner.
    const array1 = ["abcd", "shubham", "sati", "Hey", "Hi"];
    const array2 = [
      "sdgdsgasdg",
      "shusdf sbham",
      "as",
      "fg g sg",
      "jls kdfjlks jdfjl",
    ];
    const array3 = [
      "uweu",
      "sai  jklj lkjfsdl ",
      " jklsdafj lkjaslf jlasj dflk jasldkf jlas kf",
      "g loi gjlkas jdglkj slkdgjlk djl",
      "asdf lkjla ksdjflkajsdlkf jalsk djflkasjd lfkj asldfjlsaj flks",
    ];

    if (idx === 1) {
      return array1;
    } else if (idx === 2) {
      return array2;
    } else {
      return array3;
    }
  };

  return (
    <div>
      <main>
        <input
          ref={inputRef}
          type="text"
          name="search"
          placeholder="Type your text..."
          id="search"
          value={searchQuery}
          onFocus={() => setSuggestionAreaVisible(true)}
          //   if we use onBlur here so on clicking the list in the suggestion box first onBlur event occur and then the onClick of suggestion box happen due to which suggestion box become unvisible and things do not work properly
          //   to avoid this we will put click event on the window and will work when the click is in input and suggestion box

          //   onBlur={() => setSuggestionAreaVisible(false)}
          onChange={handleChange}
        ></input>
        {suggestionAreaVisible && (
          <div id="suggestion-box" ref={suggestionAreaRef}>
            {list.map((e) => (
              <div onClick={() => setSearchQuery(e)}>{e}</div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Homepage;
