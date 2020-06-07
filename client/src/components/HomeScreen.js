import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import GologoloNavBar from './GologoloNavBar.js';
import { Grid, Button } from '@material-ui/core';

const GET_LOGOS = gql`
  {
    logos {
      _id
      name
      textBoxList{
          name
          text
          color
          fontSize
          x
          y
      }
      lastUpdate
    }
  }
`;

class HomeScreen extends Component {
    getTitle (logo) {
        console.log("logo: ", logo);
        var title = ""
        title = logo.name;
        
        return title
    }
    render() {
        let createClass = "waves-effect waves-light btn-small";
        
        return (
            <Query pollInterval={500} query={GET_LOGOS}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;
                    console.log("homescreen", data.logos);
                    //console.log("last update", data.logos);

                    return (
                    <div>
                           <div id = "homeNavBar">
                           
                           </div>
                           <GologoloNavBar currentScreen = "Home"/>
                        <Grid container xs = {12}>  
                        <div className="container_home">
                            <div className="col s4 ">
                                <div id = "workList">
                                        <div id = "recentwork"style = {{backgroundColor: "rgb(106, 37, 172)"}}>
                                            <h3 style = {{marginLeft: "13%"}}>Recent Works</h3>
                                        </div>
                                    
                                {data.logos.sort(function(logo1, logo2){
                                    if(logo1.lastUpdate == logo2.lastUpdate){
                                        return 0;
                                    }else if(logo1.lastUpdate < logo2.lastUpdate){
                                        return 1;
                                    }else{
                                        return -1;
                                    }
                                }).map((logo, index) => (
                                    <div key={index} className='home_logo_link'
                                        style={{ cursor: "pointer" }}>
                                        <Link to={`/view/${logo._id}`}>{"* " + this.getTitle(logo)}</Link>
                                    </div>
                                
                                ))}
                                </div>
                            </div>
                            </div>
                            <div className="col s8">
                                <div id="home_banner_container">
                                    @Gologolo<br />
                                    Logo Maker
                                </div>
                                <div>
                                   <button className = {createClass}> <Link id="add_logo_button" to="/create">Add Logo</Link></button>
                                   
                                </div>
                                
                            </div>
                            
                        
                        </Grid>
                        </div>
                    );
                }
                }
            </Query >
        );
    }
}

export default HomeScreen;