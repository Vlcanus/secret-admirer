import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import NavLink from './components/NavLink.jsx';
import Saved from './components/savedImage.jsx';
import SearchImage from './components/searchImage.jsx'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            celebrity: "",
            isLoaded: false,
            username: "",
            isLogout: false
        }
        this.getNavLinkData = this.getNavLinkData.bind(this);
    }
    
    componentDidMount(){
        var searchCelebrity = this.props.celebrity;
        console.log('Searched: ' + searchCelebrity);
        this.setState({celebrity: searchCelebrity, isLoaded:true});
    }

    getNavLinkData = (childData) => {
        // Rerender search page when new state is updated
        this.setState({
            isLoaded: false
        }, () => {
            this.setState({
                celebrity: childData.celebrity,
                username: childData.username,
                isLoaded: true
            })
        })
    }

    render() { 
        const { isLoaded } = this.state;
        return (
            <Router>
                <div>
                    <NavLink parentCallback = {this.getNavLinkData}/>
                    <Switch>
                        <Route path="/saved" component={Saved}/>
                        {isLoaded ? <SearchImage celebrity={this.state.celebrity} username={this.state.username}/> : null}
                    </Switch>
                </div>  
            </Router>
        );
    }
}
 
export default Main;
