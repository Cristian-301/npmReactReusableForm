# React Reusable Form Component

A dynamic and reusable form component built with `react-hook-form` and validated using `Yup`. This component accepts a field configuration array, a Yup validation schema, and a callback function for form submission.

## Installation

```bash
npm install react-reusable-form-component @hookform/resolvers yup
```

> **Note**: This component requires `react-hook-form`, `@hookform/resolvers`, and `yup` as peer dependencies.

## Basic Usage

```jsx
import ReusableForm from '@developer-hub/react-reusable-form';
import { formSchema } from './schema';

const MyComponent = () => {
  const handleSubmit = (data) => {
    console.log('Form data:', data);
  };

  return (
    <ReusableForm 
      fields={yourFields} 
      schema={formSchema} 
      onSubmit={handleSubmit} 
    />
  );
};
```

## Field Configuration

Form fields are defined using the `fields` prop, which accepts an array of field objects:

### Basic Field Structure

All fields support the following basic properties:

```javascript
{
  name: "email",           // Required: Field identifier
  label: "Email Address",  // Required: Display label
  type: "email",          // Required: Field type
  placeholder: "Enter your email" // Optional: Placeholder text
}
```

### Supported Field Types

- `text` - Text input
- `email` - Email input
- `password` - Password input
- `date` - Date input
- `textarea` - Text area
- `checkbox` - Checkbox
- `radio` - Radio buttons
- `select` - Select dropdown
- `file` - File upload
- `rating` - Interactive star rating component

### Fields with Options (Radio & Select)

For radio buttons and select dropdowns, include an `options` array:

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

Create fields that appear based on other field values using the `conditional` property:

```javascript
{
  name: "customCountry",
  label: "Specify Country",
  type: "text",
  conditional: {
    field: "country",    // Field to watch
    value: "other"       // Value that triggers this field
  }
}
```

### File Upload Fields

For file uploads, simply use the `file` type:

```javascript
{
  name: "document",
  label: "Upload Document",
  type: "file"
}
```

### Checkbox Fields

Checkboxes have a slightly different structure where the label appears next to the checkbox:

```javascript
{
  name: "terms",
  label: "I agree to the terms and conditions",
  type: "checkbox"
}
```

### Rating Fields

Create interactive star rating components with customizable maximum stars:

```javascript
{
  name: "rating",
  label: "Rate your experience",
  type: "rating",
  max: 5  // Optional: defaults to 5 if not specified
}
```

The rating component features:
- Interactive hover effects
- Visual feedback with filled (★) and empty (☆) stars
- Click to select rating
- Accessible radio button inputs (hidden)

## Validation Schema

Create validation rules using Yup schemas:

### 1. Create a schema file (schema.js)

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

### 2. Import and use the schema

```javascript
import { formSchema } from './schema';

// Pass the schema to your ReusableForm component
<ReusableForm fields={yourFields} schema={formSchema} onSubmit={handleSubmit} />
```

## Styling & Customization

The component is highly customizable and comes with default Tailwind CSS styling. You can override any part of the styling using the provided className props.

### Default Styling Features

- **Responsive design** - Adjusts padding and layout for mobile and desktop
- **Modern styling** - Clean, professional appearance with proper focus states
- **Consistent spacing** - Proper margins and padding throughout
- **Accessibility** - Proper contrast ratios and focus indicators
- **Interactive elements** - Hover effects and visual feedback

### Custom Styling Props

You can customize every aspect of the form's appearance using these className props:

```jsx
<ReusableForm 
  fields={fields}
  schema={schema}
  onSubmit={handleSubmit}
  className="custom-form-wrapper"
  inputClassName="custom-input-style"
  labelClassName="custom-label-style"
  selectClassName="custom-select-style"
  textareaClassName="custom-textarea-style"
  checkboxClassName="custom-checkbox-wrapper"
  checkboxInputClassName="custom-checkbox-input"
  radioWrapperClassName="custom-radio-wrapper"
  fileInputClassName="custom-file-input"
  ratingClassName="custom-rating-wrapper"
  submitButtonClassName="custom-submit-button"
/>
```

### Styling Props Reference

