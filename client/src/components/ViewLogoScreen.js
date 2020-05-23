import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';

const GET_LOGO = gql`
    query logo($logoId: String) {
        logo(id: $logoId) {
            _id
            text
            color
            fontSize
            backgroundColor
            borderColor
            borderRadius
            borderThickness
            padding
            margin
            lastUpdate
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

    render() {
        
        return (
            <Query pollInterval={500} query={GET_LOGO} variables={{ logoId: this.props.match.params.id }}>
                {({ loading, error, data }) => {
                    if (loading) return 'Loading...';
                    if (error) return `Error! ${error.message}`;

                    const styles = {
                        container: {
                            color: data.logo.color,
                            fontSize: data.logo.fontSize + "pt",
                            backgroundColor: data.logo.backgroundColor,
                            
                            borderRadius: data.logo.borderRadius + "%",
                            border: data.logo.borderThickness + "px solid " +data.logo.borderColor,
                            padding: data.logo.padding + "px",
                            margin: data.logo.margin+ "px",
                            width: '600px',
                            float: 'left'
                            
                            
                        
                        
                    }
                    }

                    return (
                        <div className="container">
                            <div className="panel panel-default">
                                <div className="panel-heading">
                                    <button><h4><Link to="/">Home</Link></h4></button>
                                    <h3 className="panel-title">
                                        View Logo
                                    </h3>
                                </div>
                                <div style = {{width: '1200px'}}>
                                <div className="col s4 panel-body" style={{left:"0", width: '300px', float: 'left'}}>
                                    <dl className="col s4" >
                                        <dt>Text:</dt>
                                        <dd>{data.logo.text}</dd>
                                        <dt>Color:</dt>
                                        <dd>{data.logo.color}</dd>
                                        <dt>Font Size:</dt>
                                        <dd>{data.logo.fontSize}</dd>
                                        <dt>Background Color:</dt>
                                        <dd>{data.logo.backgroundColor}</dd>
                                        <dt>Border Color:</dt>
                                        <dd>{data.logo.borderColor}</dd>
                                        <dt>Border Radius:</dt>
                                        <dd>{data.logo.borderRadius}</dd>
                                        <dt>Border Thickness:</dt>
                                        <dd>{data.logo.borderThickness}</dd>
                                        <dt>padding:</dt>
                                        <dd>{data.logo.padding}</dd>
                                        <dt>margin:</dt>
                                        <dd>{data.logo.margin}</dd>
                                        <dt>Last Updated:</dt>
                                        <dd>{data.logo.lastUpdate}</dd>
                                    </dl>
                                    <Mutation mutation={DELETE_LOGO} key={data.logo._id} onCompleted={() => this.props.history.push('/')}>
                                        {(removeLogo, { loading, error }) => (
                                            <div>
                                                <form
                                                    onSubmit={e => {
                                                        e.preventDefault();
                                                        removeLogo({ variables: { id: data.logo._id } });
                                                    }}>
                                                    <Link to={{pathname: `/edit/${data.logo._id}`, state: {
                                                         text: data.logo.text,
                                                         color: data.logo.color,
                                                         fontSize: data.logo.fontSize + "pt",
                                                         backgroundColor: data.logo.backgroundColor,
                                                         
                                                         borderRadius: data.logo.borderRadius + "%",
                                                         border: data.logo.borderThickness + "px solid " + data.logo.borderColor,
                                                         padding: data.logo.padding + "px",
                                                         margin: data.logo.margin+ "px",
                                                         borderThickness: data.logo.borderThickness,
                                                         borderColor: data.logo.borderColor
                                                    }}} className="btn btn-success">Edit</Link>&nbsp;
                                                <button type="submit" className="btn btn-danger">Delete</button>
                                                </form>
                                                {loading && <p>Loading...</p>}
                                                {error && <p>Error :( Please try again</p>}
                                            </div>
                                        )}
                                    </Mutation>
                                </div>
                                <div style={ styles.container }>
                                {data.logo.text}
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