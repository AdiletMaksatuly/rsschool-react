import React, { ChangeEventHandler } from 'react';
import classes from './SearchBar.module.css';

interface SearchBarProps {
  onChange: (value: string) => void;
}

interface SearchBarState {
  value: string;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const savedValue = JSON.parse(localStorage.getItem('searchQuery') || '');

    console.log(!!savedValue);
    this.setState({
      value: savedValue || '',
    });
    this.props.onChange(savedValue || '');
  }

  componentWillUnmount() {
    localStorage.setItem('searchQuery', JSON.stringify(this.state.value));
  }

  onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  }

  render() {
    return (
      <input
        value={this.state.value}
        onChange={this.onChangeHandler.bind(this)}
        type="search"
        placeholder="Type something..."
        className={classes.input}
      />
    );
  }
}

export default SearchBar;
