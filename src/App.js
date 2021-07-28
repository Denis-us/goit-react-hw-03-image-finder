// import './App.css';
import React, { Component } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import Loader from "react-loader-spinner";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

// const CustomLoader = () => {
//   return (
//     <Loader
//       type="Bars"
//       color="#00BFFF"
//       height={100}
//       width={100}
//       timeout={3000}
//     />
//   );
// };

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

  fetchImages = (request = "", currentPage = 1) => {
    return fetch(
      `https://pixabay.com/api/?q=${request}&page=${currentPage}&key=13128632-519e28f670cc6f8f58c4d9c9f&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then((x) => new Promise((resolve) => setTimeout(() => resolve(x), 1000))) // Задержка добавлена для тестирования Loader
      .then((res) => res.json())
      .then((data) => data.hits);
  };

  fetchImages = (scroll) => {
    this.setState({ isLoading: true });
    const { search, currentPage } = this.state;

    this.fetchImages(search, currentPage)
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
      .finally(() => {
        this.setState({ isLoading: false });
      });
    // .then(firstLoadedImage => {
    //   if (scroll) {
    //     const { id } = firstLoadedImage;

    //     const y =
    //       document.getElementById(id).getBoundingClientRect().top +
    //       window.scrollY -
    //       80;
    //     window.scrollTo({
    //       top: y,
    //       behavior: 'smooth',
    //     });
    //   }
    // });
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
      // <div className={styles.App}>
      <div>
        <Searchbar onSubmit={this.onSearch} />
        <ImageGallery openModal={this.openModal} pictures={pictures} />
        {loading && <Loader />}
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
        {/* <ToastContainer autoClose={3000} /> */}
      </div>
    );
  }
}

export default App;
