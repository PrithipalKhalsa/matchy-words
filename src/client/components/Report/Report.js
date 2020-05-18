import React, {useState,useEffect} from 'react';
import axios from 'axios';

import './Report.css';

const Report = () => {

  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  const validCheck = (e)=>{
    if( (document.getElementById('name').value !== '')&&
        (document.getElementById('email').value !== '')&&
        (document.getElementById('message').value !== '')
      ){
      setError('')
      handleSubmit(e);
    }
    else{
      setError("Please fill out the boxes")
       e.preventDefault()
    }
  }

  const handleSubmit=(e)=>{
    console.log("in func");
          e.preventDefault();
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const message = document.getElementById('message').value;
          console.log(message)
          axios({
              method: "POST",
              url:"/send-report",
              data: {
                  name: name,
                  email: email,
                  message: message
              }
          }).then((response)=>{
              if (response.data.msg === 'success'){
                  alert("Thanks for the feedback!.");
                  resetForm()
              }else if(response.data.msg === 'fail'){
                  alert("Message failed to send.")
              }
          })
}
  const resetForm=()=>{
          document.getElementById('email').value='';
          document.getElementById('name').value='';
          document.getElementById('message').value='';
      }




  return (
   <div className="report-component">
    <button className="show-form-button" onClick={()=>setShowForm(!showForm)}>Report Bug</button>
    {showForm &&
      <div className={["contact-form",(showForm) ? 'animate__bounce' : null].join(' ')}>
        <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" id="name" />
        </div>
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">Email</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" />
        </div>
        <div className="form-group">
            <label htmlFor="message">Issue</label>
            <textarea className="form-control" rows="5" id="message"></textarea>
        </div>
        <button onClick={(e)=>validCheck(e)} className="send-report-button">Submit</button>
        <p className="error-msg">{error}</p>
    </div>
    }
  </div>
  );
}
export default Report;
