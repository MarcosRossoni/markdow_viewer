import Toolbar from "./components/Toolbar.jsx";
import {useEffect, useRef, useState} from "react";
import {marked} from "marked";

function App() {
    const [text, setText] = useState(localStorage.getItem("markdownText") ||"# Ola a todos")

    const renderText = () => {
        return {__html: marked(text)}
    }

    const textAreaRef = useRef(null)

    useEffect(() => {
        localStorage.setItem("markdownText", text)
    }, [text])

    const inserText = (before, after) => {
        const textArea = textAreaRef.current
        const start = textArea.selectionStart
        const end = textArea.selectionEnd
        const previusText = textArea.value
        const beforeText = previusText.substring(0, start)
        const selectText = previusText.substring(start, end)
        const afterText = previusText.substring(end)

        const newText = `${beforeText}${before}${selectText}${after}${afterText}`
        setText(newText)

        textArea.focus()
    }
  return (
    <div className="app-container">
      <Toolbar insertText={inserText}/>
      <textarea ref={textAreaRef} value={text}
                onChange={(e) => setText(e.target.value)}></textarea>
      <div dangerouslySetInnerHTML={renderText()}/>
    </div>
  )
}

export default App
