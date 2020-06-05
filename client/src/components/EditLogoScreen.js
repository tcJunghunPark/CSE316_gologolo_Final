import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

import GologoloNavBar from './GologoloNavBar.js';
import LogoText from './LogoText.js';
import LogoImage from './LogoImage.js';
import LogoCanvas from './LogoCanvas.js';
import _ from "lodash";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            margin
            height
            width
            position
            textBoxFontColor
            textBoxFontSize
            textBoxList{
                name
                text
                color
                fontSize
                border
                background
                x
                y
            }
            imageList{
                name
                source
                width
                height
                x
                y
            }
        }
    }
`;

const UPDATE_LOGO = gql`
    mutation updateLogo(
        $id : String!,
    $backgroundColor: String!
    $borderColor: String!
    $borderRadius: Int!
    $borderWidth: Int!
    $margin: Int!,
    $height: Int!,
    $width: Int!,
    $border : String!,
    $position : String!,
    $textBoxFontColor : String!,
    $textBoxFontSize : Int!,
    $textBoxList : [TextBoxInput]!,
    $imageList : [ImageTypeInput]!
  ) {
    updateLogo(
      id : $id
      backgroundColor: $backgroundColor,
      borderColor: $borderColor,
      borderRadius: $borderRadius,
      borderWidth: $borderWidth,
      margin: $margin,
      height : $height,
      width : $width,
      border : $border,
      position : $position,
      textBoxFontColor : $textBoxFontColor,
      textBoxFontSize : $textBoxFontSize,
      textBoxList : $textBoxList,
      imageList : $imageList
    ) {
      lastUpdate
    }
  }
