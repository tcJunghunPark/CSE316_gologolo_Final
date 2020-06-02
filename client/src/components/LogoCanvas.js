import React from "react";
import _ from "lodash";




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
                    {/* {_.map(this.props.textBoxList, textBoxListElement => this.props.createTextCallback(textBoxListElement))}
                    {_.map(this.props.imageList, imageListElement => this.props.createImageCallback(imageListElement))} */}
                </div>
            </div>
    ) 
} 
}