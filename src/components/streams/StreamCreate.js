import React, { Component } from "react";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import { createStream } from "../../actions";

class StreamCreate extends Component {
  renderInput = ({ label, input, meta }) => {
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;
    return (
      <div className={className}>
        <label> {label} </label>
        <input {...input} />
        <div className="ui error message">{this.renderError(meta)}</div>
      </div>
    );
  };
  renderError({ error, touched }) {
    if (touched && error) {
      return error;
    } else {
      return null;
    }
  }
  onSubmit = formValues => {
    this.props.createStream(formValues);
  };

  render() {
    return (
      <form
        className="ui form error"
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <div className="field">
          <Field
            name="title"
            component={this.renderInput}
            label="Enter Title"
          />
        </div>
        <div className="field">
          <Field
            name="description"
            component={this.renderInput}
            label="Enter Description"
          />
        </div>

        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

const validate = formValues => {
  const errors = {};
  if (!formValues.title) {
    errors.title = "You must enter a title";
  }
  if (!formValues.description) {
    errors.description = "You must enter a description";
  }
  return errors;
};
const formWrapped = reduxForm({
  form: "StreamCreate",
  validate
})(StreamCreate);

export default connect(
  null,
  {
    createStream
  }
)(formWrapped);
