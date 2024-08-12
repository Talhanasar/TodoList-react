import { useRef, useState } from "react";

export const TodoForm = ({onSubmitForm})=>{
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState("");

    const handleFormSubmit = (event)=>{
        event.preventDefault();
        onSubmitForm(inputValue);
        setInputValue("");
    }
    return(
        <div className="head">
            <h2 className="text-xl mb-3">Add Todo</h2>
            <form className="search flex" onSubmit={handleFormSubmit}>
              <input
                ref={inputRef}
                autoFocus
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-[90%] rounded-full px-2 outline-gray-500 outline-1"
              />
              <button
                type="submit"
                className="py-1 px-3 rounded-full bg-primary mx-2"
              >
                ADD
              </button>
            </form>
          </div>
    )
}