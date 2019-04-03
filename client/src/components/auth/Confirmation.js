import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { verifyUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Confirmation extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const token = this.props.match.params.token;

    const verifyEmail = {
      email: this.state.email
    };

    this.props.verifyUser(verifyEmail, token, this.props.history);
  }

  render() {
    console.log(this.props.match.params.token);
    console.log(this.props.location.pathname);

    const { errors } = this.state;
    console.log("");
    //const { token } = this.props;
    return (
      <div className="confirmation">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">User verification</h1>
              <p className="lead text-center">Enter your email to verify</p>
              <form noValidate onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Email"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.onChange}
                  error={errors.email}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Confirmation.propTypes = {
  auth: PropTypes.object.isRequired,
  verifyUser: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { verifyUser }
)(withRouter(Confirmation));
