import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import TextFieldGroup from "../common/TextFieldGroup";
//import NumericInput from "react-numeric-input";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      rate: 5,
      days: 1,
      errors: {} 
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;

    const newPost = {
      text: this.state.text,
      rate: this.state.rate,
      days: this.state.days,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
    this.setState({ rate: 5 });
    this.setState({ days: 1 });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Post your job...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a Job post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                  info="Description related to your project"
                />
                <TextFieldGroup
                  placeholder="Rate"
                  name="rate"
                  type="number"
                  value={this.state.rate}
                  onChange={this.onChange}
                  error={errors.rate}
                  info="State the amount you will pay"
                />
                {/* <NumericInput
                  className="form-control"
                  min={0}
                  max={100}
                  value={this.state.days}
                  onChange={this.onChange}
                  error={errors.days}
                /> */}
                <TextFieldGroup
                  placeholder="Total days"
                  name="days"
                  type="number"
                  value={this.state.days}
                  onChange={this.onChange}
                  error={errors.days}
                  info="Total days your project rquires"
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addPost }
)(PostForm);
