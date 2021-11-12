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
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./LogIn.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useAuth } from "../../AuthContext/AuthContext";
import MuiAlert from "@mui/material/Alert";
const LogIn = () => {
  const { login,signInWithGoogle } = useAuth();
  const history = useNavigate();
  const [values, setValues] = useState({ showPassword: "" });
  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  // Creating States to store the values of email and passcodes
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error,seterror]=useState("")
  const [emailerr, setemailerror] = useState("");
  const [passerr, setpasserror] = useState("");
  const emailValidation = () => {
    const regex =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    // regex check
    if (!email || regex.test(email) == false) {
      setemailerror("Email is Not Valid");
      return false;
    }
    return true;
    setemailerror("");
  };

  const passwordValidation = () => {
    if (!password) {
      setpasserror("Please Provide A Valid Password ");
      return false;
    } else if (password.length < 6) {
      setpasserror("Password Length should be more than 6 letters");
      return false;
    } else return true;
  };
  const checkform = () => {
    if (emailValidation() && passwordValidation()) return true;
    else return false;
  };
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (checkform()) {
      setemailerror("");

      setpasserror("");
      login(email, password).then((response) => {
        history("/home");
        console.log(response);
        setemail("");
        setpassword("");
      })
      .catch((e)=>seterror(e.message))
    }
  };
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
              Log In{" "}
            </Typography>
          </CardContent>{" "}
          <form onSubmit={onSubmitHandler}>
            <CardContent variant="standard">
              <TextField
                value={email}
                onChange={(e) => setemail(e.target.value)}
                id="input-with-sx"
                label="Enter Email Id"
                variant="outlined"
                style={{ marginBottom: "4%" }}
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
              <TextField
                value={password}
                onChange={(e) => setpassword(e.target.value)}
                id="filled-adornment-password input-with-sx"
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
              <List style={{ marginLeft: "15%" }}>
                <ListItem alignItems="center">
                  <Typography variant="body">
                    <NavLink to="/forgot" style={{ color: "green" }}>
                      Forgot Password?
                    </NavLink>
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
                  Sign In
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
              Sign In with Google
            </Button>
          </CardActions>
          <div
            style={{
              width: "80%",
              height: "10px",
              borderBottom: "1px solid black",
              textAlign: "center",
              marginBottom: "2%",
              marginTop: "3%",
              marginLeft: "9%",
            }}
          >
            <span
              style={{
                fontSize: "15px",
                backgroundColor: "#F3F5F6",
                padding: "0 10px",
              }}
            >
              Dont Have An account?{" "}
            </span>{" "}
          </div>
          <CardActions
            style={{
              justifyContent: "center",
              marginTop: "4%",
            }}
          >
            <Box style={{ color: "green" }}>
              <NavLink to="/" style={{ color: "green" }}>
                <Button
                  variant="outlined"
                  style={{
                    color: "green",
                    borderRadius: "25px",
                    border: "1px solid green",
                  }}
                >
                  Sign Up
                </Button>
              </NavLink>
            </Box>
          </CardActions>{" "}
        </Card>{" "}
        {error && <MuiAlert severity="error" style={{marginBottom:"5%"}}>{error}!</MuiAlert>}
      </div>
    </div>
  );
};

export default LogIn;
