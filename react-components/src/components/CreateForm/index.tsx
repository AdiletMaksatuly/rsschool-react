import React, { ChangeEvent } from 'react';
import { IUser } from '../../types';
import classes from './CreateForm.module.css';
import StatusAlert from './StatusAlert';

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

type FormElementsToValidate = Array<HTMLInputElement | HTMLSelectElement | RadioNodeList>;

interface FormElements extends HTMLFormControlsCollection {
  username: HTMLInputElement;
  sex: HTMLInputElement;
  'birth-place': HTMLSelectElement;
  'birth-date': HTMLInputElement;
  img: HTMLInputElement;
  agreement: HTMLInputElement;
}

interface CreateFormProps {
  onCreate: (userData: IUser) => void;
}

interface CreateFormState {
  userData: IUser;
  isError: boolean;
  errorElements: FormElementsToValidate;
  showErrorAlert: boolean;
  showSuccessAlert: boolean;
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
      showSuccessAlert: false,
    };

    this.errorStateHandler = this.errorStateHandler.bind(this);
    this.showErrors = this.showErrors.bind(this);
    this.checkInvalidValues = this.checkInvalidValues.bind(this);
    this.submitHandler = this.submitHandler.bind(this);
  }

  errorStateHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    if (!this.state.isError) return;

    const deleteError = (errElements: FormElementsToValidate) => {
      if (errElements.length === 0) {
        this.setState({ isError: false });
      }
    };

    this.hideErrors(e.target);

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

  hideErrors(target: HTMLInputElement | HTMLSelectElement) {
    if (target.name === 'sex') {
      this.sexInputsWrapperRef.current?.classList.remove('error');
    } else {
      if (target.id === 'agreement') {
        target.parentElement?.classList.remove('error');
      } else {
        target.classList.remove('error');
      }
    }
  }

  checkInvalidValues(...formFields: FormElementsToValidate) {
    const errorElements: FormElementsToValidate = [];

    formFields.forEach((formField) => {
      const checkBoxCondition =
        'checked' in formField && formField.type === 'checkbox' && formField.checked === false;
      const selectCondition =
        'name' in formField && formField.name === 'birth-place' && formField.value === 'default';

      if (checkBoxCondition || selectCondition || !formField.value) errorElements.push(formField);
    });

    return errorElements;
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

    const errorElements = this.checkInvalidValues(username, sex, birthPlace, birthDate, agreement);

    if (errorElements.length) {
      this.setState({ errorElements });
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

    this.setState({ showSuccessAlert: true });
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
          <StatusAlert
            type="error"
            destroy={() => this.setState({ showErrorAlert: false })}
            message="Make sure you fulfilled all required fields"
          />
        ) : (
          ''
        )}
        {this.state.showSuccessAlert ? (
          <StatusAlert
            type="success"
            destroy={() => this.setState({ showSuccessAlert: false })}
            message="You have succesfully added new user!"
          />
        ) : (
          ''
        )}
      </form>
    );
  }
}

export default CreateForm;
