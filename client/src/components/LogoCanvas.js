import React from "react";
import _ from "lodash";




export default class LogoCanvas extends React.PureComponent {
  
	constructor(props) {
	  super(props);
  
	  this.state = {
		
	  };

	}


	render() {
		return(
            <div id = "logoCanvasMain" style = {{width : "800px"}} key = {"logoCanvas" + this.props.styles.position}>
                
                <div id = "logoCanvasImageZone" style = {this.props.styles} className = "logoTextBoxAndImageBounds">
                    {_.map(this.props.textBoxList, textBoxListElement => this.props.createTextBoxCallback(textBoxListElement))}
                    {_.map(this.props.imageList, imageListElement => this.props.createImageCallback(imageListElement))}
                </div>
            </div>
    ) 
} 
}