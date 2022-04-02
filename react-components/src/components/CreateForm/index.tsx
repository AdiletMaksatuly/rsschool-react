import React, { ChangeEvent } from 'react';
import { IUser } from '../../types';
import classes from './CreateForm.module.css';
import ErrorAlert from './ErrorAlert';

const joinClasses = (...args: string[]) => {
  return args.join(' ');
};

const cssClasses = {
  form: joinClasses(classes['form']),
  inputs: joinClasses(classes['form__control'], classes['form__input']),
  formControl: joinClasses(classes['form__control']),
  radioWrapper: joinClasses(classes['form__control']),
  radioLabel: joinClasses(classes['form__radio-label']),
  fileInputLabel: joinClasses(classes['form__control'], classes['form__file-input-label']),
  fileInput: joinClasses(classes['form__file-input']),
  fileInputUploadBtn: joinClasses(
    'btn',
    'btn--primary',
    classes['form__control'],
    classes['form__file-input-upload-btn']
  ),
  submitBtn: joinClasses(
    classes['form__control'],
    classes['form__submit-btn'],
    'btn',
    'btn--primary'
  ),
};

interface CreateFormProps {
  onCreate: (userData: IUser) => void;
}

interface CreateFormState {
  userData: IUser;
  isError: boolean;
  errorElements: Array<HTMLInputElement | HTMLSelectElement | RadioNodeList>;
  showErrorAlert: boolean;
}

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  sex: HTMLInputElement;
  'birth-place': HTMLSelectElement;
  'birth-date': HTMLInputElement;
  img: HTMLInputElement;
  agreement: HTMLInputElement;
}

class CreateForm extends React.Component<CreateFormProps, CreateFormState> {
  formRef = React.createRef<HTMLFormElement>();
  submitBtnRef = React.createRef<HTMLButtonElement>();
  nameInputRef = React.createRef<HTMLInputElement>();
  dateInputRef = React.createRef<HTMLInputElement>();
  sexInputsWrapperRef = React.createRef<HTMLInputElement>();
  selectRef = React.createRef<HTMLSelectElement>();
  fileInputRef = React.createRef<HTMLInputElement>();
  agreementCheckboxLabelRef = React.createRef<HTMLLabelElement>();

  constructor(props: CreateFormProps) {
    super(props);

    this.state = {
      userData: {
        id: 0,
        sex: '',
        birthDate: '',
        birthPlace: '',
        name: '',
        img: '',
      },
      isError: true,
      showErrorAlert: false,
      errorElements: [],
    };

    this.errorStateHandler = this.errorStateHandler.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  errorStateHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!this.state.isError) return;

    const deleteError = (
      errElements: Array<HTMLInputElement | HTMLSelectElement | RadioNodeList>
    ) => {
      if (errElements.length === 0) {
        this.setState({ isError: false });
      }
    };

    if (e.target.name === 'sex') {
      this.sexInputsWrapperRef.current?.classList.remove('error');
    } else {
      if (e.target.id === 'agreement') {
        e.target.parentElement?.classList.remove('error');
      } else {
        e.target.classList.remove('error');
      }
    }

    if (this.state.errorElements.length) {
      const newErrorElements = this.state.errorElements.filter((errorElement) => {
        if (e.target.toString() === '[Object RadioNodeList]') {
          return errorElement.toString() !== '[Object RadioNodeList]';
        }

        if ('name' in errorElement) {
          return errorElement.name !== e.target.name;
        }
      });

      this.setState({ errorElements: newErrorElements }, () =>
        deleteError(this.state.errorElements)
      );
      return;
    }