| Prop | Applies To | Default Classes | Description |
|------|------------|-----------------|-------------|
| `className` | Form wrapper | `p-5 md:p-10 text-start` | Main form container |
| `inputClassName` | Text inputs | `block w-full rounded-md bg-white px-3 py-1.5...` | Text, email, password, date inputs |
| `labelClassName` | Labels | `mb-1 block text-sm font-medium text-gray-900` | Field labels |
| `selectClassName` | Select dropdowns | `w-full rounded-md bg-white py-1.5 pl-3...` | Select elements |
| `textareaClassName` | Text areas | `block w-full rounded-md bg-white px-3 py-1.5...` | Textarea elements |
| `checkboxClassName` | Checkbox wrapper | `flex items-center gap-2 text-sm font-medium...` | Checkbox container |
| `checkboxInputClassName` | Checkbox input | Default browser styling | Checkbox input element |
| `radioWrapperClassName` | Radio group | `flex flex-col gap-1 mt-1` | Radio button container |
| `fileInputClassName` | File inputs | `mt-1 w-full text-sm text-gray-700` | File input elements |
| `ratingClassName` | Rating stars | `flex gap-1` | Star rating container |
| `submitButtonClassName` | Submit button | `px-3 py-2 text-sm font-semibold shadow-sm` | Submit button |

### Custom Styling Examples

#### Minimal Clean Style
```jsx
<ReusableForm 
  className="max-w-md mx-auto p-6"
  inputClassName="border border-gray-300 rounded px-3 py-2 focus:border-blue-500"
  labelClassName="text-gray-700 mb-2 block"
  submitButtonClassName="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
  // ... other props
/>
```

#### Dark Theme
```jsx
<ReusableForm 
  className="bg-gray-900 p-8 rounded-lg"
  inputClassName="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2 focus:border-blue-400"
  labelClassName="text-gray-200 mb-2 block"
  selectClassName="bg-gray-800 text-white border border-gray-600 rounded px-3 py-2"
  submitButtonClassName="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
  // ... other props
/>
```

#### Completely Custom (No Default Styles)
```jsx
<ReusableForm 
  className="" // Override default form padding
  inputClassName="your-custom-input-class"
  labelClassName="your-custom-label-class"
  submitButtonClassName="your-custom-button-class"
  // ... other props to override all default styling
/>
```

## Complete Example

```javascript
import ReusableForm from 'react-reusable-form-component';
import { formSchema } from './schema';

const ContactForm = () => {
  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name"
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "your.email@example.com"
    },
    {
      name: "birthDate",
      label: "Date of Birth",
      type: "date"
    },
    {
      name: "country",
      label: "Country",
      type: "select",
      options: [
        { value: "", label: "Select a country" },
        { value: "us", label: "United States" },
        { value: "ca", label: "Canada" },
        { value: "other", label: "Other" }
      ]
    },
    {
      name: "customCountry",
      label: "Specify Country",
      type: "text",
      placeholder: "Please specify your country",
      conditional: {
        field: "country",
        value: "other"
      }
    },
    {
      name: "message",
      label: "Message",
      type: "textarea",
      placeholder: "Tell us about your experience..."
    },
    {
      name: "resume",
      label: "Upload Resume",
      type: "file"
    },
    {
      name: "satisfaction",
      label: "Rate your satisfaction",
      type: "rating",
      max: 5
    },
    {
      name: "newsletter",
      label: "Subscribe to our newsletter",
      type: "checkbox"
    },
    {
      name: "contactMethod",
      label: "Preferred Contact Method",
      type: "radio",
      options: [
        { value: "email", label: "Email" },
        { value: "phone", label: "Phone" },
        { value: "mail", label: "Postal Mail" }
      ]
    }
  ];

  const handleSubmit = (data) => {
    console.log('Form submitted:', data);
    // Handle form submission here
    // The data object contains all form values including:
    // - File objects for file inputs
    // - Boolean values for checkboxes
    // - String values for other inputs
  };

  return (
    <div className="max-w-2xl mx-auto">
      <ReusableForm 
        fields={fields} 
        schema={formSchema} 
        onSubmit={handleSubmit}
        // Optional: Customize styling
        className="bg-white shadow-lg rounded-lg"
        submitButtonClassName="bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
      />
    </div>
  );
};

export default ContactForm;
```

