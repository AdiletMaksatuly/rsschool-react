import React, { useEffect, useState } from 'react';
import classes from './SearchBar.module.css';

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  onReset: () => void;
  disableResetBtn: boolean;
};

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onSubmit,
  onReset,
  disableResetBtn,
}) => {
  const formRef = React.createRef<HTMLFormElement>();
  const [isError, setIsError] = useState<boolean>(false);
  const [isResetBtnDisabled, setIsResetBtnDisabled] = useState<boolean>(disableResetBtn);

  useEffect(() => {
    setIsResetBtnDisabled(disableResetBtn);
  }, [disableResetBtn]);

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (isError) setIsError(false);

    onChange(event.target.value);
  };

  const onResetHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (isError) setIsError(false);

    onChange('');
    onReset();
    setIsResetBtnDisabled(true);
  };

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();

    if (value === '') {
      setIsError(true);
      return;
    }

    onSubmit();
    setIsResetBtnDisabled(false);
  };

  return (
    <form ref={formRef} onSubmit={onSubmitHandler} onReset={onResetHandler}>
      <input
        value={value}
        onChange={onChangeHandler}
        type="search"
        placeholder="Type something..."
        className={`${classes.input} ${isError ? classes['error'] : ''}`}
      />
      <button className={[classes['submit-btn'], 'btn', 'btn--primary'].join(' ')}>SEARCH</button>
      <button disabled={isResetBtnDisabled} type="reset" value="RESET" className="btn btn--primary">
        RESET
      </button>
    </form>
  );
};

export default SearchBar;
