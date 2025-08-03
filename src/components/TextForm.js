import React, {useState} from 'react'

export default function TextForm(props) {
    const handleUpClick = ()=>{
        console.log("Uppercase was clicked" + text);
        let newText = text.toUpperCase();
        setText(newText) 
  }

    const handleLoClick = ()=>{
      console.log("Lowercase was clicked" + text);
      let newText = text.toLowerCase();
      setText(newText) 
  }
    const handleClearclick = ()=>{
      let newText = '';
      setText(newText) 
  }
    const handleOnChange = (event)=>{
        console.log("On Change");
        setText(event.target.value) 
  }

  const handleCopy = () => {
    console.log("I am copy");
    var text = document.getElementById("myBox");
    text.selected();
    navigator.clipboard.writeText(text.value);

  }

  const handleExtraSpaces = () => {
  let newText = text.split(/[ ]+/);
  setText(newText.join(" "))

  }

    const [text, setText] = useState('');
    //text = "new text"; // wrong way to change the state
     //setText = ("new text"); // correct way to change the state
  return (
    <>
    <div className="container">
        <h1>{props.heading}</h1>
                <div className="mb-3">
                <textarea className="form-control" value={text} onChange={handleOnChange} id="myBox" rows="8"></textarea>
    </div>
           <button className="btn btn-primary mx-4" onClick={handleUpClick}>Convert to Uppercase</button>
           <button className="btn btn-primary mx-4" onClick={handleLoClick}>Convert to Lowerercase</button>
           <button className="btn btn-primary mx-4" onClick={handleClearclick}>Tap to clear all</button>
           <button className="btn btn-primary mx-4" onClick={handleCopy}>Copy Text</button>
           <button className="btn btn-primary mx-4" onClick={handleExtraSpaces}>Remove Extra Spaces</button>
    </div>
    <div className="container my-3">
         <h1>Your text summary</h1>
         <p>{text.split (" ").length} words and {text.length} characters</p>
         <p>{0.008* text.split (" ").length} Minutes read</p>
         <h2>Preview</h2>
         <p>{text}</p>
    </div>
    </>
  )
}