## Field Properties Reference

| Property | Type | Required | Applies To | Description |
|----------|------|----------|------------|-------------|
| `name` | String | Yes | All fields | Unique field identifier |
| `label` | String | Yes | All fields | Display label for the field |
| `type` | String | Yes | All fields | Field type (text, email, select, etc.) |
| `placeholder` | String | No | Input fields | Placeholder text |
| `options` | Array | Yes | radio, select | Array of {value, label} objects |
| `conditional` | Object | No | All fields | Conditional rendering config |
| `max` | Number | No | rating | Maximum number of stars (default: 5) |

### Conditional Object Structure

```javascript
{
  field: "fieldName",    // Name of the field to watch
  value: "targetValue"   // Value that triggers this field's visibility
}
```

## Component Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `fields` | Array | Yes | Array of field configuration objects |
| `schema` | Yup Schema | Yes | Yup validation schema |
| `onSubmit` | Function | Yes | Callback function called when form is submitted |
| `className` | String | No | Custom CSS classes for form wrapper |
| `inputClassName` | String | No | Custom CSS classes for input elements |
| `labelClassName` | String | No | Custom CSS classes for labels |
| `selectClassName` | String | No | Custom CSS classes for select elements |
| `textareaClassName` | String | No | Custom CSS classes for textarea elements |
| `checkboxClassName` | String | No | Custom CSS classes for checkbox wrapper |
| `checkboxInputClassName` | String | No | Custom CSS classes for checkbox input |
| `radioWrapperClassName` | String | No | Custom CSS classes for radio group wrapper |
| `fileInputClassName` | String | No | Custom CSS classes for file inputs |
| `ratingClassName` | String | No | Custom CSS classes for rating stars wrapper |
| `submitButtonClassName` | String | No | Custom CSS classes for submit button |

## Technical Details

### Dependencies
- `react` - React framework
- `react-hook-form` - Form state management and validation
- `@hookform/resolvers` - Resolvers for react-hook-form
- `yup` - Schema validation

> **Note**: These are peer dependencies and must be installed separately in your project.

## Features

- ✅ **10 field types supported** - text, email, password, date, textarea, checkbox, radio, select, file, rating
- ✅ **Dynamic field generation** - Create forms from configuration arrays
- ✅ **Built-in validation** - Powered by Yup with real-time error display
- ✅ **Conditional field rendering** - Show/hide fields based on other field values
- ✅ **Interactive star ratings** - Visual star selection with hover effects
- ✅ **File upload support** - Handle file inputs seamlessly
- ✅ **Fully customizable styling** - 11 different className props for complete control
- ✅ **Responsive design** - Mobile-first approach with sensible defaults
- ✅ **Form state management** - Powered by react-hook-form
- ✅ **Accessibility compliant** - Proper labels, focus management, and semantic HTML
- ✅ **Zero config styling** - Works great out of the box with Tailwind CSS
- ✅ **Framework agnostic** - Works with any React project

## NPM Package

This component is available as an NPM package: `react-reusable-form-component`

- 📦 **Lightweight** - Minimal bundle size with peer dependencies
- 🔧 **TypeScript ready** - Full TypeScript support (if applicable)
- 🎨 **Customizable** - Complete control over styling and behavior
- 📱 **Mobile optimized** - Responsive by default

## Browser Support

This component requires a modern browser that supports:
- ES6+ JavaScript features
- CSS Grid and Flexbox
- File API (for file uploads)
- Modern form validation APIs


## Contributing

We welcome contributions from the community! Whether it's bug reports, feature requests, or code contributions, please feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request with detailed description

Please ensure your code follows our style guidelines and includes appropriate tests.

## License

MIT License © developer-hub

For detailed license information, see the [LICENSE file](https://github.com/Cristian-301/npmReactReusableForm/blob/main/LICENSE) in the repository.

---

**Questions or Issues?** Check out our [GitHub Issues](https://github.com/Cristian-301/npmReactReusableForm/issues) or start a [Discussion](https://github.com/Cristian-301/npmReactReusableForm/discussions).


License [MIT](https://github.com/Cristian-301/npmReactReusableForm/blob/main/LICENSE)

[Buy me a coffe](coff.ee/CristianMihaiT)