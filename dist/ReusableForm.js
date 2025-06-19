var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/ReusableForm.jsx
var ReusableForm_exports = {};
__export(ReusableForm_exports, {
  default: () => ReusableForm
});
module.exports = __toCommonJS(ReusableForm_exports);
var import_react = __toESM(require("react"));
var import_react_hook_form = require("react-hook-form");
var import_yup = require("@hookform/resolvers/yup");
function ReusableForm({
  fields,
  onSubmit,
  schema,
  className = "",
  inputClassName = "",
  labelClassName = "",
  selectClassName = "",
  textareaClassName = "",
  checkboxClassName = "",
  checkboxInputClassName = "",
  radioWrapperClassName = "",
  fileInputClassName = "",
  ratingClassName = "",
  submitButtonClassName = ""
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = (0, import_react_hook_form.useForm)({
    resolver: (0, import_yup.yupResolver)(schema)
  });
  const watchedValues = watch();
  const enhancedSubmit = (data) => {
    onSubmit(data);
  };
  const shouldRender = (field) => {
    if (!field.conditional) return true;
    const { field: depField, value } = field.conditional;
    return watchedValues[depField] === value;
  };
  return /* @__PURE__ */ import_react.default.createElement(
    "form",
    {
      onSubmit: handleSubmit(enhancedSubmit),
      className: `p-5 md:p-10 text-start ${className}`
    },
    fields.map((field) => {
      if (!shouldRender(field)) return null;
      return /* @__PURE__ */ import_react.default.createElement("div", { key: field.name, className: "mb-4 text-start" }, field.type !== "checkbox" && field.type !== "rating" && /* @__PURE__ */ import_react.default.createElement(
        "label",
        {
          htmlFor: field.name,
          className: `mb-1 block text-sm font-medium text-gray-900 ${labelClassName}`
        },
        field.label
      ), ["text", "email", "password", "date"].includes(field.type) && /* @__PURE__ */ import_react.default.createElement(
        "input",
        {
          id: field.name,
          type: field.type,
          ...register(field.name),
          className: `block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400  sm:text-sm/6 ${inputClassName}`,
          placeholder: field.placeholder
        }
      ), field.type === "textarea" && /* @__PURE__ */ import_react.default.createElement(
        "textarea",
        {
          id: field.name,
          ...register(field.name),
          className: `block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${textareaClassName}`,
          placeholder: field.placeholder
        }
      ), field.type === "select" && /* @__PURE__ */ import_react.default.createElement(
        "select",
        {
          id: field.name,
          ...register(field.name),
          className: `w-full rounded-md bg-white py-1.5 pl-3 pr-8 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 ${selectClassName}`
        },
        field.options.map((option) => /* @__PURE__ */ import_react.default.createElement("option", { key: option.value, value: option.value }, option.label))
      ), field.type === "radio" && /* @__PURE__ */ import_react.default.createElement("div", { className: `flex flex-col gap-1 mt-1 ${radioWrapperClassName}` }, field.options.map((option) => /* @__PURE__ */ import_react.default.createElement(
        "label",
        {
          key: option.value,
          className: "block text-sm font-medium text-gray-900"
        },
        /* @__PURE__ */ import_react.default.createElement(
          "input",
          {
            type: "radio",
            value: option.value,
            ...register(field.name),
            style: { marginRight: "5px" }
          }
        ),
        option.label
      ))), field.type === "checkbox" && /* @__PURE__ */ import_react.default.createElement("label", { className: `flex items-center gap-2 text-sm font-medium text-gray-900 ${checkboxClassName}` }, /* @__PURE__ */ import_react.default.createElement(
        "input",
        {
          id: field.name,
          type: "checkbox",
          ...register(field.name),
          className: `${checkboxInputClassName}`
        }
      ), field.label), field.type === "file" && /* @__PURE__ */ import_react.default.createElement(
        "input",
        {
          id: field.name,
          type: "file",
          ...register(field.name),
          className: `mt-1 w-full text-sm text-gray-700 ${fileInputClassName}`
        }
      ), field.type === "rating" && /* @__PURE__ */ import_react.default.createElement("div", { className: `flex flex-col gap-1 ` }, /* @__PURE__ */ import_react.default.createElement("label", { className: `mb-1 block text-sm font-medium text-gray-900 ${labelClassName}` }, field.label), /* @__PURE__ */ import_react.default.createElement("div", { className: `flex gap-1 ${ratingClassName}` }, [...Array(field.max || 5)].map((_, i) => {
        const value = i + 1;
        return /* @__PURE__ */ import_react.default.createElement("label", { key: value, className: "cursor-pointer" }, /* @__PURE__ */ import_react.default.createElement(
          "input",
          {
            type: "radio",
            value,
            ...register(field.name),
            className: "hidden"
          }
        ), /* @__PURE__ */ import_react.default.createElement("span", { className: "text-2xl text-yellow-400" }, value <= (watch(field.name) || 0) ? "\u2605" : "\u2606"));
      }))), errors[field.name] && /* @__PURE__ */ import_react.default.createElement("div", { className: "mt-1 text-sm text-red-500" }, errors[field.name].message));
    }),
    /* @__PURE__ */ import_react.default.createElement(
      "button",
      {
        type: "submit",
        className: `px-3 py-2 text-sm font-semibold shadow-sm  ${submitButtonClassName}`
      },
      "Submit"
    )
  );
}
