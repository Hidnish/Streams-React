import React from "react";
import _ from 'lodash';
import { connect } from "react-redux";
import { fetchStream, editStream } from "../../actions";
import StreamForm from './StreamForm';

class StreamEdit extends React.Component {
    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id);
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
    }

	render() {
        console.log(this.props.stream)
        //2
        if (!this.props.stream) {
            return <div>Loading...</div>
        }
		return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm 
                    initialValues={_.pick(this.props.stream, 'title', 'description')} //3
                    onSubmit={this.onSubmit} 
                />
            </div>
        );
	}
}

//1
const mapStateToProps = (state, ownProps) => {
	return {
		stream: state.streams[ownProps.match.params.id],
	};
};

export default connect(
    mapStateToProps,
    { fetchStream, editStream }
)(StreamEdit);

//1 ownProps -> reference to the props inside the StreamEdit component (not the ones coming from the REDUX state)

//2 Returns undefined when page is rendered initially by typing address/refreshing page (i.e. streams/edit/:id) because there -->
// --> is no 'id' state in redux store yet ---> try do console.log(this.props.match) and (this.props.stream), 'stream' is undefined initially

//3 Since ReduxForm is wrapping around StreamForm, initialValues are taken by ReduxForm and passed as default -->
//--> values for the properties: title, description (don't add properties you don't want to change, i.e. 'id')
//3.2 _.pick() creates a new object with the desired properties
