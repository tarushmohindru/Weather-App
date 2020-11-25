import React,{useState, useEffect} from 'react';
import './App.css';
import Header from "./components/header.jsx";

function App() {
  
  function Weather(){
    const [city, setCity] = useState("Delhi")
    const [cityName, setCityName] = useState("Delhi");
    const [feel,setFeel] = useState('');
    const [temp,setTemp] = useState('');
    const [description,setDescription] = useState('');
    const [main,setMain] = useState('');
    const [icon,setIcon] = useState('');
    const key = `52b2a94e11695582bce450a0eb9020b8` ;
    useEffect(()=>{
    fetch("https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+key+"&units=metric")
   .then(res=>res.json())
   .then(data=>{
     console.log(data);
     setFeel(Math.floor(data.main.feels_like));
     setTemp(Math.floor(data.main.temp));
     setDescription(data.weather[0].description);
     setMain(data.weather[0].main);
     setIcon(data.weather[0].icon);   
   })
    },[city]);
    if(temp<-10){
      document.body.style="background:#000133;color:white;";
    } else if(temp>-10 && temp<0){
      document.body.style="background:#007FFF;";
    } else if(temp>0 && temp<=20){
      document.body.style="background:#46B3E6;";
    } else if(temp>20 && temp<=30){
      document.body.style="background:#f88379;";
    } else if(temp>30 && temp<=40){
      document.body.style="background:#f77f00;";
    } else if(temp>40){
      document.body.style="background:#f94d00;";
    }
    function handleSubmit(e){
      e.preventDefault();
      setCity(cityName);
    }
    function handleChange(e){
      setCityName(e.target.value);
    }
    return(
      <div>
      <form onSubmit={handleSubmit}>
      <input type="text" placeholder="Enter your city" value={cityName} onChange={handleChange}/>
      <button type="submit">Add</button>
      </form>
      <div class="data">
      <h1 id="city">{city}</h1>
      <h1 id="temp">{main}</h1>
      <h2 id="feel">{temp}°C</h2>
      <h2 id="main">Feels like {feel}°C</h2>
      <h2 id="desc">{description}</h2>
      <img src={"https://openweathermap.org/img/wn/"+icon+"@2x.png"} alt="icon" />
     </div>
      </div>
    )
  }
  
  return (
    <div>
     <Header />
     <Weather />
     </div>
  )
}

export default App;
