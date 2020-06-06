import React, { Component } from 'react';
import { Grid, TextField, Button, Link as MaterialUILink } from '@material-ui/core';
import { Link } from 'react-router-dom'

class LoginScreen extends Component {
   
    idChange = (e) => {
        // this.setState({ id: e.target.value });
    }
    pwdChange = (e) => {
        // this.setState({ pwd: e.target.value });
    }
    login = (e) => {
        // var blank_pattern = /^\s+|\s+$/g;
        // if(this.state.id.replace( blank_pattern, '') == '' || this.state.pwd.replace( blank_pattern, '') == ''){
        //     alert("Please Enter ID and Pasword!")
        //     e.preventDefault();
    //}
    }

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
                                   required
                                   onChange = {this.idChange}
                                   >
                                       
                            Google email
                        </TextField>
                    </Grid>
                    <Grid item>
                        <TextField id = "loginScreenPasswordTextField" 
                                   label = "Enter your password" 
                                   variant = "outlined" 
                                   type = "password"
                                   required
                                   onChange = {this.pwdChange}>
                            Enter your password
                        </TextField>
                    </Grid>
                    <Grid item>
                        <Button id = "loginScreenLogInButton" 
                                variant = "contained"
                                component = {Link}
                                onClick = {this.login}
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