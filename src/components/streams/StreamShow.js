import React from "react";
import flv from "flv.js";
import { connect } from "react-redux";
import { fetchStream } from "../../actions";

class StreamShow extends React.Component {
    constructor(props) {
        super(props);
        this.videoRef = React.createRef(); //2
    }

    componentDidMount() {
        const { id } = this.props.match.params;

        this.props.fetchStream(id);
        this.buildPlayer();
    }

    componentDidUpdate() {
        this.buildPlayer();
    }

    componentWillUnmount() {
        this.player.destroy(); //3 
    }

    buildPlayer() {
        if (this.player || !this.props.stream ) { //1 
            return
        } 

        const { id } = this.props.match.params
        
        this.player = flv.createPlayer({
            type: 'flv',
            url: `http://localhost:8000/live/${id}.flv`
        })

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
        
    }

	render() {
        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        const {title, description} = this.props.stream;

		return (
            <div>
                <video ref={this.videoRef} style={{ width: "100%" }} controls={true}></video>
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        );
	}
}

const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id] };
}

export default connect(
    mapStateToProps, 
    { fetchStream }
)(StreamShow);


//1 If we have the player already or if we don't have a stream yet --> do not build the player

//2 When the ref attribute is used on an HTML element, -->
// --> the ref created in the constructor with React.createRef() receives the underlying DOM element as its current property

//3 cleanup video player after changing page