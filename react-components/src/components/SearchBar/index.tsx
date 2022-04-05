import React from 'react';
import classes from './SearchBar.module.css';

interface SearchBarProps {
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
}

interface SearchBarState {
  value: string;
  isError: boolean;
  isResetBtnDisabled: boolean;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  formRef = React.createRef<HTMLFormElement>();

  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      value: '',
      isError: false,
      isResetBtnDisabled: true,
    };
  }

  componentDidMount() {
    const savedValue = localStorage.getItem('searchQuery') || '';

    this.setState({
      value: savedValue,
    });
    this.props.onChange(savedValue);
  }

  componentWillUnmount() {
    localStorage.setItem('searchQuery', this.state.value);
  }

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.isError) this.setState({ isError: false });

    this.setState({ value: event.target.value });
    this.props.onChange(event.target.value);
  };

  onResetHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.isError) this.setState({ isError: false });

    this.setState({ value: '' });
    this.props.onReset();
    this.setState({ isResetBtnDisabled: true });
  };

  onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.value === '') {
      this.setState({ isError: true });
      return;
    }

    this.props.onSubmit();
    this.setState({ isResetBtnDisabled: false });
  };

  render() {
    return (
      <form ref={this.formRef} onSubmit={this.onSubmitHandler} onReset={this.onResetHandler}>
        <input
          value={this.state.value}
          onChange={this.onChangeHandler}
          type="search"
          placeholder="Type something..."
          className={`${classes.input} ${this.state.isError ? classes['error'] : ''}`}
        />
        <button className={[classes['submit-btn'], 'btn', 'btn--primary'].join(' ')}>SEARCH</button>
        <button
          disabled={this.state.isResetBtnDisabled}
          type="reset"
          value="RESET"
          className="btn btn--primary"
        >
          RESET
        </button>
      </form>
    );
  }
}

export default SearchBar;
