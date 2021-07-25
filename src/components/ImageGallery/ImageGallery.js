import React, { Component } from "react";
import axios from "axios";

export default class ImageGallery extends Component {
  state = {
    pictures: null,
    loading: false,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.pictures;
    const nextName = this.props.pictures;

    if (prevName !== nextName) {
      this.setState({ loading: true });

      this.fetchPictures();
      // setTimeout(() => fetch('https://pixabay.com/api/?q=cat&page=1&key=22012184-6924baf220c56a628f4f15ef2&image_type=photo&orientation=horizontal&per_page=12')
      // .then(res => res.json())
      // .then(pictures => this.setState({pictures}))
      // .finally(() => this.setState({loading: false})), 2000)
    }
  }

  async fetchPictures() {
    try {
      const data = await axios.get(
        "https://pixabay.com/api/?q=cat&page=1&key=22012184-6924baf220c56a628f4f15ef2&image_type=photo&orientation=horizontal&per_page=12"
      );

      console.log(data);
    } catch (error) {
      console.log("error", error.response);
    }
  }

  render() {
    const { pictures, loading } = this.setState;

    return (
      <div>
        <ul className="ImageGallery">
          {pictures && pictures.map((picture) => <li>{picture}</li>)}

          {/* <p>{this.props.pictures}</p> */}
        </ul>
      </div>
    );

    // return (
    //   <div>
    //     {loading && <div>Загружаем...</div>}
    //     {!this.props.pictures && <div>Введите имя</div>}
    //     {pictures && <p>{this.props.pictures}</p>}
    //   </div>
    //   )
  }
}
