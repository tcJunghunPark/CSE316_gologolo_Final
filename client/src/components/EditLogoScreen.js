import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

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
    $textBoxList : [logoTextBoxInput]!,
    $imageList : [logoImageInput]!
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
let inputText, inputColor,inputBorder, inputFontSize,inputBackgroundColor,inputBorderThickness,inputBorderRadius,inputBorderColor,inputPadding,inputMargin;

class EditLogoScreen extends Component {
    
    componentWillMount () {
        const {handle} = this.props.match.params
        const {text} = this.props.location.state
        const {color} = this.props.location.state
        const {fontSize} = this.props.location.state
        const {backgroundColor} = this.props.location.state
        const {borderThickness} = this.props.location.state
        const {borderRadius} = this.props.location.state
        const {borderColor} = this.props.location.state
        const {padding} = this.props.location.state
        const {margin} = this.props.location.state
        const {border} = this.props.location.state
        
        
        inputText = text;
        inputBackgroundColor = backgroundColor;
        inputBorderColor = borderColor;
        inputBorderRadius = borderRadius;
        inputBorderThickness = borderThickness;
        inputFontSize = fontSize;
        inputColor = color;
        inputPadding = padding;
        inputMargin = margin;
        inputBorder = border;
        

        this.setState({
            text: inputText,
            color: inputColor,
            fontSize: inputFontSize,
            backgroundColor: inputBackgroundColor,
            
            borderRadius: inputBorderRadius,
            border:  inputBorder,
            padding: inputPadding,
            margin: inputMargin,
            borderThickness: inputBorderThickness,
            borderColor: inputBorderColor,
            width: '600px',
            float: 'left'
            
        });
    }
        
    
    textChange = (e) => {
        
        this.setState({ text : e.target.value});
    }
    colorChange = (e) => {
        
        this.setState({color : e.target.value});

    }
    fontSizeChange = (e) => {
       
        this.setState({fontSize: e.target.value + "pt"});
    }
    backgroundColorChange = (e) => {
        console.log("background");
        this.setState({backgroundColor: e.target.value});
    }
    borderRadiusChange = (e) => {
        console.log("borderRadius Change");
        this.setState({borderRadius: e.target.value + "%"});
            
    }
    borderThicknessChange = (e) => {
        console.log("borderThickness Change");
        this.setState({borderThickness: e.target.value,
            border: e.target.value + "px solid" + this.state.borderColor});
    }
    borderColorChange = (e) => {
        console.log("border color Change");
        this.setState({borderColor: e.target.value,
            border: this.state.borderThickness + "px solid" + e.target.value});
    }
    paddingChange = (e) => {
        console.log("padding Change");
        this.setState({padding: e.target.value + "px"});
    }
    marginChange = (e) => {
        console.log("margin Change");
        this.setState({margin: e.target.value + "px"});
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
                   
                   

                    return (
                                             
                         

                        <Mutation mutation={UPDATE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push(`/`)}>
                            {(updateLogo, { loading, error }) => (
                                <div className="container">
                                    <div className="panel panel-default">
                                        <div className="panel-heading">
                                            <button><h4><Link to="/">Home</Link></h4></button>
                                            <h3 className="panel-title">
                                                Edit Logo
                                        </h3>
                                        </div>
                                        <div className="col s3" >                                            
                                            <form onSubmit={e => {
                                                e.preventDefault();
                                                updateLogo({ variables: { id: data.logo._id, text: text.value, color: color.value, fontSize: parseInt(fontSize.value),
                                                    backgroundColor: backgroundColor.value, borderColor: borderColor.value, borderRadius: parseInt(borderRadius.value),
                                                    borderThickness: parseInt(borderThickness.value), padding: parseInt(padding.value), margin: parseInt(margin.value) } });
                                                text.value = "";
                                                color.value = "";
                                                fontSize.value = "";
                                                backgroundColor.value = "";
                                                borderColor.value = "";
                                                borderRadius.value = "";
                                                borderThickness.value = "";
                                                padding.value = "";
                                                margin.value = "";
                                                
                                            }}><div stylestyle = {{width: '1200px'}}>
                                                <div className="col s4 panel-body" style={{left: "0", width: '300px', float: 'left'}}>
                                                
                                                <div className="form-group">
                                                    <label htmlFor="text">Text:</label>
                                                    <input type="text" className="form-control" name="text" ref={node => {
                                                        text = node;
                                                    }}  placeholder="Text" defaultValue={data.logo.text} onChange={this.textChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="color">Color:</label>
                                                    <input type="color" className="form-control" name="color" ref={node => {
                                                        color = node;
                                                    }} placeholder="Color" defaultValue={data.logo.color} onChange={this.colorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="fontSize">Font Size:</label>
                                                    <input type="number" className="form-control" name="fontSize" ref={node => {
                                                        fontSize = node;
                                                    }} min = '2' max = '144' placeholder="Font Size" defaultValue={data.logo.fontSize} onChange={this.fontSizeChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="backgroundColor">Background Color:</label>
                                                    <input type="color" className="form-control" name="backgroundColor" ref={node => {
                                                        backgroundColor = node;
                                                    }} placeholder="Background Color" defaultValue={data.logo.backgroundColor} onChange={this.backgroundColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderColor">Border Color:</label>
                                                    <input type="color" className="form-control" name="borderColor" ref={node => {
                                                        borderColor = node;
                                                    }} placeholder="Border Color" defaultValue={data.logo.borderColor} onChange={this.borderColorChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderRadius">Border Radius:</label>
                                                    <input type="number" className="form-control" name="borderRadius" ref={node => {
                                                        borderRadius = node;
                                                    }}min = '0' max = '50' placeholder="Border Radius" defaultValue={data.logo.borderRadius} onChange={this.borderRadiusChange} />
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="borderThickness">Border Thickness:</label>
                                                    <input type="number" className="form-control" name="borderThickness" ref={node => {
                                                        borderThickness = node;
                                                    }} min = '0' max = '144' placeholder="Border Thickness" defaultValue={data.logo.borderThickness} onChange={this.borderThicknessChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="padding">Padding:</label>
                                                    <input type="number" className="form-control" name="padding" ref={node => {
                                                        padding = node;
                                                    }} min = '0' max = '144' placeholder="Padding" defaultValue={data.logo.padding} onChange={this.paddingChange}/>
                                                </div>
                                                <div className="form-group">
                                                    <label htmlFor="margin">Margin:</label>
                                                    <input type="number" className="form-control" name="margin" ref={node => {
                                                        margin = node;
                                                    }} min = '0' max = '100' placeholder="Margin" defaultValue={data.logo.margin} onChange={this.marginChange}/>
                                                </div>
                                                <button type="submit" className="btn btn-success">Submit</button>
                                                </div>
                                                </div>
                                                
                                            </form>
                                            {loading && <p>Loading...</p>}
                                            {error && <p>Error :( Please try again</p>}
                                        </div>
                                        </div>
                                        <div 
                                        style={ this.state }>
                                        {this.state.text}
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