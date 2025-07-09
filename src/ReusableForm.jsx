import React, { forwardRef, useImperativeHandle } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const ReusableForm = forwardRef(
  (
    {
      fields,
      onSubmit,
      schema,
      className = '',
      inputClassName = '',
      labelClassName = '',
      selectClassName = '',
      textareaClassName = '',
      checkboxClassName = '',
      checkboxInputClassName = '',
      radioWrapperClassName = '',
      fileInputClassName = '',
      ratingClassName = '',
      submitButtonClassName = '',
      submitText = 'Submit',
      submitButtonProps = {},
    },
    ref
  ) => {
    const {
      register,
      handleSubmit,
      formState: { errors },
      watch,
      reset,
    } = useForm({
      resolver: yupResolver(schema),
    });

    const watchedValues = watch();

    useImperativeHandle(ref, () => ({
      resetForm: () => reset(),
    }));

    const enhancedSubmit = (data) => {
      onSubmit(data);
    };

    const shouldRender = (field) => {
      if (!field.conditional) return true;
      const { field: depField, value } = field.conditional;
      return watchedValues[depField] === value;
    };

    return (
      <form
        onSubmit={handleSubmit(enhancedSubmit)}
        className={`p-5 md:p-10 text-start ${className}`}
      >
        {fields.map((field) => {
          if (!shouldRender(field)) return null;

          return (
            <div key={field.name} className="mb-4 text-start">
              {field.type !== 'checkbox' && field.type !== 'rating' && (
                <label
                  htmlFor={field.name}
                  className={`mb-1 block text-sm font-medium text-gray-900 ${labelClassName}`}
                >
                  {field.label}
                </label>
              )}

              {['text', 'email', 'password', 'date'].includes(field.type) && (
                <input
                  id={field.name}
                  type={field.type}
                  {...register(field.name)}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 sm:text-sm/6 ${inputClassName}`}
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'textarea' && (
                <textarea
                  id={field.name}
                  {...register(field.name)}
                  className={`block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${textareaClassName}`}
                  placeholder={field.placeholder}
                />
              )}

              {field.type === 'select' && (
                <select
                  id={field.name}
                  {...register(field.name)}
                  className={`w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${selectClassName}`}
                >
                  {field.options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              )}

              {field.type === 'radio' && (
                <div className={`flex flex-col gap-1 mt-1 ${radioWrapperClassName}`}>
                  {field.options.map((option) => (
                    <label
                      key={option.value}
                      className="block text-sm font-medium text-gray-900"
                    >
                      <input
                        type="radio"
                        value={option.value}
                        {...register(field.name)}
                        style={{ marginRight: '5px' }}
                      />
                      {option.label}
                    </label>
                  ))}
                </div>
              )}

              {field.type === 'checkbox' && (
                <label
                  className={`flex items-center gap-2 text-sm font-medium text-gray-900 ${checkboxClassName}`}
                >
                  <input
                    id={field.name}
                    type="checkbox"
                    {...register(field.name)}
                    className={`${checkboxInputClassName}`}
                  />
                  {field.label}
                </label>
              )}

              {field.type === 'file' && (
                <input
                  id={field.name}
                  type="file"
                  {...register(field.name)}
                  className={`mt-1 w-full text-sm text-gray-700 ${fileInputClassName}`}
                />
              )}

              {field.type === 'rating' && (
                <div className={`flex flex-col gap-1`}>
                  <label
                    className={`mb-1 block text-sm font-medium text-gray-900 ${labelClassName}`}
                  >
                    {field.label}
                  </label>
                  <div className={`flex gap-1 ${ratingClassName}`}>
                    {[...Array(field.max || 5)].map((_, i) => {
                      const value = i + 1;
                      return (
                        <label key={value} className="cursor-pointer">
                          <input
                            type="radio"
                            value={value}
                            {...register(field.name)}
                            className="hidden"
                          />
                          <span className="text-2xl text-yellow-400">
                            {value <= (watch(field.name) || 0) ? '★' : '☆'}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {errors[field.name] && (
                <div className="mt-1 text-sm text-red-500">
                  {errors[field.name].message}
                </div>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className={`px-3 py-2 text-sm font-semibold shadow-sm ${submitButtonClassName}`}
          {...submitButtonProps}
        >
          {submitText}
        </button>
      </form>
    );
  }
);

export default ReusableForm;
