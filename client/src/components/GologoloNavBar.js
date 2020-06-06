import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


class GologoloNavBar extends Component {

    render() {
      const customNavBarTheme = createMuiTheme({
        palette: {
          primary: {
            main: "rgb(131, 206, 224)",
          },
        },
	  });
	  
	  return (
		<ThemeProvider theme = {customNavBarTheme}>
		  <AppBar>
			<Toolbar>
			  <Button component = {Link} to = "/home" style = {{fontSize : "32px", color : "white"}}>
	  			Gologolo Home | {this.props.currentScreen}
			  </Button>
			  <Button component = {Link} to = "/" style = {{fontSize : "32px", color : "white", marginLeft: "50%"}}>
	  			Logout
			  </Button>
			</Toolbar>
		  </AppBar>
		</ThemeProvider>
	  );
    }
}

export default GologoloNavBar