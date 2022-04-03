import React from 'react';
import { joinClasses } from '../../utils';
import classes from './FileInput.module.css';

interface FileInputProps {
  labelClassName?: string;
  buttonClassName?: string;
  inputClassName?: string;
  inputName: string;
  inputId: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  ref?: 'string';
}

type CssClasses = {
  labelClassName: string[];
  inputClassName: string[];
  buttonClassName: string[];
};

interface FileInputState {
  cssClasses: CssClasses;
}

type ClassNamePairs = {
  [key in keyof CssClasses]: string;
};

class FileInput extends React.Component<FileInputProps, FileInputState> {
  cssClasses = {
    labelClassName: [classes['file-input-label']],
    inputClassName: [classes['file-input']],
    buttonClassName: [classes['file-input-upload-btn']],
  };
  constructor(props: FileInputProps) {
    super(props);

    this.addClassNames.call(this, {
      labelClassName: this.props.labelClassName ? this.props.labelClassName : '',
      buttonClassName: this.props.buttonClassName ? this.props.buttonClassName : '',
      inputClassName: this.props.inputClassName ? this.props.inputClassName : '',
    });
  }

  addClassNames(classNamePairs: ClassNamePairs) {
    Object.keys(classNamePairs).forEach((key) => {
      if (classNamePairs[key as keyof CssClasses]) {
        this.cssClasses[key as keyof CssClasses].push(classNamePairs[key as keyof CssClasses]);
      }
    });
  }

  render() {
    return (
      <label
        htmlFor={this.props.inputId}
        className={joinClasses(...this.cssClasses.labelClassName)}
      >
        <button className={joinClasses(...this.cssClasses.buttonClassName)} type="button">
          Upload
        </button>
        ...or just drop a file here
        <input
          ref={this.props.ref}
          type="file"
          className={joinClasses(...this.cssClasses.inputClassName)}
          name={this.props.inputName}
          id={this.props.inputId}
          onChange={this.props.onChange}
        />
      </label>
    );
  }
}

export default FileInput;
