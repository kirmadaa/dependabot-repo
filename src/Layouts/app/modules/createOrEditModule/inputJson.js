export const LeftsideContent = [
  {
    id: `item-single-line-${new Date().getTime()}`,
    name: "Single Line",
    type: "text",
    placeholder: "SingleLine",
    value: "SingleLine",
    typeDuplicate: "text",
    label: "Single Line",
    FieldName: "Single Line",
    maxLength: "255",
  },
  {
    id: `item-multi-line-${new Date().getTime()}`,
    name: "Multi Line",
    type: "textarea",
    placeholder: "MultiLine",
    value: "MultiLine",
    typeDuplicate: "textarea",
    label: "Multi Line",
    FieldName: "Multi Line",
    maxLength: "255",
  },
  {
    id: `item-email-${new Date().getTime()}`,
    name: "Email",
    type: "email",
    placeholder: "Email",
    value: "Email",
    typeDuplicate: "text",
    label: "Email",
    FieldName: "Email",
    maxLength: "255",
  },
  {
    id: `item-phone-${new Date().getTime()}`,
    name: "Phone",
    type: "number",
    placeholder: "Phone",
    value: "Phone",
    typeDuplicate: "text",
    label: "Phone",
    FieldName: "Phone",
    maxLength: "255",
  },
  {
    id: `item-picklist-${new Date().getTime()}`,
    name: "Pick List",
    type: "Select",
    placeholder: "Pick List",
    value: "select",
    typeDuplicate: "select",
    label: "Pick List",
    FieldName: "Pick List",
    options: [
      { name: "Option 1", value: "1" },
      { name: "Option 2", value: "2" },
    ],
    required: false,
    maxLength: "255",
  },

  {
    id: `item-multiselect-${new Date().getTime()}`,
    name: "Multiselect",
    type: "Multiselect",
    placeholder: "Multiselect",
    value: "Multiselect",
    typeDuplicate: "Multiselect",
    label: "Multiselect",
    FieldName: "Multiselect",
    maxLength: "255",
  },
  {
    id: `item-file-${new Date().getTime()}`,
    name: "File",
    type: "file",
    placeholder: "File",
    value: "file",
    typeDuplicate: "file",
    label: "File",
    FieldName: "File",
  },
  {
    id: `item-currency-${new Date().getTime()}`,
    name: "Currency",
    type: "number",
    placeholder: "Currency",
    value: "text",
    typeDuplicate: "text",
    FieldName: "Currency",
    label: "Currency",
    maxLength: "255",
  },
  {
    id: `item-Percent-${new Date().getTime()}`,
    name: "Percent",
    type: "number",
    placeholder: "Percent",
    value: "Percent",
    typeDuplicate: "text",
    FieldName: "Percent",
    label: "Percent",
    maxLength: "255",
  },
  // {
  //   id: `item-text-${new Date().getTime()}`,
  //   name: "Untitled Name",
  //   type: "text",
  //   placeholder: "UntitledName",
  //   value: "UntitledName",
  //   typeDuplicate: "text",
  //   label: "UntitledName",
  //   FieldName: "UntitledName",
  //   maxLength: "255",
  // },

  // {
  //   id: `item-file-${new Date().getTime()}`,
  //   name: "File",
  //   type: "file",
  //   placeholder: "File",
  //   value: "file",
  //   typeDuplicate: "text",
  //   FieldName: "File",
  //   label: "File",
  // },

  {
    id: `item-number-${new Date().getTime()}`,
    name: "Number",
    type: "number",
    placeholder: "Number",
    value: "Number",
    typeDuplicate: "text",
    FieldName: "Number",
    label: "Number",
    maxLength: "255",
  },
  {
    id: `item-checkbox-${new Date().getTime()}`,
    name: "Checkbox",
    type: "checkbox",
    placeholder: "Checkbox",
    value: "Checkbox",
    typeDuplicate: "text",
    FieldName: "Checkbox",
    label: "Checkbox",
    maxLength: "255",
  },
  {
    id: `item-lookup-${new Date().getTime()}`,
    name: "Lookup",
    type: "Lookup",
    placeholder: "Lookup",
    value: "Lookup",
    typeDuplicate: "Lookup",
    FieldName: "Lookup",
    label: "Lookup",
    moduleName: "Account",
    relatedListTitle: "Related List Name 1",
    maxLength: "255",
  },
  {
    name: "UserLookup",
    // finalName: "SingleLine",
    type: "user",
    placeholder: "User",
    id: "User",
    value: "user",
    maxLength: "255",
    duplicated: false,
    required: false,
    FieldName: "user",
    label: "User Lookup",
  },
  {
    id: `item-url-${new Date().getTime()}`,
    name: "URL",
    type: "text",
    placeholder: "URL",
    value: "Checkbox",
    typeDuplicate: "text",
    FieldName: "URL",
    label: "URL",
    maxLength: "255",
  },
  {
    id: `item-date-${new Date().getTime()}`,
    name: "Date",
    type: "date",
    placeholder: "Date",
    value: "Date",
    typeDuplicate: "text",
    FieldName: "Date",
    label: "Date",
    maxLength: "255",
  },
  {
    id: `item-date-time-${new Date().getTime()}`,
    name: "Date/Time",
    type: "datetime-local",
    placeholder: "Date/Time",
    value: "Date/Time",
    typeDuplicate: "text",
    FieldName: "Date/Time",
    label: "Date/Time",
    maxLength: "255",
  },
  // {
  //   id: `item-multi-${new Date().getTime()}`,
  //   name: "Multi Select",
  //   type: "text",
  //   placeholder: "Multi Select",
  //   value: "MultiSelect",
  //   typeDuplicate: "text",
  //   FieldName: "Multi Select",
  //   label: "Multi Select",
  // },
  {
    id: `item-formula-${new Date().getTime()}`,
    name: "Formula",
    type: "Formula",
    placeholder: "Formula",
    value: "Formula",
    typeDuplicate: "Formula",
    FieldName: "Formula",
    label: "Formula",
    maxLength: "255",
  },
];

export const FormJson = {
  formTitle: "Untitled",
  sections: [
    {
      formTitle: "New Section",
      id: `section-${new Date().getTime()}`,
      inputs: [
        {
          name: "Owner",
          // finalName: "SingleLine",
          type: "Owner",
          placeholder: "owner",
          id: "Owner",
          value: "Owner",
          maxLength: "255",
          duplicated: false,
          required: false,
          FieldName: "Owner",
          label: "Owner",
        },
        {
          name: "SingleLine",
          // finalName: "SingleLine",
          type: "text",
          placeholder: "Untitled Information",
          id: "SingleLine",
          value: "SingleLine",
          maxLength: "255",
          duplicated: false,
          required: false,
          FieldName: "Single Line",
          label: "SingleLine",
        },
      ],
    },
  ],
  quickCreateFieldsForUpdate: {}
};
