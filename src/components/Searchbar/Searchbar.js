import React, { Component } from "react";
// import {ImSearch} from 'react-icons/BiSearchAlt';
import { ReactComponent as SearchIcon } from "../Icon/search_icon.svg";
import { toast } from "react-toastify";

export default class Searchbar extends Component {
  state = {
    pictures: "",
  };

  handleNameChange = (e) => {
    this.setState({ pictures: e.currentTarget.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.pictures.trim() === "") {
      toast.error("Введите имя");
      return;
    }

    // const gallery = this.props.pictures
    // console.log("gallery", gallery)

    this.props.onSubmit(this.state.pictures);
    // this.setState({ pictures: "" });
    // console.log("pictures", this.state.pictures)
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            {/* <ImSearch /> */}
            <SearchIcon width="20" height="20" />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.pictures}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
