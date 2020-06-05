import React, { Component } from 'react';
import { Grid, TextField, Button, Link as MaterialUILink } from '@material-ui/core';
import { Link } from 'react-router-dom'

class LoginScreen extends Component {

    render() {
        return (
            <div id = "loginScreenMainDiv" style={{  position: "absolute",left: "30%", width: '600px', 
            marginTop: "10%", borderStyle: "solid",borderRadius: "5%", borderColor: "black",
            backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                <Grid container direction = "column" justify = "center" alignItems = "center" spacing = "2">
                    <Grid item>
                        <h2>Gologolo Login</h2>
                        <TextField id = "loginScreenUserNameTextField" 
                                   label = "Google email" 
                                   variant = "outlined"
                                   autoFocus
                                   required>
                            Google email
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField id = "loginScreenPasswordTextField" 
                                   label = "Enter your password" 
                                   variant = "outlined" 
                                   type = "password"
                                   required>
                            Enter your password
                        </TextField>
                    </Grid>
                    <Grid item>
                        <Button id = "loginScreenLogInButton" 
                                variant = "contained"
                                component = {Link}
                                to = "/home">
                            Log In
                        </Button>
                    
                        <MaterialUILink href = "https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp" target="_blank" rel="noreferrer">
                            {"      Sign Up"}
                        </MaterialUILink>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default LoginScreen;