    deleteError(this.state.errorElements);
  }

  showErrors() {
    this.state.errorElements.forEach((errorElement) => {
      if (errorElement.toString() === '[object RadioNodeList]') {
        this.sexInputsWrapperRef.current?.classList.add('error');
        return;
      }

      if ('classList' in errorElement) {
        if (errorElement.id === 'agreement') {
          this.agreementCheckboxLabelRef.current?.classList.add('error');
          return;
        }

        errorElement.classList.add('error');
      }
    });
  }

  submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!this.formRef.current) return;

    const form = this.formRef.current;
    const elements: FormElements = form.elements as FormElements;

    const {
      username,
      sex,
      'birth-place': birthPlace,
      'birth-date': birthDate,
      img,
      agreement,
    } = elements;

    const haveInvalidValues = (
      ...formFields: Array<HTMLInputElement | HTMLSelectElement | RadioNodeList>
    ) => {
      const errorElements: Array<HTMLInputElement | HTMLSelectElement | RadioNodeList> = [];
      formFields.forEach((formField) => {
        if (
          'checked' in formField &&
          formField.type === 'checkbox' &&
          formField.checked === false
        ) {
          errorElements.push(formField);
          return;
        }

        if (!formField.value) {
          errorElements.push(formField);
        }
      });

      if (errorElements.length) {
        this.setState({ errorElements });
      }

      return !!errorElements.length;
    };

    if (haveInvalidValues(username, sex, birthPlace, birthDate, agreement) === true) {
      this.setState({ isError: true }, () => this.showErrors());
      this.setState({ showErrorAlert: true });
      return;
    }

    this.setState(
      {
        userData: {
          id: Date.now(),
          img: img.value,
          name: username.value,
          birthDate: birthDate.value,
          birthPlace: birthPlace.value,
          sex: sex.value,
        },
      },
      () => this.props.onCreate(this.state.userData)
    );

    this.formRef.current.reset();
  }

  render() {
    return (
      <form className={cssClasses.form} ref={this.formRef} onSubmit={this.submitHandler}>
        <input
          className={cssClasses.inputs}
          type="text"
          name="username"
          placeholder="Your Name"
          pattern="[A-Za-z]{1,32}"
          ref={this.nameInputRef}
          onChange={this.errorStateHandler}
        />
        <input
          className={cssClasses.inputs}
          type="date"
          name="birth-date"
          placeholder="Date of birth"
          ref={this.dateInputRef}
          onChange={this.errorStateHandler}
        />
        <div ref={this.sexInputsWrapperRef} className={cssClasses.radioWrapper}>
          <label htmlFor="sexMale" className={cssClasses.radioLabel}>
            Male
            <input
              type="radio"
              value="male"
              name="sex"
              id="sexMale"
              onChange={this.errorStateHandler}
            />
          </label>
          <label htmlFor="sexFemale" className={cssClasses.radioLabel}>
            Female
            <input
              type="radio"
              value="female"
              name="sex"
              id="sexFemale"
              onChange={this.errorStateHandler}
            />
          </label>
        </div>
        <select
          ref={this.selectRef}
          className={cssClasses.formControl}
          name="birth-place"
          onChange={this.errorStateHandler}
        >
          optio
          <option value="kz">Kazakhstan</option>
          <option value="ru">Russia</option>
          <option value="ua">Ukraine</option>
        </select>
        <label htmlFor="fileInput" className={cssClasses.fileInputLabel}>
          <button className={cssClasses.fileInputUploadBtn} type="button">
            Upload
          </button>
          ...or just drop a file here
          <input
            ref={this.fileInputRef}
            type="file"
            className={cssClasses.fileInput}
            name="img"
            id="fileInput"
            onChange={this.errorStateHandler}
          />
        </label>
        <label
          ref={this.agreementCheckboxLabelRef}
          htmlFor="agreement"
          className={cssClasses.formControl}
        >
          <input
            type="checkbox"
            name="agreement"
            id="agreement"
            onChange={this.errorStateHandler}
          />
          Согласен на обработку данных
        </label>
        <button
          ref={this.submitBtnRef}
          disabled={this.state.isError}
          className={cssClasses.submitBtn}
        >
          Submit
        </button>
        {this.state.isError && this.state.showErrorAlert ? (
          <ErrorAlert
            destroy={() => this.setState({ showErrorAlert: false })}
            message="Make sure you fulfilled all required fields"
          />
        ) : (
          ''
        )}
        {/* <ErrorAlert message="Make sure you fulfilled all required fields" /> */}
      </form>
    );
  }
}

export default CreateForm;
