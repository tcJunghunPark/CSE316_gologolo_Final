import React from "react";
import _ from "lodash";
import { Button, Snackbar, IconButton } from '@material-ui/core';




export default class LogoCanvas extends React.PureComponent {
  
	constructor(props) {
	  super(props);
  
	  this.state = {
		
	  };

	}


	render() {
        console.log("logoArea render");
		return(
            <div id = "logoCanvasMain" style = {{width : "800px"}} key = {"logoCanvas" + this.props.styles.position}>
                
                
                <div id = "logoArea" style = {this.props.styles} className = "Boxes">
                    {_.map(this.props.textBoxList, e => this.props.createTextCallback(e))}
                    {_.map(this.props.imageList, e => this.props.createImageCallback(e))}
                </div>
            </div>
    ) 
} 
}