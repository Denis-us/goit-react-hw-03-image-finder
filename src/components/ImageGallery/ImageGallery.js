import React, { Component } from "react";

export default class ImageGallery extends Component {
  // componentDidUpdate() {
  //   const gallery = this.props.pictures
  //   console.log("gallery", gallery)
  // }

  render() {
    // const { pictures, loading } = this.setState;
    const gallery = this.props.pictures;
    console.log("gallery", gallery);

    return (
      <div>
        <ul className="ImageGallery">
          {/* {gallery.map((picture) => 
          <li key={picture.id}>
            <img src={picture.webformatURL } alt="" width="200" height="200"/>
          </li>)} */}

          {/* <p>{this.props.pictures}</p> */}
        </ul>
      </div>
    );
  }
}
