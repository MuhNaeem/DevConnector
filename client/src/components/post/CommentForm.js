import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addComment } from "../../actions/postActions";
import TextFieldGroup from "../common/TextFieldGroup";

//import classnames from "classnames";

class CommentForm extends Component {
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

  // findUserSent(likes) {
  //   const { auth } = this.props;
  //   if (likes.filter(like => like.user === auth.user.id).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  // isDisabled() {
  //   const { post } = this.props;
  //   const { auth } = this.props;
  //   const like = post.likes;
  //   if (like.filter(like => like.user === auth.user.id).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { postId } = this.props;

    const newComment = {
      text: this.state.text,
      rate: this.state.rate,
      days: this.state.days,
      name: user.name,
      avatar: user.avatar
    };

    this.props.addComment(postId, newComment);
    this.setState({ text: "" });
    this.setState({ rate: 5 });
    this.setState({ days: 1 });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    //const { post } = this.props;
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">
            State your proposal...
          </div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Reply to post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
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

              <button
                type="submit"
                /* disabled={this.isDisabled()} */
                className="btn btn-dark"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CommentForm.propTypes = {
  addPost: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { addComment }
)(CommentForm);
