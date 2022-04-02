import React from 'react';
import { IUser } from '../../types';
import classes from './CreateForm.module.css';

const joinClasses = (...args: string[]) => {
  return args.join(' ');
};

const cssClasses = {
  form: joinClasses(classes['form']),
  inputs: joinClasses(classes['form__control'], classes['form__input']),
  formControl: joinClasses(classes['form__control']),
  radioWrapper: joinClasses(classes['form__control']),
  radioLabel: joinClasses(classes['form__radio-label']),
  fileInputLabel: joinClasses(classes['form__file-input-label']),
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
}

class CreateForm extends React.Component<CreateFormProps, CreateFormState> {
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
    };
  }
  render() {
    return (
      <form className={cssClasses.form}>
        <input className={cssClasses.inputs} type="text" name="username" placeholder="Your Name" />
        <input
          className={cssClasses.inputs}
          type="date"
          name="birth-date"
          placeholder="Date of birth"
        />
        <div className={cssClasses.radioWrapper}>
          <label htmlFor="sexMale" className={cssClasses.radioLabel}>
            Male
            <input type="radio" value="male" name="sex" id="sexMale" />
          </label>
          <label htmlFor="sexFemale" className={cssClasses.radioLabel}>
            Female
            <input type="radio" value="female" name="sex" id="sexFemale" />
          </label>
        </div>
        <select className={cssClasses.formControl} name="birth-place">
          <option value="kz">Kazakhstan</option>
          <option value="ru">Russia</option>
          <option value="ua">Ukraine</option>
        </select>
        <label htmlFor="fileInput" className={cssClasses.fileInputLabel}>
          <button className={cssClasses.fileInputUploadBtn} type="button">
            Upload
          </button>
          ...or just drop a file here
          <input type="file" className={cssClasses.fileInput} name="img" id="fileInput" />
        </label>
        <label htmlFor="agreement" className={cssClasses.formControl}>
          <input type="checkbox" name="agreement" />
          Согласен на обработку данных
        </label>
        <button disabled className={cssClasses.submitBtn}>
          Submit
        </button>
      </form>
    );
  }
}

export default CreateForm;
