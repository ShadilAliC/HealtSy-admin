import React, { useEffect, useState } from "react";
import MandatoryField from "../../../common/MandatoryField";
import { Images, Plus } from "lucide-react";
import UploadLoader from "../../ui/UploadLaoder";
import UploadImagePreview from "../../ui/UploadImagePreview";
import VariantForm from "../../ui/RenderVariantForm";
import upload from "../../../assets/svg/upload.svg";
import {
  getManufacturer,
  getProductType,
  getSaltMolecule,
  getUnit,
} from "../../../api/HealthSyServicesApi";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { setMedicineInfo } from "../../../redux/Slices/MedicineSlice";
import { uploadImagesToCloudinary } from "../../../lib/utils";
import { useParams } from "react-router-dom";
function MedicineDetails({ setSelectedTab, medicinesData }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const medicineInfo = useSelector((state) => state.medicine.medicineInfo);
  const [images, setImages] = useState([]);
  const [currentItem, setCurrentItem] = useState(0);
  const [imageCount, setImageCount] = useState();
  const [loading, setLoading] = useState(false);
  const [saltMolecules, setSaltMolecules] = useState([]);
  const [manufacturers, setManufactures] = useState([]);
  const [units, setUnits] = useState([]);
  const [productTypes, setProductType] = useState([]);
  const [formError, setFormError] = useState("");
  const [isReturnable, setIsReturnable] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    upload: true,
    manufacturer: false,
    mrp: false,
    molecule: false,
  });
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ...medicineInfo,
    },
  });
  const handleFileChange = async (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);
    setImageCount(files.length);
    setLoading(true);
    setFormError(null);
    setCurrentItem(0);

    try {
      const uploadedImages = [];
      for (let i = 0; i < files.length; i++) {
        const uploadedImage = await uploadImagesToCloudinary([files[i]]);
        uploadedImages.push(...uploadedImage);
        setCurrentItem((prev) => prev + 1);
      }
      setImages((prevImages) => [...prevImages, ...uploadedImages]);
    } catch (err) {
      console.error("Error in handleFileChange:", err);
      setFormError("Error uploading images. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });
  const handleAddNewVariant = () => {
    append({
      id: fields.length + 1,
      name: "",
      package_description: "",
      mrp: "",
      discount: "",
      quantity: "",
      mrp_per_unit: "",
      unit: null,
      images: [],
    });
  };

  const handleDeleteVariant = (index) => {
    remove(index);
  };
  const nextForm = (data) => {
    if (images.length === 0) {
      setFormError(" No image selected. Please upload an image.");
      return;
    }
    const formattedData = {
      name: data.medicineName,
      package_description: data.packageDescription,
      type: data.medicineType,
      stock: data.stock,
      prescription_type: data.prescription_type,
      status: data.status,
      manufacturer: {
        name: data.manufacturer.label,
        address: data.manufacturer.data.manufacturer_address,
        country: data.manufacturer.data.country_origin,
        customer_care_email: data.manufacturer.data.customer_email,
      },
      pricing: {
        mrp: data.mrp,
        discount: data.discount,
        quantity: data.quantity,
        mrp_per_unit: data.mrp_per_unit,
        unit: data.unit.label,
        return_policy: {
          returnable: data.return_policy,
          open_box: data.open_box,
          return_window: data.returnWindow,
        },
      },
      molecule_details: {
        salt_molecule: data.salt_molecule.label,
        therapeutic_classification: data.therapeutic_classification,
        therapeutic_uses: data.therapeutic_uses,
      },
      variants: data.variants.map((variant) => ({
        name: variant.name,
        package_description: variant.package_description,
        images: variant.images,
        mrp: variant.mrp,
        discount: variant.discount,
        quantity:variant.quantity,
        mrp_per_unit:variant.mrp_per_unit,
        unit:variant.unit,
      })),
      faq: {
        faq_description: medicineInfo?.faq?.faq_description,
        author_details: medicineInfo?.faq?.author_details,
        warning_and_precaution: medicineInfo?.faq?.warning_and_precaution,
        direction_uses: medicineInfo?.faq?.direction_uses,
        side_effect: medicineInfo?.faq?.side_effect,
        storage_disposal: medicineInfo?.faq?.storage_disposal,
        dosage: medicineInfo?.faq?.dosage,
        reference: medicineInfo?.faq?.reference,
        question_answers: medicineInfo?.faq?.question_answers,
      },
      images: images,
    };
    dispatch(setMedicineInfo(formattedData));
    setSelectedTab("faq");
  };

  useEffect(() => {
    if (medicineInfo?.pricing?.return_policy?.returnable == "Returnable") {
      setIsReturnable(true);
    }
    setImages(medicineInfo?.images || []);
    setValue("medicineName", medicineInfo?.name);
    setValue("packageDescription", medicineInfo.package_description);
    setValue("medicineType", medicineInfo.type);
    setValue("manufacturer", {
      value: medicineInfo?.manufacturer?._id,
      label: medicineInfo?.manufacturer?.name,
      data: medicineInfo?.manufacturer,
    });
    setValue("manufacturer_address", medicineInfo?.manufacturer?.address);
    setValue("country_origin", medicineInfo?.manufacturer?.country);
    setValue("customer_email", medicineInfo?.manufacturer?.customer_care_email);
    setValue("mrp", medicineInfo?.pricing?.mrp);
    setValue("discount", medicineInfo?.pricing?.discount);
    setValue("quantity", medicineInfo?.pricing?.quantity);
    setValue("mrp_per_unit", medicineInfo?.pricing?.mrp_per_unit);
    setValue("unit", {
      value: medicineInfo?.pricing?._id,
      label: medicineInfo?.pricing?.unit,
      data: medicineInfo?.pricing,
    });
    setValue(
      "returnWindow",
      medicineInfo?.pricing?.return_policy?.return_window
    );
    setValue("salt_molecule", {
      value: medicineInfo?.molecule_details?._id,
      label: medicineInfo?.molecule_details?.salt_molecule,
      data: medicineInfo?.molecule_details,
    });
    setValue(
      "therapeutic_classification",
      medicineInfo?.molecule_details?.therapeutic_classification
    );
    setValue(
      "therapeutic_uses",
      medicineInfo?.molecule_details?.therapeutic_uses
    );
    if (medicineInfo?.variants && medicineInfo?.variants?.length > 0) {
      setValue("variants", medicineInfo?.variants);
    }
  }, [medicineInfo, id, dispatch, setValue]);

  useEffect(() => {
    try {
      const fetch = async () => {
        const [
          saltMoleculeResponse,
          manufactureResponse,
          unitResponse,
          productTypeResponse,
        ] = await Promise.all([
          getSaltMolecule(),
          getManufacturer(),
          getUnit(),
          getProductType(),
        ]);
        setSaltMolecules(saltMoleculeResponse.data);
        setManufactures(manufactureResponse.data);
        setUnits(unitResponse.data);
        setProductType(productTypeResponse.data);
      };
      fetch();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return (
    <div className="max-w-[90%] ">
      <form
        onSubmit={handleSubmit(nextForm)}
        className="w-full max-w-7xl mx-auto"
      >
        <div className="mb-4 p-3 bg-white">
          {expandedSections.upload && (
            <div className="bg-[#FAFAFA] rounded-b-[20px] p-7 pt-8 text-center text-lg">
              {images && images.length === 0 ? (
                <>
                  <span className="text-[#000000] text-[26px] font-medium">
                    Upload your images
                  </span>
                  <p className="mt-1.5 text-[14px] text-[#797979]">
                    Formats: PNG, JPG Max file size: 2mb
                  </p>
                  <div className="relative flex flex-col bg-[#FFFFFF] justify-center items-center gap-3 p-8 mt-[2.1875rem] rounded-[10px] border-2 border-dashed border-[#A6A6A6] text-[#444] cursor-pointer">
                    {loading ? (
                      <UploadLoader
                        currentItem={currentItem}
                        totalImages={imageCount}
                      />
                    ) : (
                      <>
                        <img src={upload} alt="" />
                        <span className="text-[#444] text-[21px] font-semibold text-center">
                          Drag & Drop your images here
                        </span>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          name="images"
                          id="images"
                          className="hidden"
                          onChange={handleFileChange}
                        />
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            document.getElementById("images").click();
                          }}
                          className="mt-4 bg-[#FAE8EF] text-[#CB1B5B] font-Mulish font-medium px-6 py-2.5 rounded-[10px]"
                        >
                          Click to Browse
                        </button>
                      </>
                    )}
                    {formError && (
                      <p className="text-red-500 text-[14px] mt-2">
                        {formError}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <UploadImagePreview
                    images={images}
                    setImages={setImages}
                    loading={loading}
                  />
                </>
              )}
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
            <div className="col-span-1 md:col-span-2">
              <label
                htmlFor="medicineName"
                className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
              >
                Medicine Name <MandatoryField />
              </label>
              <input
                {...register("medicineName", {
                  required: "Medicine name is required",
                })}
                type="text"
                id="medicineName"
                value={medicinesData?.name}
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter your Pharmacy name"
              />
              {errors.medicineName && (
                <span className="text-red-500">
                  {errors.medicineName.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="packageDescription"
                className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
              >
                Package Description <MandatoryField />
              </label>
              <input
                {...register("packageDescription", {
                  required: "Package description is required",
                })}
                type="text"
                id="packageDescription"
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter Package description"
              />
              {errors.packageDescription && (
                <span className="text-red-500">
                  {errors.packageDescription.message}
                </span>
              )}
            </div>

            <div>
              <label
                htmlFor="medicineType"
                className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
              >
                Medicine Type <MandatoryField />
              </label>
              <input
                {...register("medicineType", {
                  required: "Medicine type is required",
                })}
                type="text"
                id="medicineType"
                className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                placeholder="Enter Medicine type"
              />
              {errors.medicineType && (
                <span className="text-red-500">
                  {errors.medicineType.message}
                </span>
              )}
            </div>
          </div>

          <div className="col-span-1 md:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            <div>
              <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                Stock <MandatoryField />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer">
                  <Controller
                    name="stock"
                    control={control}
                    rules={{ required: "You must select a Stock" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="radio"
                        value="Available"
                        checked={field.value === "Available"}
                        className="hidden peer"
                      />
                    )}
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Available
                  </span>
                </label>

                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/20">
                  <Controller
                    name="stock"
                    control={control}
                    rules={{ required: "You must select a Stock" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="radio"
                        checked={field.value === "Not-Available"}
                        value="Not-Available"
                        className="hidden peer"
                      />
                    )}
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Not Available
                  </span>
                </label>
              </div>

              {errors.stock && (
                <span className="text-red-500">{errors.stock.message}</span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                Prescription Type <MandatoryField />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                  <Controller
                    name="prescription_type"
                    control={control}
                    defaultValue={id ? medicineInfo?.prescription_type : ""}
                    rules={{
                      required: "You must select a Prescription Type",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="radio"
                        value="Rx"
                        checked={field.value === "Rx"}
                        className="hidden peer"
                      />
                    )}
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Rx
                  </span>
                </label>

                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/20">
                  <Controller
                    name="prescription_type"
                    control={control}
                    defaultValue={medicineInfo?.prescription_type}
                    rules={{
                      required: "You must select a Prescription Type",
                    }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="radio"
                        checked={field.value === "Non-Rx"}
                        value="Non-Rx"
                        className="hidden peer"
                      />
                    )}
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Non-Rx
                  </span>
                </label>
              </div>
              {errors.prescription_type && (
                <span className="text-red-500">
                  {errors.prescription_type.message}
                </span>
              )}
            </div>

            <div>
              <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                Medicine Status <MandatoryField />
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={medicineInfo?.status}
                    rules={{ required: "You must select a Medicine Status" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        checked={field.value === "Active"}
                        type="radio"
                        value="Active"
                        className="hidden peer"
                      />
                    )}
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Active
                  </span>
                </label>

                <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-orange-600">
                  <Controller
                    name="status"
                    control={control}
                    defaultValue={medicineInfo?.status}
                    rules={{ required: "You must select a Medicine Status" }}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="radio"
                        checked={id && field.value === "Non-Active"}
                        value="Non-Active"
                        className="hidden peer"
                      />
                    )}
                  />
                  <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                    Non-Active
                  </span>
                </label>
              </div>
              {errors.status && (
                <span className="text-red-500">{errors.status.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div
            className="flex items-center justify-between bg-white p-4 rounded-t-[20px] cursor-pointer"
            onClick={() => toggleSection("manufacturer")}
          >
            <span className="text-[#000000] text-[18px] font-Mulish  font-semibold">
              Manufacturer Details
            </span>
            <span
              className={`transform transition-transform ${
                expandedSections.manufacturer ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {expandedSections.manufacturer && (
            <div className="bg-white rounded-b-[20px] p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="manufacturer"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Select Manufacturer <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="manufacturer"
                    control={control}
                    rules={{ required: "Please select a manufacturer" }}
                    defaultValue={null}
                    render={({ field }) => (
                      <div className="relative">
                        <Select
                          {...field}
                          options={manufacturers.map((manufacturer) => ({
                            value: manufacturer._id,
                            label: manufacturer.name,
                            data: manufacturer,
                          }))}
                          placeholder="Select a Manufacturer"
                          className="w-full"
                          classNames={{
                            control: (state) =>
                              `!min-h-12 !bg-gray-100 !border-transparent hover:!border-primary focus:!border-primary !rounded-lg !shadow-none
                    ${state.isFocused ? "!ring-1 !ring-primary/50" : ""}`,
                            placeholder: () => "!text-gray-500",
                            input: () => "!text-gray-800",
                            option: () => "!text-gray-800",
                            menuList: () => "!bg-white !rounded-lg !shadow-lg",
                          }}
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption);
                            const selectedManufacturer = selectedOption?.data;
                            setValue(
                              "manufacturer_address",
                              selectedManufacturer?.manufacturer_address ||
                                medicineInfo?.manufacturer?.address ||
                                ""
                            );
                            setValue(
                              "country_origin",
                              selectedManufacturer?.country_origin ||
                                medicineInfo?.manufacturer?.country ||
                                ""
                            );
                            setValue(
                              "customer_email",
                              selectedManufacturer?.customer_email ||
                                medicineInfo?.manufacturer
                                  ?.customer_care_email ||
                                ""
                            );
                          }}
                        />
                      </div>
                    )}
                  />
                  {errors.manufacturer && (
                    <span className="text-red-500">
                      {errors.manufacturer.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="manufacturer_address"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Manufacturer Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="manufacturer_address"
                    {...register("manufacturer_address", {
                      required: "Manufacturer address is required",
                    })}
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter Manufacturer Address"
                  />
                  {errors.manufacturer_address && (
                    <span className="text-red-500">
                      {errors.manufacturer_address.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="country_origin"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Country of Origin <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="country_origin"
                    {...register("country_origin", {
                      required: "Country of origin is required",
                    })}
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter Country of Origin"
                  />
                  {errors.country_origin && (
                    <span className="text-red-500">
                      {errors.country_origin.message}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="customer_email"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Customer Care Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="customer_email"
                    {...register("customer_email", {
                      required: "Customer care email is required",
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: "Enter a valid email address",
                      },
                    })}
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter Customer Care Email"
                  />
                  {errors.customer_email && (
                    <span className="text-red-500">
                      {errors.customer_email.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div
            className="flex items-center justify-between bg-white p-4 rounded-t-[20px] cursor-pointer"
            onClick={() => toggleSection("mrp")}
          >
            <span className="text-[#000000] text-[18px] font-Mulish  font-semibold">
              MRP & Other Details
            </span>
            <span
              className={`transform transition-transform ${
                expandedSections.mrp ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {expandedSections.mrp && (
            <div className="bg-white rounded-b-[20px] p-7">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="mrp"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    MRP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mrp"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your MRP"
                    {...register("mrp", { required: "MRP is required" })}
                  />
                  {errors.mrp && (
                    <p className="text-red-500 ">{errors.mrp.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="discount"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Discount (%) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="discount"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter Discount"
                    {...register("discount", {
                      required: "Discount is required",
                      pattern: {
                        value: /^[0-9]+(\.[0-9]+)?$/,
                        message: "Please enter a valid number",
                      },
                    })}
                  />
                  {errors.discount && (
                    <p className="text-red-500 ">{errors.discount.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="quantity"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="quantity"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter Quantity"
                    {...register("quantity", {
                      required: "Quantity is required",
                      pattern: {
                        value: /^[0-9]+$/,
                        message: "Please enter a valid number",
                      },
                    })}
                  />
                  {errors.quantity && (
                    <p className="text-red-500 ">{errors.quantity.message}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="mrp_per_unit"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    MRP Per Unit <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="mrp_per_unit"
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter MRP Per Unit"
                    {...register("mrp_per_unit", {
                      required: "MRP Per Unit is required",
                    })}
                  />
                  {errors.mrp_per_unit && (
                    <p className="text-red-500 ">
                      {errors.mrp_per_unit.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="unit"
                    className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                  >
                    Unit <span className="text-red-500">*</span>
                  </label>
                  <Controller
                    name="unit"
                    control={control}
                    defaultValue={null}
                    rules={{ required: "Please select a Unit" }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        options={units.map((unit) => ({
                          value: unit._id,
                          label: unit.unit,
                        }))}
                        placeholder="Select Unit"
                        className="w-full"
                        classNames={{
                          control: (state) =>
                            `!min-h-12 !bg-gray-100 !border-transparent hover:!border-primary focus:!border-primary !rounded-lg !shadow-none
                  ${state.isFocused ? "!ring-1 !ring-primary/50" : ""}`,
                          placeholder: () => "!text-gray-500",
                          input: () => "!text-gray-800",
                          option: () => "!text-gray-800",
                          menuList: () => "!bg-white !rounded-lg !shadow-lg",
                        }}
                        classNamePrefix="react-select"
                        isClearable
                      />
                    )}
                  />
                  {errors.unit && (
                    <span className="text-red-500">{errors.unit.message}</span>
                  )}
                </div>

                <div>
                  <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                    Returnable <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    {/* Returnable Option */}
                    <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                      <Controller
                        name="return_policy"
                        control={control}
                        defaultValue={
                          medicineInfo?.pricing?.return_policy?.returnable
                        }
                        rules={{ required: "You must select a Returnable" }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="radio"
                              checked={field.value === "Returnable"}
                              value="Returnable"
                              className="hidden peer"
                              onChange={() => {
                                field.onChange("Returnable");
                                setIsReturnable(true);
                              }}
                            />
                            <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                              Returnable
                            </span>
                          </>
                        )}
                      />
                    </label>

                    <label className="flex items-center justify-center w-32 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                      <Controller
                        name="return_policy"
                        control={control}
                        defaultValue={
                          medicineInfo?.pricing?.return_policy?.returnable
                        }
                        rules={{ required: "You must select a Returnable" }}
                        render={({ field }) => (
                          <>
                            <input
                              {...field}
                              type="radio"
                              checked={field.value === "Non-Returnable"}
                              value="Non-Returnable"
                              className="hidden peer"
                              onChange={() => {
                                field.onChange("Non-Returnable");
                                setIsReturnable(false);
                              }}
                            />
                            <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                              Non-Returnable
                            </span>
                          </>
                        )}
                      />
                    </label>
                  </div>
                  {errors.return_policy && (
                    <p className="text-red-500 mt-2">
                      {errors.return_policy.message}
                    </p>
                  )}
                </div>

                {isReturnable && (
                  <div>
                    <label
                      htmlFor="returnWindow"
                      className="block mb-2 text-[14px] font-Mulish text-[#000000]"
                    >
                      Return Window <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="returnWindow"
                      className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                      placeholder="Enter Return Window"
                      {...register("returnWindow", {
                        required:
                          isReturnable ||
                          medicineInfo?.pricing?.return_policy?.returnable ===
                            "Returnable",
                      })}
                    />
                    {errors.returnWindow && (
                      <p className="text-red-500 ">
                        {errors.returnWindow.message}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]">
                    Open Box <span className="text-red-500">*</span>
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center justify-center w-16 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-[#FAE8EF]">
                      <Controller
                        name="open_box"
                        control={control}
                        defaultValue={
                          medicineInfo?.pricing?.return_policy?.open_box
                        }
                        rules={{ required: "You must select a  Open Box" }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="radio"
                            checked={field.value === "Yes"}
                            value="Yes"
                            className="hidden peer"
                          />
                        )}
                      />
                      <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                        Yes
                      </span>
                    </label>

                    <label className="flex items-center justify-center w-16 h-12 border border-gray-300 rounded-lg cursor-pointer peer-checked:border-primary peer-checked:bg-primary/20">
                      <Controller
                        name="open_box"
                        control={control}
                        defaultValue={
                          medicineInfo?.pricing?.return_policy?.open_box
                        }
                        rules={{ required: "You must select a Open Box" }}
                        render={({ field }) => (
                          <input
                            {...field}
                            type="radio"
                            checked={field.value === "No"}
                            value="No"
                            className="hidden peer"
                          />
                        )}
                      />
                      <span className="text-gray-900 peer-checked:text-primary peer-checked:bg-[#FAE8EF] w-full h-full flex items-center justify-center">
                        No
                      </span>
                    </label>
                  </div>
                  {errors.open_box && (
                    <p className="text-red-500  mt-2">
                      {errors.open_box.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4">
          <div
            className="flex items-center justify-between bg-white p-4 rounded-t-[20px] cursor-pointer"
            onClick={() => toggleSection("molecule")}
          >
            <span className="text-[#000000] text-[18px] font-Mulish  font-semibold">
              Molecule & Other Details
            </span>
            <span
              className={`transform transition-transform ${
                expandedSections.molecule ? "rotate-180" : ""
              }`}
            >
              ▼
            </span>
          </div>

          {expandedSections.molecule && (
            <div className="bg-white  rounded-b-[20px] p-7">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div>
                  <label
                    htmlFor="salt_molecule"
                    className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
                  >
                    Salt/Molecule <MandatoryField />
                  </label>
                  <Controller
                    name="salt_molecule"
                    control={control}
                    defaultValue={null}
                    rules={{ required: "Please select a Salt/Molecule" }}
                    render={({ field }) => (
                      <div>
                        <Select
                          {...field}
                          options={saltMolecules.map((salt) => ({
                            value: salt._id,
                            label: salt.name,
                            data: salt,
                          }))}
                          placeholder="Select a Salt/Molecule"
                          className="w-full"
                          classNames={{
                            control: (state) =>
                              `!min-h-12 !bg-gray-100 !border-transparent hover:!border-primary focus:!border-primary !rounded-lg !shadow-none
                    ${state.isFocused ? "!ring-1 !ring-primary/50" : ""}`,
                            placeholder: () => "!text-gray-500",
                            input: () => "!text-gray-800",
                            option: () => "!text-gray-800",
                            menuList: () => "!bg-white !rounded-lg !shadow-lg",
                          }}
                          classNamePrefix="react-select"
                          isClearable
                          onChange={(selectedOption) => {
                            field.onChange(selectedOption);
                            const selectedManufacturer =
                              selectedOption?.data || {};
                            setValue(
                              "therapeutic_classification",
                              selectedManufacturer.therapeutic_classification ||
                                ""
                            );
                          }}
                        />
                        {errors.salt_molecule && (
                          <div className="text-red-500">
                            {errors.salt_molecule.message}
                          </div>
                        )}
                      </div>
                    )}
                  />
                </div>

                <div>
                  <label
                    htmlFor="therapeutic_classification"
                    className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
                  >
                    Therapeutic Classification <MandatoryField />
                  </label>
                  <input
                    type="therapeutic_classification"
                    id="therapeutic_classification1"
                    {...register("therapeutic_classification", {
                      required: "Therapeutic Classification is required",
                    })}
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your Therapeutic Classification"
                  />
                  {errors.therapeutic_classification && (
                    <p className="text-red-500 ">
                      {errors.therapeutic_classification.message}
                    </p>
                  )}
                </div>
                <div className="col-span-1 md:col-span-2">
                  <label
                    htmlFor="therapeutic_uses"
                    className="block mb-2 text-[14px] font-Mulish text-[#4D4D4D]"
                  >
                    Therapeutic Uses <MandatoryField />
                  </label>
                  <input
                    type="text"
                    id="therapeutic_uses"
                    {...register("therapeutic_uses", {
                      required: "Therapeutic Uses is required",
                    })}
                    className="w-full p-3 border border-transparent focus:border-primary focus:ring-1 focus:ring-primary/50 rounded-lg text-gray-800 bg-gray-100 placeholder-gray-500 focus:outline-none"
                    placeholder="Enter your Therapeutic Uses"
                  />
                  {errors.therapeutic_uses && (
                    <p className="text-red-500 ">
                      {errors.therapeutic_uses.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        {fields.map((variant, index) => (
          <VariantForm
            key={variant.id}
            variantId={variant.id}
            units={units}
            onDelete={() => handleDeleteVariant(index)}
            index={index}
            control={control}
            errors={errors}
          />
        ))}

        <div className="mt-6 flex">
          <button
            onClick={handleAddNewVariant}
            type="button"
            className="relative flex h-10 w-full sm:w-[150px] items-center justify-start border rounded-lg border-btn_bg bg-btn_bg text-[13px] transition-all duration-300 hover:bg-btn_bg"
          >
            <span className="flex h-full w-[39px] items-center justify-center rounded-lg bg-btn_bg transition-all duration-300 active:bg-[#2e8644]">
              <Plus className="h-6 w-6 stroke-white stroke-2" />
            </span>
            <span className="flex font-Mulish text-white">
              Add New Variants
            </span>
          </button>
        </div>
        <div className="flex justify-center items-center mt-5 shadow-lg px-">
          <button
            type="submit"
            className="px-8 py-2.5 text-center bg-[#3B86FF] text-white rounded-lg shadow-md hover:bg-[#3275e8] transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default MedicineDetails;
