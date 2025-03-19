import './App.css'
import {useState} from "react";
import Header from './components/header.jsx'
import Widget from './components/widget.jsx'
import mic from './assets/mic.png'
import Fetch from './components/Fetch.jsx'
import Reading from './components/Reading.jsx' 
function App() {
  const [sharedValue, setSharedValue] = useState('');
  const [fetchedData, setFetchedData] = useState('');

  return (
    <>
    <Header/>
    <Widget sharedValue={sharedValue} setSharedValue={setSharedValue}/>
    <Fetch sharedValue={sharedValue} fetchedData={fetchedData} setFetchedData={setFetchedData}/>
    <Reading fetchedData={fetchedData}/>
    </>
  )
}

export default App;
