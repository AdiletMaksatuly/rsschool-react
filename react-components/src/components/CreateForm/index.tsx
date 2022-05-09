import React, { useEffect, useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useActions } from '../../hooks/useActions';
import { FormInputs, IUser } from '../../types';
import { haveSomeNonEmptyValues, joinClasses } from '../../utils';
import FileInput from '../FileInput';
import classes from './CreateForm.module.css';
import StatusAlert from './StatusAlert';
import { useTypedDispatch, useTypedSelector } from '../../hooks/redux';

const cssClasses = {
  form: joinClasses(classes['form']),
  inputs: joinClasses(classes['form__control'], classes['form__input']),
  formControl: joinClasses(classes['form__control']),
  radioWrapper: joinClasses(classes['form__control']),
  radioLabel: joinClasses(classes['form__radio-label']),
  fileInputUploadBtn: joinClasses('btn', 'btn--primary'),
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

const CreateForm: React.FC<CreateFormProps> = ({ onCreate }) => {
  const formRef = useRef<HTMLFormElement>(null);
  const sexInputsWrapperRef = useRef<HTMLInputElement>(null);
  const agreementCheckboxLabelRef = useRef<HTMLLabelElement>(null);

  const dispatch = useTypedDispatch();
  const formValues = useTypedSelector((state) => state.formValues);
  const { setFormValues } = useActions();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid, isSubmitting, isSubmitted },
    reset,
    getValues,
  } = useForm<FormInputs>({
    defaultValues: {
      ...formValues,
    },
  });

  const [userData, setUserData] = useState<IUser | Record<string, never>>({});
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [showSuccessAlert, setShowSuccessAlert] = useState<boolean>(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(!isDirty && !isValid);
  const [isClearFileInputPreview, setIsClearFileInputPreview] = useState<boolean>(false);

  useEffect(() => {
    const defaultValues = getValues();

    if (haveSomeNonEmptyValues(defaultValues)) {
      setIsButtonDisabled(false);
    }

    return () => {
      const lastValues = getValues();
      dispatch(setFormValues(lastValues));
    };
  }, []);

  useEffect(() => {
    if (isSubmitted && isValid === false) {
      setIsButtonDisabled(true);
      setShowErrorAlert(true);
    }
  }, [isSubmitting]);

  useEffect(() => {
    if (isDirty && isButtonDisabled) {
      setIsButtonDisabled(false);
    }
  }, [isDirty, isValid]);

  useEffect(() => {
    const userDataJSON = JSON.stringify(userData);

    if (userDataJSON === '{}') return;

    onCreate(JSON.parse(userDataJSON));
    setUserData({});
  }, [userData]);

  useEffect(() => {
    if (isClearFileInputPreview) {
      setIsClearFileInputPreview(false);
    }
  }, [isClearFileInputPreview]);

  const createURLToImg = async (file: File) => {
    const creating = new Promise<string | ArrayBuffer | null>((resolve) => {
      if (file) {
        const reader = new FileReader();

        reader.readAsDataURL(file);

        reader.onload = () => {
          resolve(reader.result);
        };

        return;
      }

      resolve(null);
    });

    return await creating;
  };

  const submitHandler: SubmitHandler<FormInputs> = async (data) => {
    const { username, birthDate, birthPlace, sex, img } = data;

    const image = await createURLToImg(img[0]);

    setUserData({
      id: Date.now(),
      img: image,
      name: username,
      sex,
      birthDate: new Date(birthDate).toLocaleDateString('ru-RU'),
      birthPlace,
    });

    reset();
    setIsButtonDisabled(true);
    setShowSuccessAlert(true);
    setIsClearFileInputPreview(true);
  };

  return (
    <form
      data-testid="form"
      className={cssClasses.form}
      ref={formRef}
      onSubmit={handleSubmit(submitHandler)}
    >
      <input
        className={cssClasses.inputs}
        type="text"
        {...register('username', {
          required: 'This field is required!',
          pattern: /[A-Za-z]{1,32}/,
        })}
        placeholder="Your Name"
        data-testid="name"
      />
      {errors.username && <p className="error">{errors.username.message}</p>}
      <input
        className={cssClasses.inputs}
        type="date"
        {...register('birthDate', { required: 'This field is required!' })}
        data-testid="birthDate"
      />
      {errors.birthDate && <p className="error">{errors.birthDate.message}</p>}
      <div ref={sexInputsWrapperRef} className={cssClasses.radioWrapper}>
        <label htmlFor="sexMale" className={cssClasses.radioLabel}>
          Male
          <input
            type="radio"
            value="male"
            {...register('sex', { required: 'This field is required!' })}
            id="sexMale"
            data-testid="sex"
          />
        </label>
        <label htmlFor="sexFemale" className={cssClasses.radioLabel}>
          Female
          <input
            type="radio"
            value="female"
            {...register('sex', { required: 'This field is required!' })}
            id="sexFemale"
          />
        </label>
      </div>
      {errors.sex && <p className="error">{errors.sex.message}</p>}
      <select
        className={cssClasses.formControl}
        defaultValue=""
        data-testid="birthPlace"
        {...register('birthPlace', { required: 'This field is required!' })}
      >
        <option value="" disabled>
          Место проживания
        </option>
        <option value="kz">Kazakhstan</option>
        <option value="ru">Russia</option>
        <option value="ua">Ukraine</option>
      </select>
      {errors.birthPlace && <p className="error">{errors.birthPlace.message}</p>}

      <FileInput
        inputId="imgFileInput"
        name="img"
        cssClasses={{
          buttonClassName: cssClasses.fileInputUploadBtn,
        }}
        registerHook={register}
        isClearPreview={isClearFileInputPreview}
      />

      <label ref={agreementCheckboxLabelRef} htmlFor="agreement" className={cssClasses.formControl}>
        <input
          type="checkbox"
          {...register('agreement', { required: 'This field is required!' })}
          id="agreement"
          data-testid="agreement"
        />
        Согласен на обработку данных
      </label>
      {errors.agreement && <p className="error">{errors.agreement.message}</p>}

      <button disabled={isButtonDisabled} className={cssClasses.submitBtn} data-testid="submit">
        Submit
      </button>
      {showErrorAlert ? (
        <StatusAlert
          type="error"
          destroy={() => setShowErrorAlert(false)}
          message="Make sure you fulfilled all required fields"
          data-testid="errorAlert"
        />
      ) : (
        ''
      )}
      {showSuccessAlert ? (
        <StatusAlert
          type="success"
          destroy={() => setShowSuccessAlert(false)}
          message="You have succesfully added new user!"
          data-testid="successAlert"
        />
      ) : (
        ''
      )}
    </form>
  );
};

export default CreateForm;
