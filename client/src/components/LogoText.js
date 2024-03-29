import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import ContentEditable from 'react-contenteditable'


//Logo text box
class LogoTextBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rndOptions : {
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "solid transparent",
            },
            style : {
                name : this.props.style.name,
                text: this.props.style.text,
                color: this.props.style.color,
                fontSize: this.props.style.fontSize,
                background : "transparent",
                border : "none",
                x: this.props.style.x,
                y: this.props.style.y
            }
        }
    }

    handleTextDrag = (newText, newX,newY) => {
        this.props.handleTextBoxDragCallback(newText, newX,newY)
    }

    handleTextChange = (event) =>{
        
        this.props.handleTextChangeCallback(this.state.style);
    }

    closeTextClick = () => {
        if(this.props.disableDraggingBoolean === undefined){
            this.props.handleCloseTextBoxCallback(this.props.style.name)
        }   
    }

    

    render() {
        console.log("textbox render");
        var disableDraggingViewScreen = true
        var visible = "hidden"
        var resizing =  {top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}
        if(this.props.disableDraggingBoolean === undefined){
            disableDraggingViewScreen = false
            resizing =  {top:false, right:true, bottom:true, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false}
            visible = "visible"
        }
        return (
            <Rnd
            bounds=".Boxes"
                style = {this.state.rndOptions}
                default = {{
                    x : this.props.style.x,
                    y : this.props.style.y,
                    width : this.state.style.width,
                    height : this.state.style.height
                }}
                onDragStop={(e, d) => { 
                    this.handleTextDrag(this.props.style,d.x,d.y) 
                }}
                dragGrid={[15, 15]}
                disableDragging = {disableDraggingViewScreen}
                enableResizing = {resizing}  
            >
                <ContentEditable
                    style = {this.state.style}
                    html={this.props.style.text} 
                    disabled={disableDraggingViewScreen} 
                    
                    
                    onClick={this.handleTextChange}
                />
                <HighlightOffIcon onClick = {this.closeTextClick}style = {{visibility : visible, position : "absolute", top : "0px", right : "0px", color : "rgba(126, 126, 125, 0.788)"}}/>
            </Rnd>
        )
    } 
}

export default LogoTextBox

