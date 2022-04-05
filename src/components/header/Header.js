/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */

import React, { useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import '../App.css';
import './Header.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/action';

function Header({
  userName, currentUser, logOut, userImage,
}) {
  useEffect(() => {
    currentUser();
  }, [currentUser, userName]);

  if (localStorage.getItem('userKey') && userName) {
    return (
      <>
        <header>
          <div className="header">
            <Link className="Realworld" to="/articles">Realworld Blog</Link>

            <Link to="/profile" className="profile_user">
              <img className="headerAvatar" src={userImage} alt="Avatar" />
              <div className="profile_Username">
                {userName}
                {' '}
              </div>
              <Link to="/new-article" className="createArticle">Create Article</Link>
            </Link>
            <Link
              to="/sign-in"
              className="log-Out"
              onClick={() => {
                logOut();
                localStorage.setItem('userKey', false);
              }}
            >
              Log Out
            </Link>
          </div>
        </header>
        <Outlet />
      </>
    );
  }
  return (
    <>
      <header>
        <div className="header">

          <Link to="/articles" className="Realworld">Realworld Blog</Link>
          <Link to="/sign-in" className="Sign-In">Sign In</Link>
          <Link to="/sign-up" className="Sign-Up">Sign Up</Link>
        </div>
      </header>
      <Outlet />
    </>
  );
}

const mapStateToProps = (state) => ({
  userName: state.userName,
  userImage: state.userImage,
});

const mapDispatchToProps = (dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
