import React, { useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import _ from "lodash";
// import { PiUpload } from "react-icons/pi";
// import { toBase64 } from "../../routes/utils.files";
// import Compressor from "compressorjs";
import clsx from "clsx";

// import { uploadFileClientSide } from "./upload";

export function Input({
  type,
  label,
  name,
  required,
  placeholder,
  rules,
  defaultValue,
  value,
  onChange,
  disabled,
  onBlur,
  maxLength,
  customStyle,
}) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext(); // retrieve all hook methods
  const [inputValue, setInputValue] = useState(value || defaultValue || "");
  const isUsingExternalState = onChange && _.isFunction(onChange);
  let registerProps = {};
  if (required) {
    registerProps.required = `${label} is required`;
  }

  if (rules) {
    registerProps = {
      ...registerProps,
      ...rules,
    };
  }

  registerProps.onBlur = (evt) => {
    trigger(name);
    if (onBlur) onBlur(evt.target.value);
  };

  const onInputChange = (evt) => {
    if (isUsingExternalState) {
      onChange(evt.target.value);
    } else {
      setInputValue(evt.target.value);
    }
  };

  return (
    <div className="p-1 mb-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          {...register(name, registerProps)}
          id={name}
          className="w-full p-1 rounded-md input"
          defaultValue={value}
          placeholder={placeholder}
        />
      ) : (
        <input
          {...register(name, registerProps)}
          type={_.defaultTo(type, "text")}
          id={name}
          // className="w-full p-1 rounded-md input"
          className={clsx(
            customStyle ? customStyle : "input bg-[#E5E5E5] rounded-lg p-2 w-full border-none ",
          )}
          value={isUsingExternalState ? value : inputValue}
          onChange={onInputChange}
          placeholder={placeholder}
          autoComplete="off"
          disabled={disabled || false}
          maxLength={maxLength}
        />
      )}
      {errors[name] && (
        <span className="text-xs text-red-600">{errors[name].message}</span>
      )}
    </div>
  );
}

export function TextInput(props) {
  return <Input type="text" {...props} />;
}

export function TextAreaInput({
  label,
  name,
  required,
  rules,
  value,
  onChange,
  ...props
}) {
  return (
    <Input
      type="textarea"
      label={label}
      name={name}
      required={required}
      rules={rules}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}

export function DateInput(props) {
  return <Input {...props} type="date" />;
}

export function RadioGroup({ label, name, required, options ,disabled }) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext(); // retrieve all hook methods
  const rules = {};
  if (required) {
    rules.required = `${label} is required`;
  }

  return (
    <div className="p-1 mb-1">
      <div className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </div>
      <div className="mt-1">
        {_.map(options, ([optionValue, optionLabel, isSelected]) => (
          <label className="mr-2" key={optionValue}>
            <input
              {...register(name, rules)}
              type="radio"
              defaultValue={optionValue}
              defaultChecked={isSelected}
              onBlur={() => trigger(name)}
              disabled={disabled}
            />
            <span className="ml-1">{optionLabel}</span>
          </label>
        ))}
      </div>
      <div>
        {errors[name] && (
          <span className="text-xs text-red-600">{errors[name].message}</span>
        )}
      </div>
    </div>
  );
}

export function Select({
  label,
  name,
  required,
  options,
  value,
  onChange,
  onBlur,
}) {
  const [inputValue, setInputValue] = useState(value || "");
  const isUsingExternalState = onChange && _.isFunction(onChange);

  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext(); // retrieve all hook methods

  let registerProps = {};
  if (required) {
    registerProps.required = `${label} is required`;
  }

  registerProps.onBlur = (evt) => {
    trigger(name);
    if (onBlur) onBlur(evt.target.value);
  };

  const onInputChange = (evt) => {
    if (isUsingExternalState) {
      onChange(evt.target.value);
    } else {
      setInputValue(evt.target.value);
    }
  };

  return (
    <div className="p-1 mb-1">
      <div className="text-sm font-medium">
        {label}
        {required && <span className="ml-1 text-red-600">*</span>}
      </div>
      <div>
        <select
          {...register(name, registerProps)}
          className="w-full p-1 rounded-md input"
          value={isUsingExternalState ? value : inputValue}
          onChange={onInputChange}
        >
          {_.map(options, ([optionValue, optionLabel]) => (
            <option key={optionValue} value={optionValue}>
              {optionLabel}
            </option>
          ))}
        </select>
      </div>
      <div>
        {errors[name] && (
          <span className="text-xs text-red-600">{errors[name].message}</span>
        )}
      </div>
    </div>
  );
}

