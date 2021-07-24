// import './App.css';
import React, { Component } from "react";
import Modal from "./components/Modal/Modal";

class App extends Component {
  state = {
    showModal: false,
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  render() {
    const { showModal } = this.state;

    return (
      <>
        {/* <Searchbar>
        <ImageGallery>
          <ImageGalleryItem>
            <Loader>
              <Button> */}
        {showModal && <Modal />}
      </>
    );
  }
}

export default App;
