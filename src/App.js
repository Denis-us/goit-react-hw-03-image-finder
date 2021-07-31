import "./App.css";
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import * as fetch from "./Fetch/Fetch";
import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";
import CustomLoader from "./components/Loader/Loader";

class App extends Component {
  state = {
    search: "",
    pictures: [],
    error: null,
    currentPage: 1,
    loading: false,
    showModal: false,
    largeImageId: null,
    largeImage: [],
  };

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevState.search !== this.state.search) {
      this.fetchImages(false);
    }
  }

  onSearch = (search) => {
    this.setState({ search, pictures: [], currentPage: 1 });
  };

  fetchImagesWithScroll = () => {
    this.fetchImages(true);
  };

  fetchImages = (scroll) => {
    this.setState({ loading: true });
    const { search, currentPage } = this.state;

    fetch
      .fetchImages(search, currentPage)
      .then((pictures) => {
        this.setState((state) => ({
          pictures: [...state.pictures, ...pictures],
          currentPage: state.currentPage + 1,
        }));
        return pictures[0];
      })
      .catch((error) => {
        this.setState({ error });
      })
      .then((loadedImage) => {
        if (scroll) {
          const { id } = loadedImage;

          const y =
            document.getElementById(id).getBoundingClientRect().top +
            window.scrollY -
            80;
          window.scrollTo({
            top: y,
            behavior: "smooth",
          });
        }
      })
      .finally(() => {
        this.setState({ loading: false });
      });
  };

  findPicture = () => {
    const largeImg = this.state.pictures.find((pictures) => {
      return pictures.id === this.state.largeImageId;
    });
    return largeImg;
  };

  openModal = (e) => {
    this.setState({
      showModal: true,
      largeImageId: Number(e.currentTarget.id),
    });
  };

  closeModal = () => this.setState({ showModal: false });

  render() {
    const { loading, pictures, showModal, largeImageId } = this.state;

    return (
      <div class="App">
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery openModal={this.openModal} pictures={pictures} />
        {loading && <CustomLoader />}
        {pictures.length > 0 && (
          <Button fetchImages={this.fetchImagesWithScroll} />
        )}
        {showModal && (
          <Modal largeImageId={largeImageId} onClose={this.closeModal}>
            <img
              src={this.findPicture().largeImageURL}
              alt={this.findPicture().tags}
            />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
