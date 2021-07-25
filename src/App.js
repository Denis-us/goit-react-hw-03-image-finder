// import './App.css';
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Loader from "react-loader-spinner";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

const CustomLoader = () => {
  return (
    <Loader
      type="Bars"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000}
    />
  );
};

class App extends Component {
  state = {
    pictures: [],
    loading: false,
    showModal: false,
    error: null,
    currentPage: 1,
  };

  // componentDidMount() {

  // (async () => {
  //   const gallery = await this.fetchPictures();
  //   try {

  //     this.setState({pictures: gallery.data.hits, loading: false})
  //     console.log("gallery", gallery)
  //   }
  //   catch(error) {
  //     this.setState({error: gallery.data.status, loading: false})
  //     console.log("error")
  //   }
  // })();
  // };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentPage !== this.state.currentPage) {
      (async () => {
        this.setState({ loading: true });
        const gallery = await this.fetchPictures(this.state.currentPage);

        try {
          this.setState({
            pictures: [...prevState.pictures, ...gallery.data.hits],
            loading: false,
          });
          console.log("gallery", gallery);
        } catch (error) {
          this.setState({ error: gallery.data.status, loading: false });
          console.log("error");
        }
      })();
    }
  }

  fetchPictures = (page = 1) => {
    return axios.get(
      `https://pixabay.com/api/?q=cat&page=${page}&key=22012184-6924baf220c56a628f4f15ef2&image_type=photo&orientation=horizontal&per_page=12`
    );
  };

  nextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
  };

  handleFormSubmit = (pictures) => {
    // console.log("pictures", pictures)
    // console.log(this.state.pictures)
    this.setState({ pictures: pictures });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { pictures, showModal, loading, error } = this.state;

    return (
      <>
        <Searchbar
          onSubmit={this.handleFormSubmit}
          pictures={this.state.pictures}
        />

        {loading && <CustomLoader />}

        {error ? (
          <h2>{error}</h2>
        ) : (
          <ImageGallery pictures={this.state.pictures} />
        )}

        {/* // {this.state.loading && <h1>Загружаем...</h1>} */}
        {/* // {this.state.picture && <div>Картинки</div>} */}

        {/* // <ImageGalleryItem/> */}
        {/* // <Loader/> */}

        {/* <button type="button" onClick={this.nextPage}>Load more</button> */}

        {/* <Button onClick={this.toggleModal} content={"Открыть модалку"} /> */}

        {/* {showModal && (
              <Modal onClose={this.toggleModal}>
                <h1>Заголовок</h1>
                <Button onClick={this.toggleModal} content={"Закрыть модалку"} />
              </Modal>
            )} */}

        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
