import { React, useState } from "react";
import Divider from "../Divider/Divider";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
import {
  Box,
  Card,
  CardHeader,
  CardActions,
  CardContent,
  Button,
  Typography,
  TextField,
} from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {NavLink,useNavigate} from "react-router-dom"
import PersonIcon from "@mui/icons-material/Person";
import MuiAlert from '@mui/material/Alert';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Register.css";
import { useAuth } from '../../AuthContext/AuthContext';
import app from "../../Database/Firebase"
import {auth} from "../../Database/Firebase"
const Register = () => {
  // Use of Use Context Hook
  const {register,signInWithGoogle}= useAuth()
  const history=useNavigate()
  const [values, setValues] = useState({ showPassword: "" });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };
  const [checked, setchecked] = useState(false);
  const handleChange = (e) => {
    setchecked(e.target.checked);
  };
  // Creating States to store the values of email and passcodes
  const [email,setemail]=useState('')
  const [password,setpassword]=useState('')
  const [confirmpass,setconfirmpass]=useState('')
  const [emailerr ,setemailerror]=useState('')
  const [passerr,setpasserror]=useState('')
  const [error,seterror]=useState('')
    //Email Validation
    const emailValidation=()=>{
      const regex=/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
      // regex check
      if(!email || regex.test(email)==false){
         setemailerror("Email is Not Valid")
         return false
      }
      return true
      setemailerror('')
    }
    const passwordValidation =()=>{
      if(!password && !confirmpass){
       setpasserror("Please Provide A Valid Password And Confirm It")
        return false;
        
      }
      else if(password.length<6)
      {
       setpasserror("Password Length should be more than 6 letters")
        return false
      
      }
      else if(password!=confirmpass)
      {
       setpasserror("Password And Confirm Password doesnt match")
        return false
       
      }
      else return true
   }
   const checkform=()=>{
    if(emailValidation() && passwordValidation() && checked)
    return true;
    else
    return false;
  }
  const onSubmitHandler=(e)=>{
     e.preventDefault()
     if(checkform()){
       setemailerror('')
       setpasserror('')
       console.log(email,password)
       register(email,password)
       .then((response)=>{console.log(response)
          EmailVerification(response)
          history("/home")
         
          setemail('')
          setconfirmpass('')
          setpassword('')
       })
       
       .catch((error)=>seterror(error.message))
     }
  }
  const EmailVerification=async(e)=>{
    var userNow = app.auth().currentUser;
    userNow.sendEmailVerification().then(()=>{
      console.log("Verified")
    })
    .catch((er)=>console.log(er))
  }
  return (
    <div>
      <Divider />
      <div className="box">
        <Card
          style={{
            width: "30%",
          }}
          className="card"
        >
          <CardContent>
            <Typography
              sx={{
                fontSize: 20,
              }}
              color="text.secondary"
              style={{
                fontWeight: "bold",
                fontSize: "20px",
                color: "green",
                marginRight: "42%",
              }}
            >
              Sign Up{" "}
            </Typography>
          </CardContent>{" "}
          <form onSubmit={onSubmitHandler}>
            <CardContent variant="standard">
              <div  style={{ marginBottom: "4%" }}>
              <TextField
                value={email}
                onChange={e=>setemail(e.target.value)}
                id="input-with-sx"
                label="Enter Email Id"
                variant="outlined"
               
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <IconButton>
                        <PersonIcon
                          sx={{
                            color: "action.active",
                            mr: 1,
                            my: 0.5,
                          }}
                          style={{ color: "green" }}
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {emailerr && <MuiAlert severity="error">{emailerr}!</MuiAlert>}
              </div>
              <TextField
                id="filled-adornment-password input-with-sx"
                value={password}
                onChange={(e)=>setpassword(e.target.value)}
                label="Create Password"
                variant="outlined"
                style={{ marginBottom: "4%" }}
                type={values.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff
                            sx={{
                              color: "action.active",
                              mr: 1,
                              my: 0.5,
                            }}
                            style={{ color: "green" }}
                          />
                        ) : (
                          <Visibility
                            sx={{
                              color: "action.active",
                              mr: 1,
                              my: 0.5,
                            }}
                            style={{ color: "green" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {passerr && <MuiAlert severity="error">{passerr}!</MuiAlert>}
              <TextField
                id="filled-adornment-password input-with-sx"
                value={confirmpass}
                onChange={(e)=>setconfirmpass(e.target.value)}
                label="Re-enter Password"
                variant="outlined"
                style={{ marginBottom: "4%" }}
                type={values.showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment>
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        edge="end"
                      >
                        {values.showPassword ? (
                          <VisibilityOff
                            sx={{
                              color: "action.active",
                              mr: 1,
                              my: 0.5,
                            }}
                            style={{ color: "green" }}
                          />
                        ) : (
                          <Visibility
                            sx={{
                              color: "action.active",
                              mr: 1,
                              my: 0.5,
                            }}
                            style={{ color: "green" }}
                          />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <List style={{ marginLeft: "15%" }}>
                <ListItem alignItems="center">
                  <Checkbox
                    checked={checked}
                    onChange={handleChange}
                    inputProps={{ "aria-label": "primary checkbox" }}
                    labelStyle={{ color: "green" }}
                    iconStyle={{ fill: "green" }}
                    style={{ color: "green" }}
                  />
                  <Typography variant="subtitle2">
                    I agree to the{" "}
                    <span style={{ color: "green" }}>terms and services</span>
                  </Typography>
                </ListItem>
              </List>
            </CardContent>{" "}
            <CardActions
              style={{
                justifyContent: "center",
              }}
            >
              <Box style={{ color: "green" }}>
                <Button
                  variant="outlined"
                  style={{
                    color: "green",
                    borderRadius: "25px",
                    border: "1px solid green",
                  }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Box>
            </CardActions>{" "}
          </form>
          <div
            style={{
              width: "80%",
              height: "10px",
              borderBottom: "1px solid black",
              textAlign: "center",
              marginBottom: "2%",
              marginTop: "1%",
              marginLeft: "9%",
            }}
          >
            <span
              style={{
                fontSize: "20px",
                backgroundColor: "#F3F5F6",
                padding: "0 10px",
              }}
            >
              OR{" "}
            </span>{" "}
          </div>
          <CardActions
            style={{
              justifyContent: "center",
              marginTop: "4%",
            }}
          >
            <Button
              sx={{
                display: "flex",
                alignItems: "center",
                textTransform: "smallcase",
              }}
              style={{
                backgroundColor: "darkgreen",
                color: "#FFF",
                borderRadius: "25px",
              }}
              onClick={() =>
                signInWithGoogle()
                  .then(user => {
                    history("/home")
         
                    console.log(user)
                  })
                  .catch(e => console.log(e.message))}
            >
              <img
                style={{
                  marginBottom: "3px",
                  marginRight: "5px",
                  width: "20px",
                }}
                alt="Google sign-in"
                src="https://staffordonline.org/wp-content/uploads/2019/01/Google.jpg"
              />
              Sign Up with Google
            </Button>
          </CardActions>
          <div
            style={{
              marginTop: "4%",
              marginLeft: 20,
              textAlign: "center",
              marginBottom: "4%",
            }}
          >
            Already have an account ? <NavLink to="/login" style={{color:"green"}}>Sign In</NavLink>
          </div>
        </Card>{" "}
        {error && <MuiAlert severity="error" style={{marginBottom:"5%"}}>{error}!</MuiAlert>}
      </div>{" "}
    </div>
  );
};

export default Register;
