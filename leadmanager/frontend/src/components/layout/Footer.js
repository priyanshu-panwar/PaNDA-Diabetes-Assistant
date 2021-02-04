import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="container">
        <footer className="bg-light text-center text-lg-start">
          <div className="text-center p-3">
            © 2020 PaNDA &nbsp;&nbsp;
            <small>This is delta version 1.0</small>
          </div>
        </footer>
      </div>
    );
  }
}
