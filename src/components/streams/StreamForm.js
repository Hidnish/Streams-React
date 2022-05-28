import React from "react";
import { Form, Field } from "react-final-form";

const StreamForm = (props) => {
	const renderError = ({ error, touched }) => {
		if (touched && error) {
			return (
				<div className="ui error message">
					<div className="header">{error}</div>
				</div>
			);
		}
	};

	const renderInput = ({ input, label, meta }) => {
		const className = `field ${meta.error && meta.touched ? "error" : ""}`;
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off" />
				{renderError(meta)}
			</div>
		);
	};

	const onSubmit = (formValues) => {
		props.onSubmit(formValues);
	};

	return (
		<Form
			initialValues={props.initialValues}
			onSubmit={onSubmit}
			validate={(formValues) => {
				const errors = {};

				if (!formValues.title) {
					errors.title = "You must enter a title";
				}

				if (!formValues.description) {
					errors.description = "You must enter a description";
				}

				return errors;
			}}
			render={({ handleSubmit }) => (
				<form onSubmit={handleSubmit} className="ui form error">
					<Field
						name="title"
						component={renderInput}
						label="Enter Title"
					/>
					<Field
						name="description"
						component={renderInput}
						label="Enter Description"
					/>
					<button className="ui button primary">Submit</button>
				</form>
			)}
		/>
	);
};

export default StreamForm;


// REDUX FORM VERSION

// import React from "react";
// import { Field, reduxForm } from "redux-form";

// class StreamForm extends React.Component {
// 	//8
// 	renderError({error, touched}) {
// 		if (touched && error) {
// 			return(
// 				<div className="ui error message">
// 					<div className="header">{error}</div>
// 				</div>
// 			);
// 		}
// 	}

// 	renderInput = ({ input, label, meta }) => { //1
// 		const className = `field ${meta.error && meta.touched ? 'error' : ''}`
// 		//2
// 		return (
// 			<div className={className}>
// 				<label>{label}</label>
// 				<input {...input} autoComplete="off"/>
// 				{this.renderError(meta)}
// 			</div>
// 		);
// 	}

// 	// 9
// 	onSubmit = formValues => { //3
// 		this.props.onSubmit(formValues);
// 	}

// 	//4
// 	render() { //5
// 		return (
// 			<form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
// 				<Field name="title" component={this.renderInput} label="Enter title" />
// 				<Field name="description" component={this.renderInput} label="Enter description"/>
// 				<button className="ui button primary">Submit</button>
// 			</form>
// 		);
// 	}
// }

// //6
// const validate = formValues => {
// 	const errors = {};

// 	if (!formValues.title) {
// 		errors.title = 'You must enter a message';
// 	}
// 	if (!formValues.description) {
// 		errors.description = 'You must enter a description';
// 	}
// 	return errors;

// }

// //7
// export default reduxForm({
// 	form: "streamForm",
// 	validate: validate,
// })(StreamForm);





// COMMENTS

// 1 formProps come from the <Field></Field> tag
//{input} = (formProps.input)
// use arrow function to bind 'this' to the component

// 2 new syntax: takes formProps.input propery and passes it as properties to the input element
// instead of: onChange={formProps.input.onChange} value={formProps.input.value}

// 3 preventDefault is done by this.props.handleSubmit(), which also passes formValues

// 4 you gotta pass a component to <Field></Field> to avoid error

// 5 all properties(name, label) inside <Field></Field> are passed as props to the component={}
// onSubmit={this.props.handleSubmit(this.onSubmit)} --> gotta call handleSubmit first (redux-form)

// 6 validate() is a pre-built redux-form function (can take formValues even if not inside the class)
// If <Field></Field> has a property (i.e title) that matches with a validate() object's propertiy -->
// --> errors.property's message is passed to component={this.renderInput} by Redux-form (check this.props.meta.error)

// 7 reduxForm requires an object as configuration (which contains {form: 'whatever name you want'})
// and returns a function that gets immediately called by StreamCreate
// reduxForm bring a tons of new props to the component (check using console.log(this.props))

// 8 this.props.meta.touched is a property
// You gotta give className="error" to <form></form> element in order to be able to see error messages

// 9 if you don't bind with arrow function it throws error:
// TypeError: Cannot read properties of undefined (reading 'props')

// 10 'const = formWrapped', to avoid writing 'export default connect()(reduxForm({})(streamCreate))