export function NumberInput(props) {
  return <Input {...props} type="number" />;
}

export function MobileNumberInput(props) {
  return (
    <TextInput
      {...props}
      rules={{
        pattern: {
          value: /^\d+$/,
          message: "Mobile number should only contain numeric characters.",
        },
        minLength: {
          value: 10,
          message: "Mobile number should be at least 10 digits long.",
        },
        maxLength: {
          value: 10,
          message: "Mobile number should not exceed 10 digits.",
        },
      }}
    />
  );
}

export function EmailInput(props) {
  return (
    <TextInput
      {...props}
      rules={{
        pattern: {
          value:
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
          message: "Enter valid email",
        },
      }}
    />
  );
}

export function HiddenInput({ name, value }) {
  return <input type="hidden" name={name} value={value || ""} />;
}

// export function FileInputWithId({
//   env,
//   name,
//   label,
//   required,
//   onUpload,
//   acceptPdfOnly,
//   productImage,
// }) {
//   const [loadingTrue, setLoadingTrue] = useState(false);

//   const {
//     register,
//     formState: { errors },
//     setValue,
//   } = useFormContext();

//   let registerProps = {};
//   if (required) {
//     registerProps.required = `${_.startCase(label.replace("Upload ", ""))} is required`;
//   }

//   const inputRef = useRef();
//   const [imageUrl, setImageUrl] = useState();
//   // console.log("imageurl", imageUrl);
//   const fetcher = useFetcher();

//   const onChange = async (e) => {
//     e.preventDefault();

//     const file = e.target.files[0];

//     if (!file) {
//       return;
//     }

//     if (file.type.startsWith("image/")) {
//       setLoadingTrue(true);

//       const compressedBlob = await new Promise((resolve, reject) => {
//         new Compressor(file, {
//           quality: 0.1,
//           mimeType: "image/webp",

//           success(result) {
//             resolve(result);
//           },
//           error(error) {
//             reject(error);
//           },
//         });
//       });

//       const compressedImageName = compressedBlob.name;
//       const compressedFile = new File([compressedBlob], compressedImageName, {
//         type: compressedBlob.type,
//       });
//       // console.log("compressedFile", compressedFile.size);

//       setImageUrl(URL.createObjectURL(compressedFile));

//       const base64File = await toBase64(compressedFile);

//       if (onUpload) {
//         onUpload("start");
//         const result = await uploadFileClientSide(
//           env,
//           compressedImageName,
//           base64File,
//         );
//         onUpload("complete", {
//           id: result?.data?.file?.id,
//           url: result?.data?.file?.url,
//         });
//       }

//       setValue(name, compressedFile);
//       setLoadingTrue(false);
//     } else if (file.type === "application/pdf") {
//       handlePDFUpload(file);
//     }
//   };

//   const handlePDFUpload = async (pdfFile) => {
//     setLoadingTrue(true);
//     setImageUrl(URL.createObjectURL(pdfFile));
//     const base64File = await toBase64(pdfFile);

//     if (onUpload) {
//       onUpload("start");
//       const result = await uploadFileClientSide(env, pdfFile?.name, base64File);
//       onUpload("complete", {
//         id: result?.data?.file?.id,
//         url: result?.data?.file?.url,
//       });
//     }

//     setValue(name, pdfFile);
//     setLoadingTrue(false);
//   };

//   useEffect(() => {
//     setImageUrl(productImage);
//   }, [productImage]);
//   // useEffect(() => {
//   //   if (fetcher.state === "idle" && fetcher.data) {
//   //     const id = _.get(fetcher.data, "id");
//   //     const url = _.get(fetcher.data, "url");
//   //     setValue(name, id);

//   //     if (id) {
//   //       onUpload("complete", { id, url });
//   //     }
//   //   }
//   // }, [fetcher]);

//   return (
//     <div className="p-1 mb-2">
//       <label className="text-sm font-medium">
//         {label}
//         {required && <span className="ml-1 text-red-600">*</span>}
//       </label>

//       {productImage ? (
//         <div
//           className={`${imageUrl === "" || imageUrl === undefined ? "" : "h-[150px] w-[150px]"}`}
//         >
//           {imageUrl && (
//             <img
//               src={imageUrl}
//               className={`${imageUrl === "" || imageUrl === undefined ? "" : "h-[100%] w-[100%]"}`}
//               alt=""
//             />
//           )}
//         </div>
//       ) : (
//         <>{imageUrl && <img src={imageUrl} className="mb-2" alt="" />}</>
//       )}

