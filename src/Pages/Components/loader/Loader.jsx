import React, { Component } from "react";
import "./Loader.css";

class Loader extends Component {
  render() {
    return (
      <div className="flex h-screen items-center justify-center">
        <div class="loader">
          <div class="spinner"></div>
        </div>
      </div>
    );
  }
}

export default Loader;
