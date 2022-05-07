import React from 'react';
import { connect } from 'react-redux';
import { fetchStreams } from '../../actions'

class StreamList extends React.Component {
    componentDidMount() {
        this.props.fetchStreams();
    }

    renderAdmin(stream) {
        if (stream.userId === this.props.currentUserId) {
            return (
                <div className="right floated content">
                    <button className="ui button primary">EDIT</button>
                    <button className="ui button negative">DELETE</button>
                </div>
            );
        }
    }

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera"></i>
                    <div className="content">
                        {stream.title}
                        <div className="description">{stream.description}</div>
                    </div>
                </div>
            )
        })
    }

    render() {
        // 2 note about calling functions 
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { 
        streams: Object.values(state.streams), //1
        currentUserId: state.auth.userId
    } 
}

export default connect( 
    mapStateToProps, 
    { fetchStreams }
)(StreamList);


// 1 built-in JS method: takes values from object and turns them into an array

// 2 renderList() instead of renderList --> cause we want to call it as soon as the component is rendered
// for instance: onClick={this.renderList} would work