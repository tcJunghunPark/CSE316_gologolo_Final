import React, { Component } from 'react';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { AppBar, Toolbar, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';


class GologoloNavBar extends Component {

    render() {
      const customNavBarTheme = createMuiTheme({
        palette: {
          primary: {
            main: "#2252bb",
          },
        },
	  });
	  
	  return (
		<ThemeProvider theme = {customNavBarTheme}>
		  <AppBar>
			<Toolbar>
			  <Button component = {Link} to = "/" style = {{fontSize : "32px", color : "white"}}>
	  			Gologolo Home Page | {this.props.currentScreen}
			  </Button>
			</Toolbar>
		  </AppBar>
		</ThemeProvider>
	  );
    }
}

export default GologoloNavBar