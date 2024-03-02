import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [text, setText] = useState("")
  const [isSaving, setIsSaving]= useState(false)

const getTextFromLocal =()=>{
    let data= JSON.parse(localStorage.getItem("autoSaveText"))
    console.log(data)
    if(data) setText(data)
  }


const saveToLocal =()=>{
  setIsSaving(true)
  localStorage.setItem("autoSaveText",JSON.stringify(text))
  setTimeout(()=>{
    setIsSaving(false)
  },1500)
}

// to fetch the text from local storage on the mounting of application 
useEffect(()=>{
  getTextFromLocal()
},[])


// runs everytime the text state changes
useEffect(()=>{
let timer= setTimeout(()=>{
  saveToLocal()
},1500)

return ()=> clearTimeout(timer)
},[text])

  return (
   <>
 <div className='app-container'>
 <h1> React Auto Save Text</h1>
 <div className='input-container'>
 <textarea value={text} onChange={(e)=>setText(e.target.value)}  placeholder='Enter your text'></textarea>
  <button onClick={saveToLocal} className={`save-btn ${isSaving? "saving":""}`}>{isSaving? "Saving":"Save"}</button>
 </div>

 </div>
   </>
  )
}

export default App