//       <input
//         {...register(name, registerProps)}
//         type="file"
//         className="hidden"
//         accept={acceptPdfOnly ? ".pdf" : "image/*"}
//         ref={inputRef}
//         onChange={onChange}
//       />
//       <button
//         type="button"
//         className="flex w-32 gap-2 p-1 pl-4 mt-1 mb-1 text-green-500 border border-green-500 border-dashed rounded-lg bg-green-50"
//         onClick={() => inputRef.current.click()}
//       >
//         <PiUpload className="text-2xl" />
//         <div>{loadingTrue ? "Uploading" : "Upload"}</div>
//       </button>
//       <div>
//         {errors[name] && !imageUrl && (
//           <span className="text-xs text-red-600">{errors[name].message}</span>
//         )}
//       </div>
//     </div>
//   );
// }

// export function FileInput({
//   name,
//   label,
//   required,
//   onUpload,
//   acceptPdfOnly,
//   productImage,
// }) {
//   const {
//     register,
//     formState: { errors },
//     setValue,
//   } = useFormContext();

//   let registerProps = {};
//   if (required) {
//     registerProps.required = `${_.startCase(label.replace("Upload ", ""))} is required`;
//   }

//   const inputRef = useRef();
//   const [imageUrl, setImageUrl] = useState();
//   console.log("imageUrl---", imageUrl);

//   const [imageLoading, setImageLoading] = useState(false);
//   const fetcher = useFetcher();
//   console.log("===fetcher====", fetcher);

//   const onChange = async (e) => {
//     const file = e.target.files[0];

//     if (!file) {
//       return;
//     }

//     setImageLoading(true);

//     let processedFile = file;

//     if (file.type.startsWith("image/")) {
//       const compressedBlob = await new Promise((resolve, reject) => {
//         new Compressor(file, {
//           quality: 0.01,
//           mimeType: "image/webp",

//           success(result) {
//             resolve(result);
//           },
//           error(error) {
//             reject(error);
//           },
//         });
//       });

//       const compressedImageName = compressedBlob.name;
//       processedFile = new File([compressedBlob], compressedImageName, {
//         type: compressedBlob.type,
//       });
//       setImageUrl(URL.createObjectURL(processedFile));
//     } else if (file.type === "application/pdf") {
//       setImageUrl(URL.createObjectURL(file));
//     }

//     setImageLoading(false);
//     if (onUpload) {
//       fetcher.submit(
//         {
//           name: processedFile.name,
//           content: await toBase64(processedFile),
//         },
//         {
//           method: "POST",
//           action: "/utils/files",
//         },
//       );
//       onUpload("start");
//     }
//     setValue(name, processedFile);
//   };

//   useEffect(() => {
//     if (fetcher.state === "idle" && fetcher.data) {
//       onUpload("complete", {
//         id: _.get(fetcher.data, "id"),
//         url: _.get(fetcher.data, "url"),
//       });
//     }
//   }, [fetcher]);

//   useEffect(() => {
//     setImageUrl(productImage);
//   }, [productImage]);

//   return (
//     <div className="p-1 mb-2">
//       <label className="text-sm font-medium">
//         {label}
//         {required && <span className="ml-1 text-red-600">*</span>}
//       </label>
//       {productImage ? (
//         <div
//           className={`${imageUrl === "" || imageUrl === undefined ? "" : "h-[150px] w-[150px]"}`}
//         >
//           {imageUrl && (
//             <img
//               src={imageUrl}
//               className={`${imageUrl === "" || imageUrl === undefined ? "" : "h-[100%] w-[100%]"}`}
//               alt=""
//             />
//           )}
//         </div>
//       ) : (
//         <>{imageUrl && <img src={imageUrl} className="mb-2" alt="" />}</>
//       )}
//       <input
//         {...register(name, registerProps)}
//         type="file"
//         className="hidden"
//         accept={acceptPdfOnly ? ".pdf" : "image/*"}
//         ref={inputRef}
//         onChange={onChange}
//       />
//       <button
//         type="button"
//         className="flex w-32 gap-2 p-1 pl-4 mt-1 mb-1 text-green-500 border border-green-500 border-dashed rounded-lg bg-green-50"
//         onClick={() => inputRef.current.click()}
//       >
//         <PiUpload className="text-2xl" />
//         <div>{imageLoading ? "Uploading" : "Upload"}</div>
//       </button>
//       <div>
//         {errors[name] && !imageUrl && (
//           <span className="text-xs text-red-600">{errors[name].message}</span>
//         )}
//       </div>
//     </div>
//   );
// }
// export function CaptureInput({ name, label, required, onUpload }) {
//   const {
//     register,
//     formState: { errors },
//     setValue,
//   } = useFormContext();

