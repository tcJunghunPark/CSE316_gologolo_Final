import React, { Component } from 'react';
import { Grid, TextField, Button, Link as MaterialUILink } from '@material-ui/core';
import { Link } from 'react-router-dom'
// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LoginScreen extends Component {

    render() {
        return (
            <div id = "loginScreenMainDiv">
                <Grid container direction = "column" justify = "center" alignItems = "center" spacing = "2">
                    <Grid item id = "logInScreenBanner">
                        <div id="home_banner_container">
                            Gologolo
                        </div>
                    </Grid>
                    <Grid item>
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
                                to = "/">
                            Log In
                        </Button>
                    </Grid>
                    <Grid item>
                        <MaterialUILink href = "https://accounts.google.com/signup/v2/webcreateaccount?hl=en-GB&flowName=GlifWebSignIn&flowEntry=SignUp" target="_blank" rel="noreferrer">
                            {"Don't have a Gmail account? Sign Up."}
                        </MaterialUILink>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default LoginScreen;