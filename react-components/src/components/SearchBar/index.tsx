import React from 'react';
import classes from './SearchBar.module.css';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  isResetBtnDisabled: boolean;
}

interface SearchBarState {
  isError: boolean;
  isResetBtnDisabled: boolean;
}

class SearchBar extends React.Component<SearchBarProps, SearchBarState> {
  formRef = React.createRef<HTMLFormElement>();

  constructor(props: SearchBarProps) {
    super(props);

    this.state = {
      isError: false,
      isResetBtnDisabled: this.props.isResetBtnDisabled,
    };
  }

  componentDidUpdate(prevProps: SearchBarProps) {
    if (prevProps.isResetBtnDisabled !== this.props.isResetBtnDisabled) {
      this.setState({ isResetBtnDisabled: this.props.isResetBtnDisabled });
    }
  }

  onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (this.state.isError) this.setState({ isError: false });

    this.props.onChange(event.target.value);
  };

  onResetHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.state.isError) this.setState({ isError: false });

    this.props.onChange('');
    this.props.onReset();
    this.setState({ isResetBtnDisabled: true });
  };

  onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (this.props.value === '') {
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
          value={this.props.value}
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
