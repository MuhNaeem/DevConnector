import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";
import TextFieldGroup from "../common/TextFieldGroup";

class PostForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "",
      rate: "",
      dateFrom: "",
      dateTo: "",
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
      dateFrom: this.state.dateFrom,
      dateTo: this.state.dateTo,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addPost(newPost);
    this.setState({ text: "" });
    this.setState({ rate: "" });
    this.setState({ dateFrom: "" });
    this.setState({ dateTo: "" });
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
                />
                <TextFieldGroup
                  placeholder="Rate"
                  name="rate"
                  value={this.state.rate}
                  onChange={this.onChange}
                  error={errors.rate}
                />
                <h6>Starting Date</h6>
                <TextFieldGroup
                  name="from"
                  type="date"
                  value={this.state.dateFrom}
                  onChange={this.onChange}
                  error={errors.dateFrom}
                />
                <h6>Ending Date</h6>
                <TextFieldGroup
                  name="to"
                  type="date"
                  value={this.state.dateTo}
                  onChange={this.onChange}
                  error={errors.dateTo}
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
