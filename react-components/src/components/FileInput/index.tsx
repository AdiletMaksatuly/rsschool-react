import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { joinClasses } from '../../utils';
import classes from './FileInput.module.css';
import { UseFormRegister } from 'react-hook-form';
import { FormInputs } from '../../types';

interface FileInputProps {
  cssClasses?: {
    labelClassName?: string;
    buttonClassName?: string;
    inputClassName?: string;
    wrapperClassName?: string;
    previewClassName?: string;
  };
  name: string;
  inputId: string;
  isClearPreview: boolean;
  registerHook: UseFormRegister<FormInputs>;
}

type CssClasses = {
  wrapperClassName: string[];
  labelClassName: string[];
  inputClassName: string[];
  buttonClassName: string[];
  previewClassName: string[];
};

const cssClasses: CssClasses = {
  wrapperClassName: [classes['file-input-wrapper']],
  labelClassName: [classes['file-input-label']],
  inputClassName: [classes['file-input']],
  buttonClassName: [classes['file-input-upload-btn']],
  previewClassName: [classes['preview']],
};

const FileInput: React.FC<FileInputProps> = (props) => {
  const [file, setFile] = useState<{ name: string; URL: string | ArrayBuffer | null }>({
    name: '',
    URL: '',
  });
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { ref, ...rest } = props.registerHook(props.name as keyof FormInputs, {
    onChange: changeHandler,
  });

  useEffect(() => {
    if (props.isClearPreview) {
      setFile({ name: '', URL: '' });
    }
  }, [props.isClearPreview]);

  addClassNames();

  function addClassNames() {
    if (props.cssClasses) {
      Object.keys(props.cssClasses).forEach((key) => {
        const elementClassNames = props.cssClasses && props.cssClasses[key as keyof CssClasses];

        if (!elementClassNames) return;
        cssClasses[key as keyof CssClasses].push(elementClassNames);
      });
    }
  }

  function changeHandler(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.readAsDataURL(file);
      reader.onload = () => {
        setFile({ name: file.name, URL: reader.result });
      };
    }
  }

  return (
    <div className={joinClasses(...cssClasses.wrapperClassName)}>
      <label htmlFor={props.inputId} className={joinClasses(...cssClasses.labelClassName)}>
        <button
          onClick={() => inputRef.current?.click()}
          className={joinClasses(...cssClasses.buttonClassName)}
          type="button"
        >
          Upload
        </button>
        ...or just drop a file here
      </label>

      <input
        type="file"
        {...rest}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
        className={joinClasses(...cssClasses.inputClassName)}
        id={props.inputId}
        data-testid="file"
      />

      {file.URL ? (
        <figure className={joinClasses(...cssClasses.previewClassName)}>
          <img style={{ width: '100%' }} src={`${file.URL}`} alt={file.name} />
          <figcaption title={file.name}>{file.name}</figcaption>
        </figure>
      ) : (
        ''
      )}
    </div>
  );
};

export default FileInput;
