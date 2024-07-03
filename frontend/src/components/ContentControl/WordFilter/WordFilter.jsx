import React, { useEffect, useState } from "react";
import DeleteWord from "./../../../assets/images/deleteword";
import AddWord from "./../../../assets/images/addword";

export default function WordFilter() {
  const [words, setWords] = useState(["beka", "beka", "beka"]);
  const [inputWord, setInputWord] = useState("");
  useEffect(() => {
    if (inputWord.includes(",")) {
      if (inputWord) {
        setWords([...words, inputWord.replace(",", "")]);
      }
      setInputWord("");
    }
  }, [inputWord]);
  return (
    <div className="mx-auto w-1/3 flex flex-col">
      <span className="text-lg text-center font-semibold">
        Запрещенные слова
      </span>
      <span className="text-base text-center opacity-70">
        Укажите слова через запятую
      </span>
      <div className="mt-8 rounded-lg w-full border p-4 flex flex-wrap gap-4">
        {words.map((word, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 w-max border-2 rounded-xl shadow-lg"
          >
            <span>{word}</span>
            <button
              onClick={() => setWords(words.filter((_, i) => i !== index))}
            >
              <DeleteWord />
            </button>
          </div>
        ))}
        <div className="flex items-center justify-between p-2 w-max border rounded-2xl bg-[#E13737] text-white outline-none">
          <input
            type="text"
            placeholder="Введите слово..."
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            className="placeholder:text-white bg-[#E13737] outline-none"
          />
          <AddWord />
        </div>
      </div>
      <div className="flex justify-center">
        <button className="bg-[#E13737] text-white px-32 py-2 rounded-2xl mt-4">
          Сохранить
        </button>
      </div>
    </div>
  );
}
