import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { deleteComment } from "../../actions/postActions";
import { addOrder } from "../../actions/orderActions";

class CommentItem extends Component {
  onDeleteClick(postId, commentId) {
    this.props.deleteComment(postId, commentId);
  }

  onOrderClick(postId, commentId) {
    console.log("order sent");
    this.props.addOrder(postId, commentId);
  }

  // findUserSent(likes) {
  //   const { auth } = this.props;
  //   if (likes.filter(like => like.user === auth.user.id).length > 0) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    const { comment, postId, auth } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
            <a href="profile.html">
              <img
                className="rounded-circle d-none d-md-block"
                src={comment.avatar}
                alt=""
              />
            </a>
            <br />
            <p className="text-center">{comment.name}</p>
          </div>
          <div className="col-md-10">
            <p className="lead">
              <h2>Description of proposal:</h2>
              {comment.text}
            </p>
            <p className="lead">
              <h2>Rate:</h2>
              {comment.rate + "$"}
            </p>
            <p className=" lead">
              <h2>Days:</h2>
              {comment.days + " days"}
            </p>
            {comment.user === auth.user.id ? (
              <button
                onClick={this.onDeleteClick.bind(this, postId, comment._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}

            <button
              onClick={this.onOrderClick.bind(this, postId, comment._id)}
              type="button"
              className="btn btn-danger mr-1"
            >
              Accept Proposal
            </button>
          </div>
        </div>
      </div>
    );
  }
}

CommentItem.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired,
  // post: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment, addOrder }
)(CommentItem);
