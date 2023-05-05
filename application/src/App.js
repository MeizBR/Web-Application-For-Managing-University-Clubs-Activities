import './App.css';
import { Header } from './sections/Header/Header';
import { Content } from './sections/Content/Content';
import { Footer } from './sections/Footer/Footer';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Content1 } from './sections/Content1/Content1';


const App = () => {

  const [numVisitors, setNumVisitors] = useState(0);

  useEffect(() => {
    axios.get('http://localhost:5000/visitors')
      .then(response => setNumVisitors(response.data.count))
      .catch(error => console.error(error));
  }, []);


  return (
    <div className='body'>
      <div className='POS'>
        <Header />
      </div>
     
       
       <div className='cn '>
         <Content1/>
       </div>       
       
      




      <div>
             

      </div>

      <Content />
      <div style={{background:"steelblue", borderRadius:"20px"}} className="visitors-counter">
        <h1 id='vc-title'>Visitors Counter</h1>
        <h3>Number of visitors : {numVisitors} visitors</h3>
        <div className='spinners-container'>
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-success" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-danger" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-warning" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-info" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <div class="spinner-border text-dark" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>  
      </div>
      <Footer />
    </div>
  );
}

export default App;
