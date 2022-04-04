import React, { ChangeEvent } from 'react';
import { joinClasses } from '../../utils';
import classes from './FileInput.module.css';

interface FileInputProps {
  labelClassName?: string;
  buttonClassName?: string;
  inputClassName?: string;
  wrapperClassName?: string;
  inputName: string;
  inputId: string;
  clearPreview: boolean;
}

type CssClasses = {
  wrapperClassName: string[];
  labelClassName: string[];
  inputClassName: string[];
  buttonClassName: string[];
  previewClassName: string[];
};

interface FileInputState {
  cssClasses: CssClasses;
  file: {
    name: string;
    URL: string | ArrayBuffer | null;
  };
}

type ClassNamePairs = {
  [key in keyof CssClasses]: string;
};

class FileInput extends React.Component<FileInputProps, FileInputState> {
  inputRef = React.createRef<HTMLInputElement>();

  constructor(props: FileInputProps) {
    super(props);

    this.state = {
      file: {
        name: '',
        URL: '',
      },
      cssClasses: {
        wrapperClassName: [classes['file-input-wrapper']],
        labelClassName: [classes['file-input-label']],
        inputClassName: [classes['file-input']],
        buttonClassName: [classes['file-input-upload-btn']],
        previewClassName: [classes['preview']],
      },
    };

    this.addClassNames.call(this, {
      wrapperClassName: this.props.wrapperClassName ? this.props.wrapperClassName : '',
      labelClassName: this.props.labelClassName ? this.props.labelClassName : '',
      buttonClassName: this.props.buttonClassName ? this.props.buttonClassName : '',
      inputClassName: this.props.inputClassName ? this.props.inputClassName : '',
      previewClassName: '',
    });
    this.changeHandler = this.changeHandler.bind(this);
  }

  componentDidUpdate(prevProps: FileInputProps) {
    if (prevProps.clearPreview !== this.props.clearPreview) {
      this.setState({ file: { name: '', URL: '' } });
    }
  }

  addClassNames(classNamePairs: ClassNamePairs) {
    Object.keys(classNamePairs).forEach((key) => {
      if (classNamePairs[key as keyof CssClasses]) {
        this.state.cssClasses[key as keyof CssClasses].push(
          classNamePairs[key as keyof CssClasses]
        );
      }
    });
  }

  changeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        this.setState({ file: { name: file.name, URL: reader.result } });
      };
    }
  }

  render() {
    return (
      <div className={joinClasses(...this.state.cssClasses.wrapperClassName)}>
        <label
          htmlFor={this.props.inputId}
          className={joinClasses(...this.state.cssClasses.labelClassName)}
        >
          <button
            onClick={() => this.inputRef.current?.click()}
            className={joinClasses(...this.state.cssClasses.buttonClassName)}
            type="button"
          >
            Upload
          </button>
          ...or just drop a file here
        </label>

        <input
          ref={this.inputRef}
          type="file"
          className={joinClasses(...this.state.cssClasses.inputClassName)}
          name={this.props.inputName}
          id={this.props.inputId}
          onChange={this.changeHandler}
          data-testid="file"
        />

        {this.state.file.URL ? (
          <figure className={joinClasses(...this.state.cssClasses.previewClassName)}>
            <img
              style={{ width: '100%' }}
              src={`${this.state.file.URL}`}
              alt={this.state.file.name}
            />
            <figcaption title={this.state.file.name}>{this.state.file.name}</figcaption>
          </figure>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default FileInput;
