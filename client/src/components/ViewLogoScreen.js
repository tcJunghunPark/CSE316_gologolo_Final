import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

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
            textBoxList{
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

    createTextBox = (e) => {
        console.log("create", e)
        return(
			<div key = {e['fontSize'] + e['color']}>
                <LogoText style = {e} 
                            disableDraggingBoolean = {true}
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
                />
			</div>
		)
		
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
                    var logoTitle = ""
                    _.map(data.logo.textBoxList, textBoxListElement => logoTitle += textBoxListElement.text)

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <GologoloNavBar currentScreen = "View Screen"/>
                                    
                                    
                                </div>

                                <div style = {{width: '1200px'}}>
                                <div className="col s4 panel-body" style={{ left: "0", width: '200px', 
                                        marginTop: "1%",float: 'left', borderStyle: "solid",borderRadius: "5%", borderColor: "black",
                                        backgroundColor: "rgb(175, 137, 211)" , padding : "20px 20px 20px 20px"}}>
                                    <dl className="col s4" >
                                        <dt>Text:</dt>
                                        <dd>{logoTitle}</dd>
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
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={{pathname: `/edit/${data.logo._id}`
                                                    // , state: {
                                                    //      text: data.logo.text,
                                                    //      color: data.logo.color,
                                                    //      fontSize: data.logo.fontSize + "pt",
                                                    //      backgroundColor: data.logo.backgroundColor,
                                                         
                                                    //      borderRadius: data.logo.borderRadius + "%",
                                                    //      border: data.logo.borderThickness + "px solid " + data.logo.borderColor,
                                                    //      padding: data.logo.padding + "px",
                                                    //      margin: data.logo.margin+ "px",
                                                    //      borderThickness: data.logo.borderThickness,
                                                    //      borderColor: data.logo.borderColor
                                                    // }
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