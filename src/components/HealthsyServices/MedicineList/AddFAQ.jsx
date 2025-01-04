import React, { useMemo, useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import JoditEditor from "jodit-react";
import MandatoryField from "../../../common/MandatoryField";
import { Plus, Trash2 } from "lucide-react";

export default function FAQ({ placeholder = "Type here",setSelectedTab }) {
  const editor = useRef(null);
  const { control, handleSubmit } = useForm({
    defaultValues: {
      faqs: [{ question: "", answer: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: "faqs",
  });

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
    }),
    [placeholder]
  );

  const onSubmit = (data) => {
    console.log(data);
  };
  const handlePrevious=()=>{
    setSelectedTab("medicine")
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-[#4D4D4D] pb-3 "
        >
          Description <MandatoryField />
        </label>
        <Controller
          name="description"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => field.onChange(newContent)}
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="author_details"
          className="block text-sm font-medium text-[#4D4D4D] pb-3"
        >
          Author Details <MandatoryField />
        </label>
        <Controller
          name="author_details"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => field.onChange(newContent)}
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="warning_and_precaution"
          className="block text-sm font-medium text-[#4D4D4D] pb-3"
        >
          Warning and precaution <MandatoryField />
        </label>
        <Controller
          name="warning_and_precaution"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => field.onChange(newContent)}
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="direction_and_uses"
          className="block text-sm font-medium text-[#4D4D4D] pb-3"
        >
          Direction and Uses{" "}
        </label>
        <Controller
          name="direction_and_uses"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => field.onChange(newContent)}
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="side_effects"
          className="block text-sm font-medium text-[#4D4D4D] pb-3"
        >
          Side Effects <MandatoryField />
        </label>
        <Controller
          name="side_effects"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => field.onChange(newContent)}
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="storage_disposal"
          className="block text-sm font-medium text-[#4D4D4D] pb-3"
        >
          Storage & Disposal <MandatoryField />
        </label>
        <Controller
          name="storage_disposal"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => field.onChange(newContent)}
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="dosage"
          className="block text-sm font-medium text-[#4D4D4D] pb-3"
        >
          Dosage <MandatoryField />
        </label>
        <Controller
          name="dosage"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => field.onChange(newContent)}
            />
          )}
        />
      </div>
      <div>
        <label
          htmlFor="reference"
          className="block text-sm font-medium text-[#4D4D4D] pb-3"
        >
          Reference <MandatoryField />
        </label>
        <Controller
          name="reference"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <JoditEditor
              ref={editor}
              value={field.value}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => field.onChange(newContent)}
            />
          )}
        />
      </div>

      {/* FAQ Section */}
      <div className="space-y-4">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-1 md:grid-cols-[1fr_1fr_auto] gap-4 items-center"
          >
            <div>
              <label
                htmlFor={`faqs.${index}.question`}
                className="block mb-2 text-sm font-medium text-[#4D4D4D]"
              >
                Question {index + 1} <MandatoryField />
              </label>
              <input
                type="text"
                id={`faqs.${index}.question`}
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter medicine Question"
              />
            </div>
            <div>
              <label
                htmlFor={`faqs.${index}.answer`}
                className="block mb-2 text-sm font-medium text-[#4D4D4D]"
              >
                Answer <MandatoryField />
              </label>
              <input
                type="text"
                id={`faqs.${index}.answer`}
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter package Answer"
              />
            </div>
            {index >= 0 && (
              <div className="flex px-3 py-2 mt-7 justify-center items-center rounded-md bg-[#EB0000] ">
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-white hover:text-white"
                >
                  <Trash2 className="h-8 w-8" />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex">
        <button
          onClick={() => append({ question: "", answer: "" })}
          type="button"
          className="relative flex h-10 w-full sm:w-[121px] items-center justify-start border rounded-lg border-btn_bg bg-btn_bg text-[13px] transition-all duration-300 hover:bg-btn_bg"
        >
          <span className="flex h-full w-[39px] items-center justify-center rounded-lg bg-btn_bg transition-all duration-300 active:bg-[#2e8644]">
            <Plus className="h-6 w-6 stroke-white stroke-2" />
          </span>
          <span className="flex font-Mulish text-white">Add FAQ</span>
        </button>
      </div>


      <div className="w-full flex justify-end items-center gap-4 p-4">

      <button
      onClick={handlePrevious}
        type="submit"
        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#181423] bg-[#f5f3f3] hover:bg-[#E9E9E9focus:outline-none  "
      >
        Previous Page 
      </button>
      <button
        type="submit"
        className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1AAA55] hover:bg-[#1AAA55] focus:outline-none  "
      >
        Submit
      </button>
      </div>
    </form>
  );
}
