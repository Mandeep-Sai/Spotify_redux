import React from "react";
import { FaSpotify, FaSearch, FaHome, FaBookOpen } from "react-icons/fa";
import { AiOutlinePlusCircle, AiOutlineClose } from "react-icons/ai";
import { IconContext } from "react-icons";
import { Form, FormControl, Button, Col, Row } from "react-bootstrap";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import Modal from "react-modal";

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    loadUser: (name) =>
      dispatch({
        type: "LOAD_USER",
        payload: name,
      }),
    createPlaylist: (playlists) => dispatch(addplaylist(playlists)),
  };
};
const addplaylist = (playlists) => {
  console.log(playlists);
  return async (dispatch, getState) => {
    dispatch({
      type: "ADD_PLAYLIST",
      payload: playlists,
    });
  };
};
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "20px",
  },
};

class SideBar extends React.Component {
  state = {
    query: "",
    username: "",
    showPlaylistModal: false,
    playlistName: "",
    playlists: "",
  };

  handleClose = () => {
    this.setState({ showPlaylistModal: false });
  };
  updateUser = (e) => {
    this.setState({ username: e.currentTarget.value });
  };
  handlePlaylistNameChange = (e) => {
    this.setState({ playlistName: e.currentTarget.value });
  };
  createPlaylistHandler = (e) => {
    let playlist = {
      name: this.state.playlistName,
      songs: [],
    };
    this.setState({ playlists: { ...playlist } });
    setTimeout(() => {
      this.props.createPlaylist(this.state.playlists);
    }, 1000);
    this.setState({ showPlaylistModal: false });
  };
  render() {
    return (
      <>
        <nav id="sidebar">
          <div className="sidebar-header">
            <IconContext.Provider value={{ className: "spotifyIcon" }}>
              <FaSpotify />
            </IconContext.Provider>
            <p>Spotify</p>
          </div>
          <ul className="list-unstyled">
            <div id="sidebar-content">
              <div className="d-flex active">
                <IconContext.Provider value={{ className: "sidebarIcons" }}>
                  <FaHome />
                </IconContext.Provider>
                <a href="/">Home</a>
              </div>
              <div className="d-flex">
                <IconContext.Provider value={{ className: "sidebarIcons" }}>
                  <FaSearch onClick={this.showSearchBar} />
                </IconContext.Provider>
                <a href="">Search</a>
              </div>
              <div className="d-flex">
                <IconContext.Provider value={{ className: "sidebarIcons" }}>
                  <FaBookOpen />
                </IconContext.Provider>
                <a href="album.html">Your Library</a>
              </div>
            </div>
          </ul>
          <div id="playlists">
            <div>
              <p>PLAYLISTS</p>
              <AiOutlinePlusCircle
                onClick={() => this.setState({ showPlaylistModal: true })}
              />
            </div>
            <div>
              {this.props.playlists.length > 0
                ? this.props.playlists.map((playlist) => (
                    <Link to={`/ownplaylist/${playlist.name}`}>
                      {" "}
                      <p>{playlist.name}</p>
                    </Link>
                  ))
                : null}
            </div>
          </div>
          <div id="buttons">
            <div id="signUp">
              {/* <Link to='/signup'> */}
              <button
                type="button"
                onClick={this.handleShow}
                className="btn btn-block"
              >
                <p>SIGN UP</p>
              </button>
              {/* </Link> */}
            </div>
            <div id="login">
              <button type="button" className="btn btn-block">
                <p>LOGIN</p>
              </button>
            </div>
            <div id="sidebar-footer">
              <div className="footer">
                <p>Cookie</p>
                <p>|</p>
                <p>Privacy</p>
              </div>
              <div style={{ marginTop: "-15px", marginLeft: "5px" }}>
                <p style={{ fontSize: "12px" }}>Policy</p>
              </div>
            </div>
          </div>
        </nav>
        <Modal
          isOpen={this.state.showPlaylistModal}
          onRequestClose={() =>
            this.setState({
              showPlaylistModal: false,
            })
          }
          style={customStyles}
          contentLabel="Example Modal"
        >
          <div id="playlistModal">
            <div id="heading">
              <div style={{ fontSize: "20px", fontWeight: "650" }}>
                Create a new playlist
              </div>
              <AiOutlineClose onClick={this.handleClose} />
            </div>
            <div id="inputSection">
              <p>Name</p>
              <input type="text" onChange={this.handlePlaylistNameChange} />
            </div>
            <button onClick={this.createPlaylistHandler}>Create</button>
          </div>
        </Modal>
        {/*
        <Modal
          show={this.state.show}
          onHide={this.handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Sign Up</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Row>
                <Col>
                  <Form.Control
                    onChange={this.updateUser}
                    placeholder="username"
                    type="text"
                  />
                </Col>
                <Col>
                  <Form.Control placeholder="password" type="password" />
                </Col>
              </Form.Row>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="primary"
              onClick={() => {
                this.props.loadUser(this.state.username);
                this.handleClose();
              }}
            >
              Sign Up
            </Button>
          </Modal.Footer>
        </Modal>
            */}
      </>
    );
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(SideBar);
