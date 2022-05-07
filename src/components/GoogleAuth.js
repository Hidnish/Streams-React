import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';

class GoogleAuth extends React.Component {
    // OLD: state = { isSignedIn: null };

    componentDidMount() {
        window.gapi.load('client:auth2', () => { //1 
            window.gapi.client.init({ //2
                clientId: '1029927058022-kfoiutjro39f1batapu2ph1ht92mejuk.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance(); //3 
                // OLD: this.setState({ isSignedIn: this.auth.isSignedIn.get() })
                this.onAuthChange(this.auth.isSignedIn.get()); 
                this.auth.isSignedIn.listen(this.onAuthChange); //4
            });
        })
    }

    //5
    onAuthChange = (isSignedIn) => {
        if (isSignedIn === true) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    }

    onSignInClick = () => {
        this.auth.signIn();
    }

    onSignOutClick = () => {
        this.auth.signOut();
    }

    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            //6
            return (
                <button onClick={this.onSignOutClick} className="ui red google button"> 
                    <i className="google icon"></i>
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick={this.onSignInClick} className="ui red google button">
                    <i className="google icon"></i>
                    Sign In with Google
                </button>
            );
        }
    }

    render() {
        return <div>{this.renderAuthButton()}</div>;
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn }
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);





//1 gapi is available inside the scope of our browser (window)
// the callback inside load() is called after client:auth2 library is loaded up in gapi

//2 it returns a promise (promise = object) --> no need to add a callback

//3 this.auth --> reference to auth instance to sign_user_in/out/get_info_about_status

//4 .listen() --> allows callback function to be called when object's state changes

//5 arrow function is used to bind context (this) to the component (needed because it is a callback function)

//6 this.onSignOut --> no parenthesis 'onSignOut()' otherwise it is called automatically when component is rendered