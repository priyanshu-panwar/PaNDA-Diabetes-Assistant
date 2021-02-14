import React, { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="" style={{ backgroundColor: "#90a390" }}>
        <footer
          className="bg-light text-center text-lg-start"
          style={{
            backgroundColor: "#90a390",
          }}
        >
          <div
            className="text-center p-3"
            style={{ backgroundColor: "#90a390" }}
          >
            © 2021 PaNDA &nbsp;&nbsp;
            <small>This is delta version 1.0</small>
          </div>
        </footer>
      </div>
    );
  }
}
