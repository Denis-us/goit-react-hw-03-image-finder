import React, { Component } from "react";
import { ReactComponent as SearchIcon } from "../Icon/search_icon.svg";
import { toast } from "react-toastify";
import styles from "./Searchbar.module.css";

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
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <SearchIcon width="25" height="25" />
            <span className={styles.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={styles.SearchFormInput}
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
