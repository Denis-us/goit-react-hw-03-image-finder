// import './App.css';
import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Searchbar from "./components/Searchbar/Searchbar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Modal from "./components/Modal/Modal";
import Button from "./components/Button/Button";

class App extends Component {
  state = {
    pictures: "",
    loading: false,
    showModal: false,
  };

  handleFormSubmit = (pictures) => {
    this.setState({ pictures });
  };

  // componentDidMount() {
  //   this.setState({loading: true})

  //   setTimeout(() => {
  //     fetch('https://pixabay.com/api/?q=cat&page=1&key=22012184-6924baf220c56a628f4f15ef2&image_type=photo&orientation=horizontal&per_page=12')
  //     .then(res => res.json())
  //     .then(picture => this.setState({picture}))
  //     .finally(() => this.setState({loading: false}))
  //   }, 2000);
  // }

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {/* {this.state.loading && <h1>Загружаем...</h1>}
        {this.state.picture && <div>Картинки</div>} */}

        <ImageGallery pictures={this.state.pictures} />
        {/* <ImageGalleryItem> */}
        {/* <Loader> */}
        <Button onClick={this.toggleModal} content={"Открыть модалку"} />
        {showModal && (
          <Modal onClose={this.toggleModal}>
            <h1>Заголовок</h1>
            <Button onClick={this.toggleModal} content={"Закрыть модалку"} />
          </Modal>
        )}
        <ToastContainer autoClose={3000} />
      </>
    );
  }
}

export default App;
