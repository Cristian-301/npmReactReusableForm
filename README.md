# React Reusable Form Component

A dynamic and reusable form component built with `react-hook-form` and validated using `Yup`. This component accepts a field configuration array, a Yup validation schema, and a callback function for form submission.

## Installation

```bash
npm i @developer-hub/react-reusable-form @hookform/resolvers yup
```

> **Note**: This component requires `react-hook-form`, `@hookform/resolvers`, and `yup` as peer dependencies.

## Basic Usage

```jsx
import { useRef } from 'react';
import ReusableForm from '@developer-hub/react-reusable-form';
import { formSchema } from './schema';

const MyComponent = () => {
  const formRef = useRef();

  const handleSubmit = (data) => {
    console.log('Form data:', data);
    // Reset form after successful submission
    formRef.current?.reset();
  };

  const handleReset = () => {
    // Reset form manually
    formRef.current?.reset();
  };

  return (
    <div>
      <ReusableForm
        fields={yourFields}
        schema={formSchema}
        onSubmit={handleSubmit}
        formRef={formRef}
      />
      <button onClick={handleReset}>Clear Form</button>
    </div>
  );
};
```

## Form Reset Functionality

The component provides a powerful reset method through the `formRef` prop that allows you to programmatically reset the form state.

### Setting Up Form Reset

1. **Create a ref**: Use `useRef()` to create a reference
2. **Pass the ref**: Provide it to the `formRef` prop
3. **Call reset**: Use `formRef.current?.reset()` to reset the form

```jsx
import { useRef } from 'react';

const MyComponent = () => {
  const formRef = useRef();

  // Reset after successful submission
  const handleSubmit = (data) => {
    // Process your data
    console.log('Form data:', data);
    
    // Reset form to initial state
    formRef.current?.reset();
  };

  // Reset manually with a button
  const clearForm = () => {
    formRef.current?.reset();
  };

  return (
    <>
      <ReusableForm
        fields={fields}
        schema={schema}
        onSubmit={handleSubmit}
        formRef={formRef}
      />
      <button type="button" onClick={clearForm}>
        Clear Form
      </button>
    </>
  );
};
```

### Reset Method Features

- **Complete reset**: Clears all form fields and resets them to their initial values
- **Validation reset**: Clears any validation errors
- **State reset**: Resets the entire form state managed by `react-hook-form`
- **Safe usage**: Uses optional chaining (`?.`) to prevent errors if ref is not available

### Common Reset Patterns

```jsx
// Reset after successful API call
const handleSubmit = async (data) => {
  try {
    await submitToAPI(data);
    formRef.current?.reset(); // Reset on success
  } catch (error) {
    console.error('Submission failed:', error);
    // Don't reset on error
  }
};

// Reset with confirmation
const handleReset = () => {
  if (window.confirm('Are you sure you want to clear the form?')) {
    formRef.current?.reset();
  }
};

// Reset specific sections (if needed)
const resetForm = () => {
  formRef.current?.reset();
  // Additional custom reset logic if needed
};
```

---

## Field Configuration

Form fields are defined using the `fields` prop, which accepts an array of field objects:

### Basic Field Structure

All fields support the following basic properties:

```javascript
{
  name: "email",           // Required: Field identifier
  label: "Email Address",  // Required: Display label
  type: "email",           // Required: Field type
  placeholder: "Enter your email" // Optional: Placeholder text
}
```

### Supported Field Types

* `text` - Text input
* `email` - Email input
* `password` - Password input
* `date` - Date input
* `textarea` - Text area
* `checkbox` - Checkbox
* `radio` - Radio buttons
* `select` - Select dropdown
* `file` - File upload
* `rating` - Interactive star rating component

### Fields with Options (Radio & Select)

```javascript
{
  name: "gender",
  label: "Gender",
  type: "radio", // or "select"
  options: [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" }
  ]
}
```

### Conditional Fields

```javascript
{
  name: "customCountry",
  label: "Specify Country",
  type: "text",
  conditional: {
    field: "country",
    value: "other"
  }
}
```

### Rating Fields

```javascript
{
  name: "rating",
  label: "Rate your experience",
  type: "rating",
  max: 5
}
```

## Validation Schema

```javascript
import * as yup from "yup";

export const formSchema = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),

  rating: yup
    .number()
    .min(1, "Please provide a rating")
    .max(5, "Rating cannot exceed 5 stars")
    .required("Rating is required"),

  customCountry: yup
    .string()
    .when("country", {
      is: "other",
      then: (schema) => schema.required("Please specify your country"),
      otherwise: (schema) => schema.notRequired()
    })
});
```

## Props Reference

### Core Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `fields` | Array | Yes | Array of field configuration objects |
| `schema` | Yup Schema | Yes | Yup validation schema |
| `onSubmit` | Function | Yes | Callback function for form submission |
| `formRef` | Ref | No | Reference to access form methods like `reset()` |

### Styling Props

Use the className props to customize every part of the form:

```jsx
<ReusableForm
  fields={fields}
  schema={schema}
  onSubmit={handleSubmit}
  formRef={formRef}
  className="..."
  inputClassName="..."
  labelClassName="..."
  selectClassName="..."
  textareaClassName="..."
  checkboxClassName="..."
  checkboxInputClassName="..."
  radioWrapperClassName="..."
  fileInputClassName="..."
  ratingClassName="..."
  submitButtonClassName="..."
/>
```

## License

MIT License © [developer-hub](https://github.com/Cristian-301/npmReactReusableForm/blob/main/LICENSE)

[Buy me a coffee ☕](https://buymeacoffee.com/cristianmihait)