// Login.js
import React, { useState, useEffect} from 'react';
import { useNavigate} from 'react-router-dom';
import axios from "axios";
import './App.css';
import Header from './Header';

function Login() {
    const [username, usernameupdate] = useState('');
    const [password, passwordupdate] = useState('');
    const [usernameError, setUsernameError] = useState();
    const [passwordError, setPasswordError] = useState();
    const [currentUser, setCurrentUser] = useState();
    const [alert_error, setAlert_error] = useState();
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Check if the value exists in localStorage   
        if (localStorage.getItem('currentUsername')) {
            navigate('/home', { replace: true });
        }
      }, []);

  const ProceedLogin = (e) => {
    e.preventDefault();
    console.log(e.target);
    let username = e.target[0].value;
    if (username =='') {
    setUsernameError('Please enter username');
    setError(true);
    }
    else
    {
    setUsernameError('');
    setError(false);
    }
    console.log(username);
    let password = e.target[1].value;
    if (password =='') {
    setPasswordError('Please enter password');
    setError(true);
    }
    else
    {
    setPasswordError('');
    setError(false);
    }
    console.log(password);
    const dataObject = {
        username: username,
        password: password,
        }
    console.log(JSON.stringify(dataObject));
    if (username !='' && password != '') {     
    
    axios.post('http://localhost:8888/api-login.php', JSON.stringify(dataObject)).then(response =>{
        console.log(response.data);
        if (response.data.status == true) {
            console.log(response.data.status);
          setCurrentUser(response.data.username);
          localStorage.setItem('currentUsername', response.data.username);
          navigate('/home', { replace: true });
        }
        else
        {
          setAlert_error(response.data.message);
        }
    })
    .catch(error => {
        console.error('Errror while sending file:', error);
    });
  }
}
  return (<>
    <Header/>
    <div className="row wrapper">
        <div className="offset-lg-3 col-lg-6">
            <form onSubmit={ProceedLogin} className="container">
                <div className="card">
                    <div className="card-header">
                        <h1>User Login</h1>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label>User Name <span style={{color:'red'}}>*</span></label>
                            <input type="text" value={username} onChange={e=>usernameupdate(e.target.value)} className="form-control"></input>
                            <div className="text-danger">{usernameError}</div>
                        </div>
                        <div className="form-group">
                            <label>Password <span style={{color:'red'}}>*</span></label>
                            <input type="password" value={password} onChange={e=>passwordupdate(e.target.value)} className="form-control"></input>
                            <div className="text-danger">{passwordError}</div>
                        </div>
                    </div>
                    <div className="card-footer">
                        <div className="text-danger">{alert_error}</div>
                        <button type="submit" className="btn btn-primary">Login</button>
                        {/* <Link className="btn btn-success" to={'/register'} style={{marginLeft:"20px"}}>New User</Link> */}
                    </div>
                </div>
              </form>
        </div>        
    </div>
    </>
  );
}
export default Login;