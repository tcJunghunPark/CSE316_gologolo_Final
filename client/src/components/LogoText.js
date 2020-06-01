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

    handleTextDrag = (newText, newCoordi) => {
        this.props.handleTextBoxDragCallback(newText, newCoordi)
    }

    handleLogoTextChange = (event) =>{
        const newStyle = {
            name : this.state.style.name,
            text : event.target.value,
            color : this.state.style.color,
            fontSize : this.state.style.fontSize,
            background : this.state.style.background,
            x : this.state.style.x,
            y : this.state.style.y
        }
        this.props.handleLogoTextBoxTextChangeCallback(this.state.style.name, newStyle);
    }

    closeTextClick = () => {
        if(this.props.disableDraggingBoolean === undefined){
            this.props.handleCloseTextBoxCallback(this.props.style.name)
        }   
    }

    

    render() {
        console.log("textbox render");
        var disableDraggingViewScreen = true
        if(this.props.disableDraggingBoolean === undefined){
            disableDraggingViewScreen = false
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
                    this.handleTextDrag(this.props.style.name,{ 
                        name : this.props.style.name,
                        text: this.props.style.text,
                        color: this.props.style.color,
                        fontSize: this.props.style.fontSize,
                        background : "transparent",
                        border : "none",
                        x: d.x, 
                        y: d.y 
                    }) 
                }}
                dragGrid={[15, 15]}
                disableDragging = {disableDraggingViewScreen}
            >
                <ContentEditable
                    style = {this.state.style}
                    html={this.props.style.text} 
                    disabled={disableDraggingViewScreen}      
                    onChange={this.handleLogoTextChange} 
                />
                <HighlightOffIcon onClick = {this.closeTextClick}style = {{position : "absolute", top : "0px", right : "0px", color : "rgba(126, 126, 125, 0.788)"}}/>
            </Rnd>
        )
    } 
}

export default LogoTextBox

