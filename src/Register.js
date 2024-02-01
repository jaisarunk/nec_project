import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import './App.css';
import Header from './Header';

function Register() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [fullname, setFullname] = useState();
  const [email, setEmail] = useState();
  const [mobile, setMobile] = useState();
  const [profile, setProfile] = useState(null);
  const [gender, setGender] = useState();
  const [country, setCountry] = useState();
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  const [usernameError, setUsernameError] = useState();
  const [passwordError, setPasswordError] = useState();
  const [fullnameError, setFullnameError] = useState();
  const [emailError, setEmailError] = useState();
  const [mobileError, setMobileError] = useState();
  const [profileError, setProfileError] = useState();
  const [genderError, setGenderError] = useState();
  const [countryError, setCountryError] = useState();
  const [alert_success, setAlert_success] = useState();
  const [alert_error, setAlert_error] = useState();
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if the value exists in localStorage 
    if (localStorage.getItem('currentUsername')) {
      navigate('/', { replace: true });
    }
  }, []);

   //Function to handle form submission
 const handleSubmit = async (e) => {
  e.preventDefault();
  console.log(e.target);
  let username = e.target[0].value;
  if (username.length <3) {
    setUsernameError('Username Must be greater than 2 character');
  }
  else
  {
    setUsernameError('');
  }

  let password = e.target[1].value;
  if (password.length <4) {
    setPasswordError('Password Must be greater than 3 character');
  }
  else
  {
    setPasswordError('');
  }

  let fullname = e.target[2].value;
  if (fullname.length <6) {
    setFullnameError('Fullname Must be greater than 5 character');
  }
  else
  {
    setFullnameError('');
  }

  let email = e.target[3].value;
  if (!email.match(emailRegex)) {
    setEmailError('Email must be in email format.');
  }
  else
  {
    setEmailError('');
  }

  let mobile = e.target[4].value;
  if (mobile.length <10) {
    setMobileError('Mobile Must be greater than 10 digit nemeric');
  }
  else
  {
    setMobileError('');
  }

  let profile = e.target[5].files[0];
    setProfile(profile);

    let gender = e.target[6].value;
    setGender(gender);

    let country = e.target[8].value;
    if (country == '') {
      setCountryError('Please select country');
    }
    else
    {
      setCountryError('');
    }
    console.log('before',username.length);
    if(!(username.length < 3))
    {
      console.log('after',username.length);
    }
    if (!(username.length <3) && !(password.length <4) && !(fullname.length <6) && (email.match(emailRegex)) && !(mobile.length <10) && country !='') 
    {
      console.log('Form has been submitted..', username+','+password+','+fullname+','+email+','+mobile+','+gender+','+country);
      //Check Username availability
      const dataToSend = {
        c_uname: username,
      };
      axios.post('http://localhost:8888/check-username.php', JSON.stringify(dataToSend)).then(response =>{
            console.log(response.data.message);
            if (response.data.status == true) {
              if (!profile) {
                alert('No file attached. Uploading without file.');
                const dataToSend = {
                  c_uname: username, 
                  c_password: password, 
                  c_name: fullname, 
                  c_email: email, 
                  c_mobile: mobile, 
                  c_gender: gender,
                  c_country: country,
                };
                axios.post('http://localhost:8888/api-insert.php', JSON.stringify(dataToSend)).then(response =>{
                      console.log(response.data.message);
                      if (response.data.status == true) {
                        setAlert_error('');
                        setAlert_success(response.data.message);
                        setUsername('');
                        setPassword('');
                        setFullname('');
                        setEmail('');
                        setMobile('');
                        setProfile('');
                        setGender('');
                        setCountry('');
                        setUsernameError('');
                        setPasswordError('');
                        setFullnameError('');
                        setEmailError('');
                        setMobileError('');
                        setProfileError('');
                        setGenderError('');
                        setCountryError('');               
                      }
                      else
                      {
                        setAlert_success('');
                        setAlert_error(response.data.message);
                      }
                  })
                  .catch(error => {
                      console.error('Errror while sending file:', error);
                      alert('Error uploading data to the server.');
                  });
                }
                else
                {
                  const reader = new FileReader();      
                  reader.onload = (event) => {
                    const base64Content = event.target.result;      
                    const dataToSend = {
                      c_uname: username, 
                      c_password: password, 
                      c_name: fullname, 
                      c_email: email, 
                      c_mobile: mobile, 
                      c_gender: gender,
                      c_country: country,
                      c_file: {
                        fileName: profile.name,
                        fileType: profile.type,
                        fileContent: base64Content,
                      },
                    };
                    console.log(JSON.stringify(dataToSend));
                    axios.post('http://localhost:8888/api-insert.php', JSON.stringify(dataToSend)).then(response =>{
                        console.log(response.data.message);
                        if (response.data.status == true) {
                          setAlert_error('');
                          setAlert_success(response.data.message);
                          setUsername('');
                          setPassword('');
                          setFullname('');
                          setEmail('');
                          setMobile('');
                          setProfile('');
                          setGender('');
                          setCountry('');
                          setProfile('');
                          document.getElementById('c_profile').value = '';
                          setUsernameError('');
                          setPasswordError('');
                          setFullnameError('');
                          setEmailError('');
                          setMobileError('');
                          setProfileError('');
                          setGenderError('');
                          setCountryError('');
                        }
                        else
                        {
                          setAlert_success('');
                          setAlert_error(response.data.message);
                        }
                    })
                    .catch(error => {
                        console.error('Errror while sending file:', error);
                    });
                  };
                  reader.readAsDataURL(profile);
                }              
            }
            else
            {
              setUsernameError(response.data.message);
            }
        })
        .catch(error => {
            console.error('Errror while sending file:', error);
            alert('Error uploading data to the server.');
        });
    }
    else
    {
      console.log('something went wrong..');
    }

  }
  const handleUsername = (e) =>{
    let username = e.target.value;
    if (username.length <3) {
      setUsernameError('Username Must be greater than 2 character');
    }
    else
    {
      setUsernameError('');
    }
    setUsername(username);
   }
   const handlePassword = (e) =>{
    let password = e.target.value;
    if (password.length <4) {
      setPasswordError('Password Must be greater than 3 character');
    }
    else
    {
      setPasswordError('');
    }
    setPassword(password);
   }
   const handleFullname = (e) =>{
    let fullname = e.target.value;
    if (fullname.length <6) {
      setFullnameError('Username Must be greater than 5 character');
    }
    else
    {
      setFullnameError('');
    }
    setFullname(fullname);
   }
   const handleEmail = (e) =>{
    let email = e.target.value;
    if (!email.match(emailRegex)) {
      setEmailError('Email must be in email format.');
    }
    else
    {
      setEmailError('');
    }
    setEmail(email);
   }
   const handleMobile = (e) =>{
    let mobile = e.target.value;
    if (mobile.length <10) {
      setMobileError('Mobile Must be greater than 10 digit nemeric');
    }
    else
    {
      setMobileError('');
    }
    setMobile(mobile);
   }
   const handleProfile = (e) =>{
    let profile = e.target.files[0];
    setProfile(profile);
   }
   const handleGender = (e) =>{
    let gender = e.target.value;
    console.log(gender);
    setGender(gender);
   }
   const handleCountry = (e) =>{
    let country = e.target.value;
    if (country == '') {
      setCountryError('Please select country');
    }
    else
    {
      setCountryError('');
    }
    setCountry(country);
   }
  return (
    <><Header/>
    <div className="row">
            <div className="offset-lg-3 col-lg-6">                
                <div className="card">
                    <form onSubmit={handleSubmit}>
                        <div className="card-header">
                            <h1>User Registration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="username" className="form-label">User Name <span className="text-danger">*</span></label>
                                        <input type="text" name="username" id="c_uname" value={username} onChange={handleUsername} className="form-control"></input>
                                        <div className="text-danger" >{usernameError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="password" className="form-label">Password<span className="text-danger">*</span></label>
                                    <input type="password" name="password" id="c_password" value={password} onChange={handlePassword} className="form-control"></input>
                                    <div className="text-danger">{passwordError}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <label htmlFor="fullname" className="form-label">Full Name <span className="text-danger">*</span></label>
                                        <input type="text" name="fullname" id="c_name" value={fullname} onChange={handleFullname} className="form-control"></input>
                                        <div className="text-danger">{fullnameError}</div>
                                    </div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="email" className="form-label">Email<span className="text-danger">*</span></label>
                                    <input type="email" name="email" id="c_email" value={email} onChange={handleEmail} className="form-control"></input>
                                    <div className="text-danger">{emailError}</div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <label htmlFor="mobile" className="form-label">Mobile<span className="text-danger">*</span></label>
                                    <input type="text" name="mobile" id="c_mobile" value={mobile} onChange={handleMobile} className="form-control"></input>
                                    <div className="text-danger">{mobileError}</div>
                                </div>
                                <div className="col-sm-6">
                                    <label htmlFor="profile" className="form-label">Profile Pic:</label>
                                    <input name="profile" id="c_profile" onChange={handleProfile} className="form-control form-control-sm" type="file"></input>
                                    <div id="emailHelp" className="form-text">File with extension's ["pdf","jpg","png","gif"]</div>
                                    <div className="text-danger">{profileError}</div>
                                </div>
                            </div>
                            <div className="row">                                    
                                <div className="col-sm-6">
                                    <div className="row">
                                        <label htmlFor="gender">Gender <span className="text-danger">*</span></label> 
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6">
                                            
                                            <div className="form-check">
                                                <input className="form-check-input access" type="radio" checked={gender==='Male'} onChange={handleGender} name="gender" value="Male"></input>
                                                <label htmlFor="male" className="form-check-label">
                                                    Male
                                                </label>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <div className="form-check">
                                                <input className="form-check-input access" type="radio" checked={gender==='Female'} onChange={handleGender} name="gender" value="Female"></input>
                                                <label htmlFor="female" className="form-check-label">
                                                    Female
                                                </label>                
                                            </div>
                                        </div>
                                        <div className="text-danger">{genderError}</div>
                                    </div>                                        
                                </div>                                    
                                <div className="col-sm-6">
                                    <label htmlFor="country">Country: <span className="text-danger">*</span></label>
                                    <select className="form-select" value={country} onChange={handleCountry} id="c_country" name="c_country" aria-label="Default select example">
                                        <option value="">Please select country</option>
                                        <option value="India">India</option>
                                        <option value="US">US</option>
                                        <option value="UK">UK</option>
                                        <option value="Australia">Australia</option>
                                    </select>
                                    <div className="text-danger">{countryError}</div>
                                </div>
                            </div>
                        </div>
                        <div className="card-footer">
                            <div className="row">
                                <div className="col-sm-6">
                                    <div className="text-success" >{alert_success}</div>
                                    <div className="text-danger">{alert_error}</div>
                                </div>
                                <div className="col-sm-2">
                                    <button type="submit" id="form_submit" className="btn btn-primary">Submit</button>
                                </div>
                                <div className="col-sm-2"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>        
        </div>
        </>
  );
}
export default Register;
