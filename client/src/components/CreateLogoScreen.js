import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import GologoloNavBar from './GologoloNavBar.js';
import LogoText from './LogoText.js';
import LogoImage from './LogoImage.js';
import LogoCanvas from './LogoCanvas.js';
import * as html2Canvas from 'html2canvas';


const ADD_LOGO = gql`
    mutation AddLogo(
        $backgroundColor: String!
    $borderColor: String!
    $borderRadius: Int!
    $borderWidth: Int!
    $padding: Int!,
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
    addLogo(
      backgroundColor: $backgroundColor,
      borderColor: $borderColor,
      borderRadius: $borderRadius,
      borderWidth: $borderWidth,
      padding: $padding,
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
      _id
    }
  }
`;

class CreateLogoScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            backgroundColor: "#0000ff", 
            borderColor: "#1b1867",
            borderRadius: 20 + "%",
            borderWidth: 10,
            border: "solid", 
            margin: 10 + "px",

            height: 750,
            width: 800,
            position : "absolute", 

            textBoxFontColor : "#000000",
            textBoxFontSize : 12,

            currentImageLink : "", 
            textBoxCounter : 1,
            imageCounter : 1,
            bugCounter : 0,
            imageErrorAlert : false, 

            textBoxList : [
                {
                    name : "text1",
                    text: "text1",
                    color: "#00ff00",
                    fontSize: "30px",
                    background : "transparent",
                    border : "none",
                    x: 30,
                    y: 30
                },
            ],
            imageList : [
                {
                    name : "image1",
                    source : "https://georgetownvoice.com/wp-content/uploads/2019/11/mcr.png",
                    width : 300,
                    height : 300,
                    x : 400,
                    y : 400,
                },
            ],


        };
    }
    
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

    render() {
        let text, color, fontSize, backgroundColor, borderColor, borderRadius, borderWidth, padding, margin;
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
            textBoxFontSize : parseInt(this.state.textBoxFontSize) + "px"

        }
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            
                            <GologoloNavBar currentScreen = "Create Logo"/>
                            <div id = "creatHeading"className="panel-heading">
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({
                                        variables: {
                                            backgroundColor : this.state.backgroundColor,
                                            borderColor : this.state.borderColor,
                                            borderRadius : parseInt(this.state.borderRadius),
                                            borderWidth : parseInt(this.state.borderWidth),
                                            padding : parseInt(this.state.padding),
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
                                                <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                    backgroundColor = node;
                                                }} placeholder="Background Color" defaultValue={this.state.backgroundColor} onChange={this.backgroundColorChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderColor">Border Color:</label>
                                                <input type="color" className="form-control" name="borderColor" ref={node => {
                                                    borderColor = node;
                                                }} placeholder="Border Color" defaultValue={this.state.borderColor} onChange={this.borderColorChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderRadius">Border Radius:</label>
                                                <input type="number" className="form-control" name="borderRadius" ref={node => {
                                                    borderRadius = node;
                                                }} min='0' max='50' placeholder="Border Radius" defaultValue={30} onChange={this.borderRadiusChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="borderWidth">Border Width:</label>
                                                <input type="number" className="form-control" name="borderWidth" ref={node => {
                                                    borderWidth = node;
                                                }} min='0' max='144' placeholder="Border Width" defaultValue={10} onChange={this.borderWidthChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="margin">Margin:</label>
                                                <input type="number" className="form-control" name="margin" ref={node => {
                                                    margin = node;
                                                }} min='0' max='100' placeholder="Margin" defaultValue={10} onChange={this.marginChange} />
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
                                currentImageLink = {this.state.currentImageLink}
                                // downloadImageCallback = {this.downloadImage}
                                // createTextBoxCallback = {this.createTextBox}
                                // createImageCallback = {this.createImage}
                                // addTextBoxCallback = {this.addTextBox}
                                // addImageCallback = {this.addImage}
                                // onCurrentImageLinkChangeCallback = {this.onCurrentImageLinkChange}
                                // handleImageErrorAlertCloseCallback = {this.handleImageErrorAlertClose}
                                // handleCloseImageCallback = {this.handleCloseImage}
                                // handleCloseTextBoxCallback = {this.handleCloseTextBox}
                            />
                        </div>
                        <form style = {{marginLeft : "930px"}}>
                        <div id = "rightone"clssName = 'righttside' style={{ left: "700", width: '400px', 
                                        marginTop: "1%",float: 'left', borderStyle: "solid",borderRadius: "5%", borderColor: "black",
                                        backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                            add text
                        </div>
                        <div id = "rightone"clssName = 'righttside' style={{ left: "700", width: '400px', 
                                        marginTop: "1%",float: 'left', borderStyle: "solid",borderRadius: "5%", borderColor: "black",
                                        backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                            add image
                        </div>
                        </form>
                        </div>
                        
                        
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;