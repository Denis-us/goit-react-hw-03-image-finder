import React, { Component } from "react";
import { ReactComponent as SearchIcon } from "../Icon/search_icon.svg";
import { toast } from "react-toastify";

export default class Searchbar extends Component {
  state = {
    search: "",
  };

  handleNameChange = (e) => {
    this.setState({ search: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.search.trim() === "") {
      toast.error("Введите название картинки");
      return;
    }

    this.props.onSubmit(this.state.search);
    this.setState({ search: "" });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <SearchIcon width="20" height="20" />
            <span className="SearchForm-button-label">Search</span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
            value={this.state.search}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}