//   let registerProps = {};
//   if (required) {
//     registerProps.required = `${_.startCase(label.replace("Upload ", ""))} is required`;
//   }

//   const inputRef = useRef();
//   const [imageUrl, setImageUrl] = useState();
//   const fetcher = useFetcher();

//   const onChange = async (e) => {
//     const file = e.target.files[0];

//     try {
//       const compressedFile = await compressImage(file);
//       setImageUrl(URL.createObjectURL(compressedFile));
//       console.log(`Image Compressed Successfully!`);
//     } catch (e) {
//       console.log(`Error compressing the image, uploading the default image`);
//       setImageUrl(URL.createObjectURL(file));
//     }

//     if (onUpload) {
//       fetcher.submit(
//         {
//           name: file.name,
//           content: await toBase64(file),
//         },
//         {
//           method: "POST",
//           action: "/utils/files",
//         },
//       );
//       onUpload("start");
//     }
//     setValue(name, file);
//   };

//   const compressImage = async (file) => {
//     try {
//       const compressedBlob = await new Promise((resolve, reject) => {
//         new Compressor(file, {
//           quality: 0.6,
//           convertSize: 4000000, // approx 4 MB
//           mimeType: "image/jpeg",
//           success(result) {
//             resolve(result);
//           },
//           error(error) {
//             reject(error);
//           },
//         });
//       });

//       console.log(`Image Compressed, returning => compressedBlob`);
//       return compressedBlob;
//     } catch (error) {
//       console.error(error);
//       return error;
//     }
//   };

//   useEffect(() => {
//     if (fetcher.state === "idle" && fetcher.data) {
//       onUpload("complete", {
//         id: _.get(fetcher.data, "id"),
//         url: _.get(fetcher.data, "url"),
//       });
//     }
//   }, [fetcher]);

//   return (
//     <div className="p-1 mb-2">
//       <label className="text-sm font-medium">
//         {label}
//         {required && <span className="ml-1 text-red-600">*</span>}
//       </label>
//       {imageUrl && <img src={imageUrl} className="mb-2" alt="" />}
//       <input
//         {...register(name, registerProps)}
//         type="file"
//         capture="user"
//         className="hidden"
//         accept="image/*"
//         ref={inputRef}
//         onChange={onChange}
//       />
//       <button
//         type="button"
//         className="flex w-32 gap-2 p-1 pl-4 mt-1 mb-1 text-green-500 border border-green-500 border-dashed rounded-lg bg-green-50"
//         onClick={() => inputRef.current.click()}
//       >
//         <PiUpload className="text-2xl" />
//         <div>Upload</div>
//       </button>
//       <div>
//         {errors[name] && !imageUrl && (
//           <span className="text-xs text-red-600">{errors[name].message}</span>
//         )}
//       </div>
//     </div>
//   );
// }

export function Checkbox({
  label,
  name,
  required,
  rules,
  defaultChecked,
  checked,
  onChange,
  onBlur,
}) {
  const {
    register,
    formState: { errors },
    trigger,
  } = useFormContext();
  const [isChecked, setIsChecked] = useState(
    checked || defaultChecked || false,
  );

  let isUsingExternalState = onChange && _.isFunction(onChange);
  let registerProps = {};

  if (required) {
    registerProps.required = `check required`;
  }

  if (rules) {
    registerProps = {
      ...registerProps,
      ...rules,
    };
  }

  registerProps.onBlur = (evt) => {
    trigger(name);
    if (onBlur) onBlur(evt.target.value);
  };

  const onInputChange = (e) => {
    if (isUsingExternalState) {
      onChange(e.target.checked);
    } else {
      setIsChecked(e.target.checked);
    }
  };

  return (
    <div className="p-1 mb-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
        {/* {required && <span className="ml-1 text-red-600">*</span>} */}
      </label>

      <input
        {...register(name, registerProps)}
        type={"checkbox"}
        id={name}
        className={"w-content ml-2 rounded-sm p-1"}
        checked={isUsingExternalState ? checked : isChecked}
        onChange={onInputChange}
      />

      {errors[name] && (
        <span className="ml-2 text-xs text-red-600">
          {errors[name].message}
        </span>
      )}
    </div>
  );
}
