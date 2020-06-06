import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';


// THIS IS HOW WE DISPLAY THE LOGO, IN THIS COMPONENT
class LogoImage extends Component {

    constructor(props) {
        super(props)

        this.state = {
            name : this.props.style.name,
            source : this.props.style.source,
            width : this.props.style.width,
            height : this.props.style.height,
            x : this.props.style.x,
            y : this.props.style.y
        }
    }

    

    handleImageDrag = (image, newCord, cleanCord) => {
        const newCoordinates = newCord
        if(this.props.enableResizing ===undefined){
        if(cleanCord){
            let newWidth = parseInt(newCoordinates['width'].replace("px", ""));
            let newHeight = parseInt(newCoordinates['height'].replace("px", ""));

            newCoordinates['width'] = newWidth;
            newCoordinates['height'] = newHeight;
        }
        this.props.handleImageResizeDragCallback(image, newCord)
    }
    }
    
    closeImageClick = () => {
        if(this.props.disableDraggingBoolean === undefined){
            this.props.handleCloseImageCallback(this.props.style.name)
        }
        
    }

    render() {
        var unviewDragging = true
        var visible = "hidden"
        var resizing =  {top:false, right:false, bottom:false, left:false, topRight:false, bottomRight:false, bottomLeft:false, topLeft:false}
        if(this.props.disableDraggingBoolean === undefined){
            unviewDragging = false
            resizing =  {top:false, right:true, bottom:true, left:false, topRight:false, bottomRight:true, bottomLeft:false, topLeft:false}
            visible = "visible"
        }
        
        return (
            <Rnd
                style = {{
                    background: "#f0f0f0",
                }}
                bounds=".Boxes"
                default = {this.state}
                onDragStop={(e, d) => { 
                    this.handleImageDrag(this.props.style.name,{ 
                        name : this.props.style.name,
                        source : this.props.style.source,
                        width : this.state.width,
                        height : this.state.height,
                        x: d.x, 
                        y: d.y 
                    }, false) 
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                    this.handleImageDrag(this.props.style.name,{
                      name : this.state.name,
                      source : this.state.source,
                      width: ref.style.width,
                      height: ref.style.height,
                      ...position
                    }, true);
                }}
               

                disableDragging = {unviewDragging}
                enableResizing = {resizing}
                resizeGrid={[15, 15]}
                dragGrid={[15, 15]}
                
            >
                <img  src = {this.props.style.source} alt = "" width = {this.props.style.width} height = {this.props.style.height}/>
                <HighlightOffIcon onClick = {this.closeImageClick}style = {{visibility : visible,position : "absolute", top : "0px", right : "0px",color : "rgba(126, 126, 125, 0.788)"}}/>
            </Rnd>
        )
    }
    
}

export default LogoImage

