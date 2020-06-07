import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

import GologoloNavBar from './GologoloNavBar.js';
import LogoText from './LogoText.js';
import LogoImage from './LogoImage.js';
import download from 'downloadjs';
import * as html2Canvas from 'html2canvas';

import _ from "lodash";

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            name
            backgroundColor
            borderColor
            borderRadius
            borderWidth
            margin
            height
            width
            position
            textBoxList{
                name
                text
                color
                fontSize    
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

const DELETE_LOGO = gql`
  mutation removeLogo($id: String!) {
    removeLogo(id:$id) {
      _id
    }
  }
`;

class ViewLogoScreen extends Component {
    constructor(props){
        super(props);

        this.state = {}
    }
    textBoxChange = () =>{}
    textBoxDrag = () =>{}
    imageDrag = () =>{}
    

    createTextBox = (e) => {
        console.log("create", e)
        return(
			<div key = {e['fontSize'] + e['color']}>
                <LogoText style = {e} 
                            disableDraggingBoolean = {true}
                            handleTextChangeCallback = {this.textBoxChange} 
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
                          disableDraggingBoolean = {true}
                          handleImageResizeDragCallback = {this.imageDrag}
                          
                          
                />
			</div>
		)
		
    }
    downloadImage() {
		html2Canvas(document.getElementById("logoArea"), {useCORS : true}).then(function(canvas)  {  
			download(canvas.toDataURL("image/png"), "gologoloLogo.png");
		  });
	}


    render() {
        
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    const styles = {
                        borderColor: data.logo.borderColor,
                        backgroundColor: data.logo.backgroundColor, 
                        borderRadius: parseInt(data.logo.borderRadius) + "px",
                        borderWidth: parseInt(data.logo.borderWidth) + "px",
                        borderStyle: "solid",
                        margin: parseInt(data.logo.margin) + "px",
                        height: parseInt(data.logo.height) + "px",
                        width: parseInt(data.logo.width) + "px",
                        position : "fixed"
                    }
                    console.log("view logo tb", data.logo.textBoxList)

                    return (
                        <div className="container">
                            <div className="panel panel-default" style = {{marginLeft : "-200px"}}>
                                <div className="panel-heading">
                                    <GologoloNavBar currentScreen = "View Screen"/>
                                    
                                    
                                </div>

                                <div style = {{width: '1200px'}}>
                                <div className="col s4 panel-body" style={{ left: "0", width: '200px', 
                                        marginTop: "1%",float: 'left', borderStyle: "solid",borderRadius: "5%", borderColor: "black",
                                        backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                                    <dl className="col s4" >
                                        <dt>Logo Title:</dt>
                                        <dd>{data.logo.name}</dd>
                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Border Width:</dt>
                                        <dd>{data.logo.borderWidth}</dd>
                                        <dt>Margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Canvas Width:</dt>
                                        <dd>{data.logo.width}</dd>
                                        <dt>Canvas Height:</dt>
                                        <dd>{data.logo.height}</dd>
                                        

                                        
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/home')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={{pathname: `/edit/${data.logo._id}`
                                                    , state: {
                                                        name: data.logo.name,
                                                         textBoxList: data.logo.textBoxList,
                                                         imageList: data.logo.imageList,

                                                         textBoxFontColor: data.logo.textBoxFontColor,
                                                         textBoxFontSize : data.logo.textBoxFontSize + "pt",
                                                         width: data.logo.width,
                                                         height: data.logo.height,
                                                         position: data.logo.position,
                                                         backgroundColor: data.logo.backgroundColor,
                                                         
                                                         borderRadius: data.logo.borderRadius + "%",
                                                         border: data.logo.borderWidth + "px solid " + data.logo.borderColor,
                                                         
                                                         margin: data.logo.margin+ "px",
                                                         borderWidth: data.logo.borderWidth,
                                                         borderColor: data.logo.borderColor,
                                                         
                                                    }
                                                }} 
                                                    className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                                <div id = "canvasZone" style = {{marginTop: "10%",display : 'flex'}}>
                                    <div id = "logoArea" style = {styles} className = "Boxes">
                                        {_.map(data.logo.textBoxList, e => this.createTextBox(e))}
                                        {_.map(data.logo.imageList, e => this.createImage(e))}
                                    </div>
                                </div>
                                <form onSubmit={(e) => {
                            
                        }} style = {{marginLeft : "1100px"}}>
                           
                        <div id = "rightone" className = 'righttside' style={{ left: "700", width: '250px', 
                                        marginTop: "1%",float: 'left', borderStyle: "solid",borderRadius: "5%", borderColor: "black",
                                        backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                                             <h3>Export Logo</h3>
                            
                            <button type="button" className="btn btn-success" onClick = {this.downloadImage}>Export</button>
                        </div>
                        </form>
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}

export default ViewLogoScreen;