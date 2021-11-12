import React from 'react'
import {useState} from 'react'
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
import "./ResetPass.css"
import { NavLink, useNavigate } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import { useAuth } from "../../AuthContext/AuthContext";
import MuiAlert from "@mui/material/Alert";
import { useHistory, useLocation } from 'react-router-dom'
function useQuery() {
    return new URLSearchParams(useLocation().search)
  }
const ResetPass = () => {
    const { resetPassword } = useAuth()
    const query = useQuery()
    const history=useNavigate()
    const [password,setpassword]=useState('')
    const [passerr, setpasserror] = useState("");
    console.log(query.get('mode'), query.get('oobCode'))
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
        if (passwordValidation()) return true;
        else return false;
      };
      const onSubmitHandler = async (e) => {
        e.preventDefault()
        // your login logic here
        try {
            await resetPassword(query.get('oobCode'), password)
          
            history('/login')
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
            value={password}
            onChange={(e) => setpassword(e.target.value)}
            id="input-with-sx"
            label="Reset Password"
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
          {passerr && <MuiAlert severity="error">{passerr}!</MuiAlert>}
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
               Reset
            </Button>
          </Box>
        </CardActions>{" "}
          </form>
        
   
     
    </Card>{" "}
  </div>
</div>
    )
}

export default ResetPass
