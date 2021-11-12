import {React,useState} from 'react'
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

import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import "./Forgot.css";

import { useAuth } from "../../AuthContext/AuthContext";
import MuiAlert from "@mui/material/Alert";
const Forgot = () => {
    const { forgotPassword } = useAuth()
    const [email, setemail] = useState("");
    const [emailerr, setemailerror] = useState("");
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
      const checkform = () => {
        if (emailValidation()) return true;
        else return false;
      };
      const onSubmitHandler = async (e) => {
        e.preventDefault()
        // your login logic here
        try {
          await forgotPassword(email)
          
        } catch (error) {
          console.log(error.message)
          
        }
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
               
              }}
            >
              Forgot Password{" "}
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
              </CardContent>
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
                   Submit
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
            <Box style={{ color: "green" }}>
              <NavLink to="/login" style={{ color: "green" }}>
                <Button
                  variant="outlined"
                  style={{
                    color: "green",
                    borderRadius: "25px",
                    border: "1px solid green",
                  }}
                >
                  Sign In
                </Button>
              </NavLink>
            </Box>
          </CardActions>{" "}
       
         
        </Card>{" "}
      </div>
    </div>
    )
}

export default Forgot