`;


class EditLogoScreen extends Component {
    
    componentWillMount () {
        const {handle} = this.props.match.params
        const {_id} = this.props.location.state
        const {textBoxList} = this.props.location.state
        const {imageList} = this.props.location.state
        const {textBoxFontColor} = this.props.location.state
        const {textBoxFontSize} = this.props.location.state
        const {width} = this.props.location.state
        const {height} = this.props.location.state
        const {position} = this.props.location.state
        const {backgroundColor} = this.props.location.state
        const {borderRadius} = this.props.location.state
        const {border} = this.props.location.state
        const {margin} = this.props.location.state
        const {borderWidth} = this.props.location.state
        const {borderColor} = this.props.location.state
        
        var tbList  = textBoxList;
        var imgList = imageList;
        for(var i = 0; i < tbList.length; i++){
            delete tbList[i]['__typename']
        }

        for(var i = 0; i < imgList.length; i++){
            delete imgList[i]['__typename']
        }
       


        console.log((tbList))
        console.log(imageList)
        this.setState({
            
            text: "TEXT",
            textBoxFontColor: "black",
            textBoxFontSize: 20,

            source: "",
            backgroundColor: backgroundColor,
            
            borderColor: borderColor,
            borderRadius:  borderRadius,
            borderWidth: borderWidth,
            border: border,
            margin: margin,
            height: height,
            width: width,
            position: position,
            textBoxList : tbList,
            imageList:imgList,
            textBoxCounter : 0,
            imageCounter : 0,
            bugCounter : 0,
            imageErrorAlert : false,

            
        });
        this.handleBorderWidthChange = this.handleBorderWidthChange.bind(this)
    }
        
    handleBorderWidthChange = (event) =>{
        event.preventDefault();
        var updateBorderWidth = this.state.borderWidth
        updateBorderWidth = event.target.value
        if(updateBorderWidth > 50){
            updateBorderWidth = 50
        }
        if(updateBorderWidth < 1) {
            updateBorderWidth  = 1
        }
        this.setState({ borderWidth : updateBorderWidth });
    };
    
    textChange = (e) => {
        console.log("text change");
        console.log(e.target.value);
        this.setState({ text: e.target.value });
    }
    colorChange = (e) => {
        console.log("color Change");
        console.log(e.target.value);
        this.setState({ color: e.target.value });

    }
    fontSizeChange = (e) => {
        console.log("fontSize");
        this.setState({ fontSize: e.target.value + "pt" });
    }
    backgroundColorChange = (e) => {
        console.log("background");
        this.setState({ backgroundColor: e.target.value });
    }
    borderRadiusChange = (e) => {
        console.log("borderRadius Change");
        this.setState({ borderRadius: e.target.value + "%" });

    }
    borderWidthChange = (e) => {
        console.log("borderThickness Change");
        this.setState({
            borderWidth: e.target.value,
            border: e.target.value + "px solid" + this.state.borderColor
        });
    }
    borderColorChange = (e) => {
        console.log("border color Change");
        this.setState({
            borderColor: e.target.value,
            border: this.state.borderWidth + "px solid" + e.target.value
        });
    }
    paddingChange = (e) => {
        console.log("padding Change");
        this.setState({ padding: e.target.value + "px" });
    }
    marginChange = (e) => {
        console.log("margin Change");
        this.setState({ margin: e.target.value + "px" });
    }
    widthChange = (e) => {
        console.log("width Change");
        this.setState({ width: e.target.value + "px" });
    }
    heightChange = (e) => {
        console.log("height Change");
        this.setState({ height: e.target.value + "px" });
    }

    closeText = (textBoxToDelete) => {
		const newTextBoxList = _.filter(this.   state.textBoxList, textBoxListElement => textBoxListElement.name !== textBoxToDelete)
        const updatedBugCounter = this.state.bugCounter + 1;
		this.setState({
			textBoxList : newTextBoxList,
			bugCounter : updatedBugCounter
		})
    }

    textBoxChange = (textBoxToUpdate, newText) => {
        const newTextList = this.state.textBoxList;
        const updatedBugCounter = this.state.bugCounter + 1;
        for(var i = 0; i < newTextList.length; i++){
            if(newTextList[i].name == textBoxToUpdate){
                newTextList[i] = newText;
                break;
            }
        }
        this.setState({
            textBoxList : newTextList,
            bugCounter : updatedBugCounter
        })
    }

    textBoxDrag = (textBoxToUpdate, newCoordi) => {
        const newTextList = this.state.textBoxList;
        const updatedBugCounter = this.state.bugCounter + 1;
        for(var i = 0; i < newTextList.length; i++){
            if(newTextList[i].name == textBoxToUpdate){
                newTextList[i] = newCoordi;
                break;
            }
        }
        this.setState({
            textBoxList : newTextList,
            bugCounter : updatedBugCounter
        })
    }

    closeImage = (imageToDelete) => {
		const newImageList = _.filter(this.state.imageList, imageListElement => imageListElement.name !== imageToDelete)
        const updatedBugCounter = this.state.bugCounter + 1;
		this.setState({
			imageList : newImageList,
			bugCounter : updatedBugCounter
		})
    }
    
    imageDrag = (imageToUpdate, newStyle) => {
        const newImageList = this.state.imageList;
        const updatedBugCounter = this.state.bugCounter + 1;
        for(var i = 0; i < newImageList.length; i++){
            if(newImageList[i].name == imageToUpdate){
                newImageList[i] = newStyle;
                break;
            }
        }
        this.setState({
            imageList : newImageList,
            bugCounter : updatedBugCounter
        })
    }


    createTextBox = (e) => {
        console.log("create", e)
        return(
			<div key = {e['fontSize'] + e['color']}>
                <LogoText style = {e} 
                             handleCloseTextBoxCallback = {this.closeText} 
                             handleLogoTextBoxTextChangeCallback = {this.textBoxChange} 
                             handleTextBoxDragCallback = {this.textBoxDrag} 
                />
			</div>
		)
    }
    createImage = (e) =>{
        console.log("image ", e)
		return(
			<div key = {e.name.length + 3}>
                <LogoImage style = {e} 
                           handleCloseImageCallback = {this.closeImage}  
                           handleImageResizeDragCallback = {this.imageDrag}
                           onClick={(event) => this.handleChangeFocus(event)}
                />
			</div>
		)
		
	}
    addText = () =>{
        console.log("add Text to list")
        const textCounter = this.state.textBoxCounter + 1;
        const textName = "text" + textCounter;
        const newText = {
            name : textName,
            text : this.state.text,
            color : this.state.color,
            fontSize : parseInt(this.state.fontSize) + "pt",
            background: "transparent",
            border : "none",
            x : 300,
            y : 300
        }
        const newTextList = this.state.textBoxList;
        newTextList.push(newText)
        console.log("check xy",newText)
        this.setState({
            textBoxList: newTextList,
            textBoxCounter: textCounter
        });
        
    }
    addImage = () => {
        console.log("add Image")
        const reg =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if(reg.test(this.state.imageURL)){
			const imageCounter = this.state.imageCounter+1;
			const newImageListName = 'image' + imageCounter + this.state.imageURL;
			const newImage = {
				name : newImageListName, 
				source : this.state.imageURL,
				width : 400,
				height : 500, 
				x : 400, 
				y : 100
            }
            const newImageList = this.state.imageList
            newImageList.push(newImage)
			this.setState({
				imageList : newImageList,
				currentImageLink : "",
				imageCounter : imageCounter
			});
		} else {
            console.log("Wrong URL received")
			this.setState({imageErrorAlert : true, currentImageLink : ""})
		}

    }


    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderThickness, padding, margin;
        console.log("State Print!", this.state);
        
        return (
            <Query query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                        console.log(data.logo.text);
                        console.log("last update: ", data.logo.lastUpdate);

                        const style = {
                            
                            borderColor: this.state.borderColor,
                            backgroundColor: this.state.backgroundColor, 
                            borderRadius: parseInt(this.state.borderRadius) + "px",
                            borderWidth: parseInt(this.state.borderWidth) + "px",
                            borderStyle: "solid",
                            margin: parseInt(this.state.margin) + "px",
                            height: parseInt(this.state.height) + "px",
                            width: parseInt(this.state.width) + "px",
                            position : "absolute",
                            textBoxFontColor : this.state.textBoxFontColor,
                            textBoxFontSize : parseInt(this.state.textBoxFontSize) + "pt"
                
                        }
                   
                   

                    return (
                                             
                         

                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                <div className="panel panel-default">
                                    
                                    <GologoloNavBar currentScreen = "Edit Logo"/>
                                        <div id = "creatHeading"className="panel-heading">
        
                                </div>
                                    <div className="panel-body">                                           
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: {
                                                    id:data.logo._id,
                                                    backgroundColor : this.state.backgroundColor,
                                                    borderColor : this.state.borderColor,
                                                    borderRadius : parseInt(this.state.borderRadius),
                                                    borderWidth : parseInt(this.state.borderWidth),
                                                    
                                                    margin : parseInt(this.state.margin),
                                                    height : parseInt(this.state.height),
                                                    border : this.state.border,
                                                    width : parseInt(this.state.width),
                                                    position : this.state.position,
                                                    textBoxFontColor : this.state.textBoxFontColor,
                                                    textBoxFontSize : parseInt(this.state.textBoxFontSize),
                                                    textBoxList : this.state.textBoxList,
                                                    imageList : this.state.imageList
                                                },
                                            });
                                            
        
        
                                        }} style = {{marginLeft : "-200px"}}>
                                            <div stylestyle={{ width: '1200px', borderStyle: "solid", borderColor: "black" }}>
                                                <div id ="left-panel"className="col s4 panel-body" style={{ left: "0", width: '200px', 
                                                marginTop: "1%",float: 'left', borderStyle: "solid",borderRadius: "5%", borderColor: "black",
                                                backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                                                    <div className="form-group">
                                                        <label htmlFor="backgroundColor">Background Color:</label>
                                                        <input type="color" className="form-control" name="backgroundColor" 
                                                         placeholder="Background Color" defaultValue={this.state.backgroundColor} onChange={this.backgroundColorChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderColor">Border Color:</label>
                                                        <input type="color" className="form-control" name="borderColor" 
                                                         placeholder="Border Color" defaultValue={this.state.borderColor} onChange={this.borderColorChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderRadius">Border Radius:</label>
                                                        <input type="number" className="form-control" name="borderRadius" 
                                                         min='0' max='50' placeholder="Border Radius" defaultValue={20} onChange={this.borderRadiusChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="borderWidth">Border Width:</label>
                                                        <input type="number" className="form-control" name="borderWidth" 
                                                        min='0' max='144' placeholder="Border Width" defaultValue={this.state.borderWidth} onChange={this.borderWidthChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="margin">Margin:</label>
                                                        <input type="number" className="form-control" name="margin" 
                                                         min='0' max='100' placeholder="Margin" defaultValue={10} onChange={this.marginChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="width">Width:</label>
                                                        <input type="number" className="form-control" name="width" 
                                                         min='100' max='1000' placeholder="Canvas Width" defaultValue={this.state.width} onChange={this.widthChange} />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="height">Height:</label>
                                                        <input type="number" className="form-control" name="height" 
                                                         min='100' max='1000' placeholder="Canvas Height" defaultValue={this.state.height} onChange={this.heightChange} />
                                                    </div>
                                                    <button type="submit" className="btn btn-success">Submit</button>
                                                </div>
                                            </div>
                                        </form>
                                        {loading && <p>Loading...</p>}
                                        {error && <p>Error :( Please try again</p>}
                                    </div>
                                    <div id = "canvaspane" className='col s6' style = {{display : "flex"}}>
                                <LogoCanvas 
                                        styles = {style}
                                        textBoxList = {this.state.textBoxList}
                                        imageList = {this.state.imageList}
                                        imageErrorAlert = {this.state.imageErrorAlert}
                                        currentImageLink = {this.state.imageURL}
                                        // downloadImageCallback = {this.downloadImage}
                                        createTextCallback = {this.createTextBox}
                                        createImageCallback = {this.createImage}
                                        
                                        // onCurrentImageLinkChangeCallback = {this.onCurrentImageLinkChange}
                                        // handleImageErrorAlertCloseCallback = {this.handleImageErrorAlertClose}
                                        handleCloseImageCallback = {this.handleCloseImage}
                                         handleCloseTextBoxCallback = {this.closeText}
                                    />
                                </div>
                                <form onSubmit={(e) => {
                                    
                                }} style = {{marginLeft : "930px"}}>
                                   
                                <div id = "rightone" className = 'righttside' style={{ left: "700", width: '400px', 
                                                marginTop: "1%",float: 'left', borderStyle: "solid",borderRadius: "5%", borderColor: "black",
                                                backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                                                     <h3>Create Text Box</h3>
                                    <div className="form-group">
                                        <label htmlFor="margin">Text:</label>
                                        <input type="String" className="form-control" name="Text" 
                                         placeholder="text" defaultValue={"TEXT"} onChange={this.textChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="TextColor">Text Color:</label>
                                        <input type="color" className="form-control" name="Color"
                                         placeholder="Text Color" defaultValue={"black"}  onChange={this.colorChange}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="font-size">Font-Size:</label>
                                        <input type="number" className="form-control" name="fontSize"
                                         min='0' max='100' placeholder="FontSize" defaultValue={20} onChange={this.fontSizeChange}/>
                                    </div>
                                    <button type="button" className="btn btn-success" onClick = {this.addText}>Create</button>
                                </div>
                                </form>
        
                                <form style = {{marginLeft : "930px"}}>
                                   
                                <div id = "rightone" className = 'righttside' style={{ left: "700", width: '400px', 
                                                marginTop: "16%",float: 'left', borderStyle: "solid",borderRadius: "5%", borderColor: "black",
                                                backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                                                     <h3>Create Image Box</h3>
                                    <div className="form-group">
                                        <label htmlFor="margin">Image URL:</label>
                                        <input type="String" className="form-control" name="source"
                                        placeholder="source" defaultValue={"IMG URL"} />
                                    </div>
                                    
                                    <button type="submit" className="btn btn-success" onClick = {this.addImage}>Insert</button>
                                </div>
                                </form>
        
                                </div>
                                
                                
                            </div>
                        )}
                    </Mutation>
                );
                }}
            </Query>
        );
    }
}

export default EditLogoScreen;