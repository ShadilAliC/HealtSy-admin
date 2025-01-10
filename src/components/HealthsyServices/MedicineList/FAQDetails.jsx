import React, { useEffect, useMemo, useRef, useState } from "react";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import JoditEditor from "jodit-react";
import MandatoryField from "../../../common/MandatoryField";
import { Plus, Trash2 } from "lucide-react";
import { useSelector } from "react-redux";
import {
  createMedicine,
  updateMedicine,
} from "../../../api/HealthSyServicesApi";
import Success from "../../../common/Success";
import { useNavigate, useParams } from "react-router-dom";

export default function FAQDetails({
  placeholder = "Type here",
  setSelectedTab,
  status,
}) {
  const { id } = useParams();

  const editor = useRef(null);
  const navigate = useNavigate();
  const medicineInfo = useSelector((state) => state.medicine.medicineInfo);
  const [isOpenSuccess, setIsOpenSuccess] = useState(false);
  const [message, setMessage] = useState("");
  console.log(medicineInfo, "medicineInfo");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      author_details: "",
      warning_and_precaution: "",
      direction_and_uses: "",
      side_effects: "",
      storage_disposal: "",
      dosage: "",
      reference: "",
      faqs: [],
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

  const onSubmit = async (data) => {
    try {
      const mergedData = {
        ...medicineInfo,
        ...data,
      };
      console.log(mergedData, "update");

      if (status == "edit") {
        const res = await updateMedicine(id, mergedData);
        if (res?.success) {
          setIsOpenSuccess(true);
          setMessage("Medicine Updated Successfully");
          setTimeout(() => {
            setIsOpenSuccess(false);
            navigate("/healthsy-services/order-medicines/medicine-list");
          }, 2000);
        } else {
          toast.error(res.message || "Failed to add ProductType.");
        }
      } else {
        const res = await createMedicine(mergedData);
        if (res?.success) {
          setIsOpenSuccess(true);
          setMessage("New Medicine Added Successfully");
          setTimeout(() => {
            setIsOpenSuccess(false);
            navigate("/healthsy-services/order-medicines/medicine-list");
          }, 2000);
        } else {
          toast.error(res.message || "Failed to add ProductType.");
        }
      }
      // console.log(res);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    if (medicineInfo && id) {
      setValue("description", medicineInfo?.faq?.faq_description);
      setValue("author_details", medicineInfo?.faq?.author_details);
      setValue(
        "warning_and_precaution",
        medicineInfo?.faq?.warning_and_precaution
      );
      setValue("direction_and_uses", medicineInfo?.faq?.direction_uses);
      setValue("side_effects", medicineInfo?.faq?.side_effect);
      setValue("storage_disposal", medicineInfo?.faq?.storage_disposal);
      setValue("dosage", medicineInfo?.faq?.dosage);
      setValue("reference", medicineInfo?.faq?.reference);

      if (medicineInfo?.faq?.question_answers && medicineInfo?.faq?.question_answers.length > 0) {
        medicineInfo?.faq?.question_answers.forEach((item) => {
          console.log(item,'ss');
          
          append(item);
        });
      }
    }
  }, []);

  const handlePrevious = () => {
    setSelectedTab("medicine");
  };

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
          rules={{ required: "Description is required" }}
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
        {errors.description && (
          <p className="text-red-500 text-sm mt-1">
            {errors.description.message}
          </p>
        )}
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
          rules={{ required: "Author Details are required" }}
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
        {errors.author_details && (
          <p className="text-red-500 text-sm mt-1">
            {errors.author_details.message}
          </p>
        )}
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
          rules={{ required: "Warning and precaution are required" }}
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
        {errors.warning_and_precaution && (
          <p className="text-red-500 text-sm mt-1">
            {errors.warning_and_precaution.message}
          </p>
        )}
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
          rules={{ required: "Side Effects are required" }}
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
        {errors.side_effects && (
          <p className="text-red-500 text-sm mt-1">
            {errors.side_effects.message}
          </p>
        )}
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
          rules={{ required: "Storage & Disposal information is required" }}
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
        {errors.storage_disposal && (
          <p className="text-red-500 text-sm mt-1">
            {errors.storage_disposal.message}
          </p>
        )}
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
          rules={{ required: "Dosage information is required" }}
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
        {errors.dosage && (
          <p className="text-red-500 text-sm mt-1">{errors.dosage.message}</p>
        )}
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
          rules={{ required: "Reference is required" }}
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
        {errors.reference && (
          <p className="text-red-500 text-sm mt-1">
            {errors.reference.message}
          </p>
        )}
      </div>

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
              <Controller
                name={`faqs.${index}.question`}
                control={control}
                rules={{ required: "Question is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter medicine Question"
                  />
                )}
              />
              {errors.faqs?.[index]?.question && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.faqs[index].question.message}
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor={`faqs.${index}.answer`}
                className="block mb-2 text-sm font-medium text-[#4D4D4D]"
              >
                Answer <MandatoryField />
              </label>
              <Controller
                name={`faqs.${index}.answer`}
                control={control}
                rules={{ required: "Answer is required" }}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter package Answer"
                  />
                )}
              />
              {errors.faqs?.[index]?.answer && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.faqs[index].answer.message}
                </p>
              )}
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
          type="button"
          className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-[#181423] bg-[#f5f3f3] hover:bg-[#E9E9E9] focus:outline-none"
        >
          Previous Page
        </button>
        {status == "edit" ? (
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#3B86FF] hover:bg-[#3275e8] focus:outline-none"
          >
            update
          </button>
        ) : (
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1AAA55] hover:bg-[#1AAA55] focus:outline-none"
          >
            Submit
          </button>
        )}
      </div>
      {isOpenSuccess && <Success message={message} />}
    </form>
  );
}
