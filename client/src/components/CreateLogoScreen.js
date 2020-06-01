import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { Link } from 'react-router-dom';
import GologoloNavBar from './GologoloNavBar.js';
import LogoText from './LogoTextBox.js';
import LogoImage from './LogoImage.js';
import * as html2Canvas from 'html2canvas';


const ADD_LOGO = gql`
    mutation AddLogo(
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
    $textBoxList : [logoTextBoxInput]!,
    $imageList : [logoImageInput]!
  ) {
    addLogo(
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
      _id
    }
  }
`;

class CreateLogoScreen extends Component {
    state = {
        text: "Text",
        color: "#00ff00",
        fontSize: 30 + "pt",
        backgroundColor: "#0000ff",

        borderRadius: 30 + "%",
        border: 10 + "px solid " + "#1b1867",
        padding: 10 + "px",
        margin: 10 + "px",
        borderWidth: 10,
        borderColor: "#1b1867",
        width: '600px',
        float: 'left'

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
        return (
            <Mutation mutation={ADD_LOGO} onCompleted={() => this.props.history.push('/')}>
                {(addLogo, { loading, error }) => (
                    <div className="container">
                        <div className="panel panel-default">
                            <div className="panel-heading">
                                <button><h4><Link to="/">Home</Link></h4></button>
                                <h3 className="panel-title">
                                    Create Logo
                            </h3>
                            </div>
                            <div className="panel-body">
                                <form onSubmit={e => {
                                    e.preventDefault();
                                    addLogo({
                                        variables: {
                                            text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                            backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                            borderWidth: parseInt(borderWidth.value), padding: parseInt(padding.value), margin: parseInt(margin.value)
                                        }
                                    });
                                    text.value = "";
                                    color.value = "";
                                    fontSize.value = "";
                                    backgroundColor.value = "";
                                    borderColor.value = "";
                                    borderRadius.value = "";
                                    borderWidth.value = "";
                                    padding.value = "";
                                    margin.value = "";


                                }}>
                                    <div stylestyle={{ width: '1200px' }}>
                                        <div className="col s4 panel-body" style={{ left: "0", width: '300px', float: 'left' }}>
                                            <div className="form-group">
                                                <label htmlFor="text">Text:</label>
                                                <input type="text" className="form-control" name="text" ref={node => {
                                                    text = node;
                                                }} placeholder="Text" defaultValue={this.state.text} onChange={this.textChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="color">Color:</label>
                                                <input type="color" className="form-control" name="color" ref={node => {
                                                    color = node;
                                                }} placeholder="Color" defaultValue={this.state.color} onChange={this.colorChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="fontSize">Font Size:</label>
                                                <input type="number" className="form-control" name="fontSize" ref={node => {
                                                    fontSize = node;
                                                }} min='2' max='144' placeholder="Font Size" defaultValue={30} onChange={this.fontSizeChange} />
                                            </div>
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
                                                <label htmlFor="borderWidth">Border Thickness:</label>
                                                <input type="number" className="form-control" name="borderWidth" ref={node => {
                                                    borderWidth = node;
                                                }} min='0' max='144' placeholder="Border Thickness" defaultValue={10} onChange={this.borderWidthChange} />
                                            </div>
                                            <div className="form-group">
                                                <label htmlFor="padding">Padding:</label>
                                                <input type="number" className="form-control" name="padding" ref={node => {
                                                    padding = node;
                                                }} min='0' max='144' placeholder="Padding" defaultValue={10} onChange={this.paddingChange} />
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
                        </div>
                        <div className='col s6'
                            style={this.state}>
                            {this.state.text}
                        </div>
                    </div>
                )}
            </Mutation>
        );
    }
}

export default CreateLogoScreen;