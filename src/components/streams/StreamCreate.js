import React from "react";
import { connect } from 'react-redux';
import { createStream } from '../../actions';
import StreamForm from './StreamForm';

class StreamCreate extends React.Component {

	// 9
	onSubmit = formValues => { //3 
		this.props.createStream(formValues);
	}

	//4 //5
	render() { 
		return (
			<div>
				<h3>Create a Stream</h3>
				<StreamForm onSubmit={this.onSubmit}/>
			</div>
		);
	}
}

export default connect(
	null, 
	{createStream}
)(StreamCreate);




// 3 preventDefault is done by this.props.handleSubmit(), which also passes formValues

// 4 you gotta pass a component to <Field></Field> to avoid error

// 5 Here you are passing 'formValues' not to StreamForm directly, but to ReduxForm

// 9 if you don't bind with arrow function it throws error:
// TypeError: Cannot read properties of undefined (reading 'props')



