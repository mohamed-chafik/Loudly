import './App.css'
import {useState} from "react";
import Header from './components/header.jsx'
import Widget from './components/widget.jsx'
import mic from './assets/mic.png'
import Fetch from './components/Fetch.jsx'
function App() {
  const [sharedValue, setSharedValue] = useState('');
   // Function to update the shared value

  return (
    <>
    <Header/>
    <Widget sharedValue={sharedValue} setSharedValue={setSharedValue}/>
    <Fetch sharedValue={sharedValue}/>
    </>
  )
}

export default App;
