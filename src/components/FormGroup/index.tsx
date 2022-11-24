import { FastField, ErrorMessage } from 'formik';
import { HiExclamationCircle } from 'react-icons/hi';
import { InputHTMLAttributes } from 'react';

interface FormGroupProps {
  name: string;
  label: string;
  input?: InputHTMLAttributes<HTMLInputElement>;
  className?: string;
}

const FormGroup = (props: FormGroupProps) => {
  const { input, name, className, label } = props;

  return (
    <FastField name={name}>
      {({ field, form, meta }) => {
        return (
          <div className={className}>
            <label
              className={`text-[12px] text-[#5e5873] mb-[4px] inline-block`}
              htmlFor={name}
            >
              {label}
            </label>
            <div className="relative h-[36px]">
              <input
                {...field}
                {...input}
                id={name}
                style={{
                  borderColor:
                    meta.touched && meta.error ? '#ea5455' : '#d8d6de',
                }}
                className={
                  `pl-[12px] pr-[40px] w-full h-full border border-solid rounded-[4px] text-[14px] text-[#6e6b7b]` +
                  (input?.className || '')
                }
              />
              {meta.touched && meta.error ? (
                <HiExclamationCircle
                  className="absolute right-[12px] top-1/2 -translate-y-1/2"
                  size={16}
                  color="#ea5455"
                />
              ) : (
                <></>
              )}
            </div>
            <ErrorMessage name={name}>
              {(error) => (
                <p className={`text-[12px] text-[#ea5455]`}>{error}</p>
              )}
            </ErrorMessage>
          </div>
        );
      }}
    </FastField>
  );
};

export default FormGroup;
