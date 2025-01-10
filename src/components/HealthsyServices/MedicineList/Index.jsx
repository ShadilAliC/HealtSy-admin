import React, { useEffect, useRef, useState } from "react";
import {
  Search,
  ChevronDown,
  Edit2,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteMedicine,
  getMedicines,
  updateMedicine,
} from "../../../api/HealthSyServicesApi";
import toast from "react-hot-toast";
import DynamicTable from "../../ui/Table";
import { useMastersContext } from "../../../context/MastersContext";
import DeleteModal from "../../../common/DeleteModal";
import Pagination from "../../../common/Pagination";
import FilterData from "../../../common/FilterData";
import { DotsSVG } from "../../ui/Dots";
import ViewDetails from "./ViewDetails";
import sortsvg from "../../../assets/svg/sort.svg";
import add from "../../../assets/svg/add.svg";
import threedots from "../../../assets/svg/threedots.svg";
import downloadsvg from "../../../assets/svg/download.svg";
import ConfirmationModal from "../../../common/ConfirmationModal";

function Index() {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAddAction } = useMastersContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState();
  const [searchText, setSearchText] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [DeleteId, setDeleteId] = useState(null);
  const [ActionUser, setActionUser] = useState(null);
  const [isOpenConfirmaion, setIsOpenConfirmaion] = useState(false);
  const [isOpenView, setIsOpenView] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const filterDropdown = () => {
    setIsFilterOpen(!isFilterOpen);
  };
  const applySort = () => {
    setIsDropdownOpen(false);
    fetchMedicines();
  };
  const applyfilter = () => {
    setIsFilterOpen(false);
    fetchMedicines();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchMedicines(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    fetchMedicines(1, Number(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const createNewMedicine = () => {
    setAddAction("Order Medicines / Add New Medicine");
    navigate("/healthsy-services/order-medicines/add-new-medicine");
  };

  const ActionDropdown = (id) => {
    setActionUser((prev) => (prev === id ? null : id));
  };
  const handleDownload = () => {
    setIsOpenConfirmaion(true);
  };

  const fetchMedicines = async (
    page = currentPage,
    limit = itemsPerPage,
    search = searchText,
    sort = selectedSort
  ) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        search,
        sort,
        filterData,
      };
      const res = await getMedicines(params);
      setMedicines(res.medicines || []);
      setTotalItems(res.meta.total);
      setCurrentPage(res.meta.currentPage);
    } catch (error) {
      console.error("Error fetching salt molecules:", error.message);
      setMedicines([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const viewDetails = (id) => {
    setIsOpenView(id);
  };

  const handleEdit = (id) => {
    setAddAction("Edit Salt/Molecule");
    navigate(`/healthsy-services/order-medicines/edit-medicine/${id}`);
  };
  const handleDelete = async (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };
  const handleStatus = async (user) => {
    const data = {
      ...user,
      status: !user.status,
    };
    await updateMedicine(user._id, data);
    setActionUser(null);
    fetchMedicines(1, itemsPerPage, searchText, selectedSort);
  };
  const confirmDelete = async () => {
    if (DeleteId) {
      try {
        await deleteMedicine(DeleteId);
        toast.success("Role removed successfully");
        fetchMedicines(1, itemsPerPage, searchText, selectedSort);
      } catch (error) {
        console.error("Error removing role:", error);
        toast.error("Failed to remove role");
      } finally {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
      }
    }
  };

  useEffect(() => {
    setAddAction("");
    setCurrentPage(1);
    fetchMedicines(1, itemsPerPage, searchText, selectedSort);
    return () => {
      setMedicines([]);
    };
  }, [itemsPerPage, searchText, filterData]);

  const columns = [
    {
      key: "No",
      header: "S.No",
      render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1,
    },
    {
      key: "status",
      header: "Status & Actions",
      render: (_, user) => (
        <div className="flex gap-4">
          <div
            className={`w-full sm:w-[70%] md:w-[60%] lg:w-[60%] xl:w-[50%] flex items-center  space-x-2 rounded-md p-1 ${
              user.status == "Active"
                ? "text-[#158844] bg-[#E8F7EE]"
                : "text-[#C1A53F] bg-[#FCF5DC]"
            }`}
          >
            <DotsSVG active={user.status} />
            <span className="">
              {user.status === "Active" ? "Active" : "InActive"}
            </span>
          </div>

          <div className="relative">
            <button
              onClick={() => ActionDropdown(user._id)}
              className="cursor-pointer focus:outline-none"
            >
              <img src={threedots} alt="" />
            </button>
            {ActionUser === user._id && (
              <div className="absolute left-0 mt-2 bg-white shadow-md rounded-md w-32 z-10">
                <ul className="py-1 p-2 space-y-1">
                  <li
                    className="flex items-center gap-2 px-4 py-2 bg-[#EFF8FE] text-[#4E91C2] text-[14px] cursor-pointer"
                    onClick={() => handleEdit(user._id)}
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </li>

                  <li
                    className="flex items-center gap-2 px-4 py-2 bg-[#FDE6E6] text-[#EB0000] text-[14px]  cursor-pointer"
                    onClick={() => handleDelete(user._id)}
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </li>
                  <li
                    className={`flex items-center gap-2 px-4 py-2 text-[14px]  cursor-pointer ${
                      !user.status
                        ? "text-[#158844] bg-[#E8F7EE]"
                        : "text-[#C1A53F] bg-[#FCF5DC]"
                    }`}
                    onClick={() => handleStatus(user)}
                  >
                    <svg
                      width="10"
                      height="10"
                      viewBox="0 0 9 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-4 h-4"
                    >
                      <path
                        d="M4.85742 0.9375C2.61738 0.9375 0.794922 2.75996 0.794922 5C0.794922 7.24004 2.61738 9.0625 4.85742 9.0625C7.09746 9.0625 8.91992 7.24004 8.91992 5C8.91992 2.75996 7.09746 0.9375 4.85742 0.9375ZM6.32832 6.0291C6.35856 6.05783 6.38274 6.09232 6.39944 6.13055C6.41614 6.16877 6.42502 6.20995 6.42555 6.25166C6.42609 6.29336 6.41827 6.33476 6.40255 6.3734C6.38684 6.41203 6.36354 6.44713 6.33405 6.47663C6.30456 6.50612 6.26945 6.52941 6.23082 6.54513C6.19218 6.56084 6.15079 6.56867 6.10908 6.56813C6.06737 6.5676 6.02619 6.55872 5.98797 6.54202C5.94975 6.52532 5.91525 6.50114 5.88652 6.4709L4.85742 5.44199L3.82832 6.4709C3.76924 6.52703 3.69057 6.55786 3.60908 6.55682C3.52759 6.55577 3.44973 6.52294 3.39211 6.46531C3.33448 6.40769 3.30165 6.32983 3.3006 6.24834C3.29956 6.16686 3.33039 6.08818 3.38652 6.0291L4.41543 5L3.38652 3.9709C3.33039 3.91182 3.29956 3.83314 3.3006 3.75166C3.30165 3.67017 3.33448 3.59231 3.39211 3.53469C3.44973 3.47706 3.52759 3.44423 3.60908 3.44318C3.69057 3.44214 3.76924 3.47297 3.82832 3.5291L4.85742 4.55801L5.88652 3.5291C5.94561 3.47297 6.02428 3.44214 6.10577 3.44318C6.18725 3.44423 6.26511 3.47706 6.32274 3.53469C6.38036 3.59231 6.4132 3.67017 6.41424 3.75166C6.41528 3.83314 6.38445 3.91182 6.32832 3.9709L5.29941 5L6.32832 6.0291Z"
                        fill={!user.status ? "#158844" : "#C1A53F"}
                      />
                    </svg>

                    {!user.status ? "Active" : "Inactive"}
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      key: "name",
      header: "Medicine Name",
      render: (_, user) => (
        <span
          onClick={() => viewDetails(user._id)}
          className="text-[16px] font-bold font-Mulish text-[#005EF6] cursor-pointer"
        >
          {user.name || "N/A"}
        </span>
      ),
    },
    {
      key: "images.0.url",
      header: "Image",
      render: (_, user) => (
        <span className="text-md font-bold font-Mulish cursor-pointer">
          {user.images && user.images[0]?.url ? (
            <img
              src={user.images[0].url}
              className="w-12 h-12 object-cover"
              alt={user.name || "Image"}
            />
          ) : (
            "N/A"
          )}
        </span>
      ),
    },
    { key: "type", header: "Type" },
    {
      key: "manufacturer.name",
      header: "Manufacturer Name",
      render: (_, user) => <span>{user.manufacturer?.name || "N/A"}</span>,
    },
    {
      key: "pricing.mrp",
      header: "MRP",
      render: (_, user) => <span>{user.pricing?.mrp || "N/A"}</span>,
    },
  ];

  return (
    <div className="w-full h-auto overflow-hidden mt-8">
      <div className="flex flex-col space-y-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-3">
          <div className="relative w-full sm:w-32">
            <select
              className="w-full h-10 px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] appearance-none"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="10">Show: 10</option>
              <option value="20">Show: 20</option>
              <option value="50">Show: 50</option>
              <option value="100">Show: 100</option>
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>

          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="text-gray-500 w-5 h-5" />
            </span>
            <input
              type="text"
              className="w-full h-10 border border-gray-300 rounded-md py-2 px-4 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] focus:border-transparent"
              placeholder="Search..."
              value={searchText}
              onChange={handleSearch}
            />
          </div>

          <div className="relative w-full sm:w-24">
            <button
              className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CB1B5B]"
              onClick={toggleDropdown}
            >
              <span className="text-wrap">Sort by: </span>
              <img src={sortsvg} alt="" />
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0  z-10 w-full sm:w-[198px] mt-2 bg-[#FFFFFF] border border-gray-300 rounded-xl shadow-md">
                <ul className="p-2">
                  <li
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSort === "Newest"
                        ? "text-[#CB1B5B] font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedSort("Newest")}
                  >
                    <label className="flex items-center w-full cursor-pointer">
                      <input
                        type="radio"
                        name="sortOption"
                        value="Newest"
                        checked={selectedSort === "Newest"}
                        onChange={() => setSelectedSort("Newest")}
                        className="mr-2 w-4 h-4 accent-[#CB1B5B]"
                      />
                      Newest First
                    </label>
                  </li>
                  <li
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSort === "Oldest"
                        ? "text-[#CB1B5B] font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedSort("Oldest")}
                  >
                    <label className="flex items-center w-full cursor-pointer">
                      <input
                        type="radio"
                        name="sortOption"
                        value="Oldest"
                        checked={selectedSort === "Oldest"}
                        onChange={() => setSelectedSort("Oldest")}
                        className="mr-2 w-4 h-4 accent-[#CB1B5B]"
                      />
                      Oldest First
                    </label>
                  </li>
                  <li
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSort === "a-z"
                        ? "text-[#CB1B5B] font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedSort("a-z")}
                  >
                    <label className="flex items-center w-full cursor-pointer">
                      <input
                        type="radio"
                        name="sortOption"
                        value="a-z"
                        checked={selectedSort === "a-z"}
                        onChange={() => setSelectedSort("a-z")}
                        className="mr-2 w-4 h-4 accent-[#CB1B5B]"
                      />
                      Alphabetic A-Z
                    </label>
                  </li>
                  <li
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSort === "z-a"
                        ? "text-[#CB1B5B] font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedSort("z-a")}
                  >
                    <label className="flex items-center w-full cursor-pointer">
                      <input
                        type="radio"
                        name="sortOption"
                        value="z-a"
                        checked={selectedSort === "z-a"}
                        onChange={() => setSelectedSort("z-a")}
                        className="mr-2 w-4 h-4 accent-[#CB1B5B]"
                      />
                      Alphabetic Z-A
                    </label>
                  </li>
                  <li
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSort === "low-high"
                        ? "text-[#CB1B5B] font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedSort("low-high")}
                  >
                    <label className="flex items-center w-full cursor-pointer">
                      <input
                        type="radio"
                        name="sortOption"
                        value="low-high"
                        checked={selectedSort === "low-high"}
                        onChange={() => setSelectedSort("low-high")}
                        className="mr-2 w-4 h-4 accent-[#CB1B5B]"
                      />
                      MRP: Low to High
                    </label>
                  </li>
                  <li
                    className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                      selectedSort === "high-low"
                        ? "text-[#CB1B5B] font-semibold"
                        : ""
                    }`}
                    onClick={() => setSelectedSort("high-low")}
                  >
                    <label className="flex items-center w-full cursor-pointer">
                      <input
                        type="radio"
                        name="sortOption"
                        value="high-low"
                        checked={selectedSort === "high-low"}
                        onChange={() => setSelectedSort("high-low")}
                        className="mr-2 w-4 h-4 accent-[#CB1B5B]"
                      />
                      MRP: High to Low
                    </label>
                  </li>
                </ul>

                <button
                  className="w-full px-3 py-2 text-sm border-t border-gray-300 hover:bg-gray-50 text-[#CB1B5B] font-semibold rounded-b"
                  onClick={applySort}
                >
                  Apply
                </button>
              </div>
            )}
          </div>
        </div>
        <FilterData
          filterDropdown={filterDropdown}
          isFilterOpen={isFilterOpen}
          setFilterData={setFilterData}
          applyfilter={applyfilter}
          filterData={filterData}
        />

        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button
            onClick={handleDownload}
            className="relative flex items-center justify-center gap-2 w-full sm:w-auto h-10 px-6 py-2.5 text-[#333333] bg-[#E8F7EE] rounded-md transition-all duration-250 hover:before:w-full hover:bg-[#E8F7EE] before:absolute before:h-full before:w-0 before:bg-[#469b61] before:-z-10 before:transition-all before:duration-350 before:rounded-md"
          >
            <span className="block text-[#333333] font-Mulish">Download</span>
            <img src={downloadsvg} alt="" />
          </button>

          <button
            onClick={createNewMedicine}
            type="button"
            className="sm:absolute sm:top-28 sm:right-7 sm:z-[9999] flex h-10 w-full sm:w-[172px] items-center justify-center border rounded-lg border-btn_bg bg-btn_bg text-[13px] transition-all duration-300 hover:bg-btn_bg"
          >
            <img src={add} alt="" />
            <span className="pl-2 font-Mulish text-white transition-all duration-300 group-hover:text-transparent">
              Add New Medicine
            </span>
          </button>
        </div>
      </div>

      <DynamicTable
        tableRef={tableRef}
        columns={columns}
        data={medicines}
        loading={loading}
      />
      <div className="w-full p-3 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-shrink-0 px-4 py-2 border font-Mulish border-primary rounded-lg">
          <h1>Total Medicines: {totalItems}</h1>
        </div>
        <div className="w-auto mt-1 sm:mt-0 px-3 flex justify-end">
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {isOpenView !== null && (
        <ViewDetails id={isOpenView} setIsOpenView={setIsOpenView} />
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
        />
      )}
      {isOpenConfirmaion && (
        <ConfirmationModal onClose={() => setIsOpenConfirmaion(false)} />
      )}
    </div>
  );
}

export default Index;
