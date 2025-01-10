import React, { useEffect, useRef, useState } from "react";
import {
  Plus,
  Search,
  ChevronDown,
  RefreshCw,
  Edit2,
  Trash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  deleteManufacturer,
  deleteSalt,
  getManufacturer,
  getSaltMolecule,
  updateManufacturer,
} from "../../../../api/HealthSyServicesApi";
import DynamicTable from "../../../ui/Table";
import Pagination from "../../../../common/Pagination";
import DeleteModal from "../../../../common/DeleteModal";
import toast from "react-hot-toast";

import { useMastersContext } from "../../../../context/MastersContext";
import { DotsSVG } from "../../../ui/Dots";
function ManufacturerList() {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAddAction } = useMastersContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState();
  const [ActionUser, setActionUser] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [manufacturer, setManufacturer] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [DeleteId, setDeleteId] = useState(null);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const applySort = () => {
    setIsDropdownOpen(false);
    fetchManufacturer();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchManufacturer(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    fetchManufacturer(1, Number(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const ActionDropdown = (id) => {
    setActionUser((prev) => (prev === id ? null : id));
  };
  const createManufacturer = () => {
    setAddAction("Add Manufacturer");
    navigate("manufacturer/add-manufacturer");
  };
  const handleStatus = async (user) => {
    const data = {
      ...user,
      status: !user.status,
    };
    await updateManufacturer(user._id, data);
    setActionUser(null);
    fetchManufacturer(1, itemsPerPage, searchText, selectedSort);
  };

  const fetchManufacturer = async (
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
      };
      const res = await getManufacturer(params);
      setManufacturer(res.data || []);
      setTotalItems(res.meta.total);
      setCurrentPage(res.meta.currentPage);
    } catch (error) {
      console.error("Error fetching salt molecules:", error.message);
      setManufacturer([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    setAddAction("Edit Manufacturer");
    navigate(`manufacturer/edit-manufacturer/${id}`);
  };
  const handleDelete = async (id) => {
    setDeleteId(id);
    setIsDeleteModalOpen(true);
  };
  const confirmDelete = async () => {
    if (DeleteId) {
      try {
        await deleteManufacturer(DeleteId);
        toast.success("Role removed successfully");
        fetchManufacturer(1, itemsPerPage, searchText, selectedSort);
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
    setCurrentPage(1);
    fetchManufacturer(1, itemsPerPage, searchText, selectedSort);
    return () => {
      setManufacturer([]);
    };
  }, [itemsPerPage, searchText]);

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
            className={`flex items-center gap-1 rounded-md p-1 
    ${
      user.status
        ? "text-[#158844] bg-[#E8F7EE]"
        : "text-[#C1A53F] bg-[#FCF5DC]"
    } 
    w-full sm:w-[70%] md:w-[60%] lg:w-[60%] xl:w-[40%]`}
          >
            <DotsSVG active={user.status} />
            <span>{user.status ? "Active" : "Inactive"}</span>
          </div>

          <div className="relative">
            <button
              onClick={() => ActionDropdown(user._id)}
              className="cursor-pointer focus:outline-none"
            >
              <svg
                width="14"
                height="4"
                viewBox="0 0 14 4"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.4874 0.512567C12.804 -0.170848 11.696 -0.170848 11.0126 0.512567C10.3291 1.19598 10.3291 2.30402 11.0126 2.98744C11.696 3.67085 12.804 3.67085 13.4874 2.98744C14.1709 2.30405 14.1709 1.19601 13.4874 0.512567Z"
                  fill="#4D4D4D"
                />
                <path
                  d="M8.23744 0.512567C7.55402 -0.170848 6.44598 -0.170848 5.76257 0.512567C5.07915 1.19598 5.07915 2.30402 5.76257 2.98744C6.44598 3.67085 7.55402 3.67085 8.23744 2.98744C8.92085 2.30405 8.92085 1.19601 8.23744 0.512567Z"
                  fill="#4D4D4D"
                />
                <path
                  d="M2.98744 0.512567C2.30402 -0.170848 1.19598 -0.170848 0.512564 0.512567C-0.170852 1.19598 -0.170852 2.30402 0.512564 2.98744C1.19598 3.67085 2.30402 3.67085 2.98744 2.98744C3.67085 2.30405 3.67085 1.19601 2.98744 0.512567Z"
                  fill="#4D4D4D"
                />
              </svg>
            </button>
            {ActionUser === user._id && (
              <div className="relative left-0 mt-2 bg-white shadow-md rounded-md w-32">
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
    { key: "name", header: "Manufacturer Name" },
    {
      key: "manufacturer_address",
      header: "Address of the Manufacturer",
    },
  ];

  return (
    <div className="w-full h-auto overflow-hidden">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0  py-5 pb-5">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex  gap-2">
            <div className="relative w-full sm:w-32">
              <select
                className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] appearance-none"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
              >
                <option value="10">Show: 10</option>
                <option value="20">Show: 20</option>
                <option value="50">Show: 50</option>
                <option value="100">Show: 100</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>
            <div className="relative w-full sm:w-64">
              <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Search className="text-gray-500 w-5 h-5" />
              </span>
              <input
                type="text"
                className="w-full border border-gray-300 rounded-md py-1.5 px-4 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] focus:border-transparent"
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
                <span>Sort by: </span>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99665 7.84794C9.9396 7.90696 9.87149 7.95416 9.7962 7.98686C9.72091 8.01955 9.63991 8.03709 9.55784 8.03848C9.47577 8.03987 9.39423 8.02508 9.31788 7.99496C9.24152 7.96483 9.17185 7.91996 9.11284 7.86291L7.34374 6.15294V13.7609C7.34374 13.9267 7.27789 14.0857 7.16068 14.2029C7.04347 14.3201 6.8845 14.3859 6.71874 14.3859C6.55298 14.3859 6.39401 14.3201 6.2768 14.2029C6.15959 14.0857 6.09374 13.9267 6.09374 13.7609V6.15294L4.32465 7.86291C4.26597 7.92156 4.19619 7.96794 4.1194 7.99935C4.0426 8.03076 3.96032 8.04656 3.87736 8.04583C3.79439 8.04511 3.7124 8.02787 3.63616 7.99513C3.55993 7.96239 3.49098 7.91479 3.43333 7.85512C3.37568 7.79545 3.33049 7.7249 3.30039 7.64759C3.27029 7.57027 3.25589 7.48773 3.25802 7.40479C3.26015 7.32185 3.27878 7.24016 3.31281 7.16449C3.34684 7.08882 3.3956 7.02069 3.45624 6.96406L6.28437 4.23037C6.2948 4.22025 6.30687 4.21316 6.31784 4.20387L6.32824 4.19528C6.34184 4.18434 6.3544 4.17159 6.36865 4.16194C6.37099 4.16037 6.37368 4.15934 6.37605 4.15778C6.39299 4.14662 6.41099 4.13834 6.42871 4.129C6.44693 4.11944 6.46465 4.10894 6.48352 4.10128C6.50292 4.09403 6.52268 4.08778 6.54271 4.08253C6.55905 4.07775 6.57493 4.07116 6.59155 4.06772L6.59971 4.06666C6.61962 4.06281 6.63968 4.06188 6.65984 4.05997C6.67815 4.05828 6.69621 4.05519 6.71462 4.05506L6.71874 4.05469L6.72262 4.05506C6.7409 4.05522 6.7589 4.05819 6.77712 4.06C6.79724 4.06188 6.8173 4.06281 6.83721 4.06662L6.84599 4.06778C6.86224 4.07116 6.87774 4.07769 6.89371 4.08238C6.91397 4.08761 6.93396 4.09386 6.95359 4.10112C6.9564 4.10228 6.95955 4.10272 6.96234 4.10391C6.97796 4.1105 6.99218 4.12037 7.00727 4.12828C7.02566 4.13709 7.04358 4.14683 7.06096 4.15747C7.06359 4.15919 7.06649 4.16041 7.06909 4.16216C7.08159 4.1705 7.09221 4.18166 7.10405 4.191C7.10962 4.19538 7.11502 4.19991 7.12043 4.2045C7.13109 4.2135 7.14284 4.22041 7.15299 4.23025L9.98124 6.96406C10.0403 7.02108 10.0875 7.08917 10.1203 7.16446C10.153 7.23974 10.1706 7.32073 10.172 7.40281C10.1735 7.48489 10.1587 7.56644 10.1286 7.64282C10.0985 7.7192 10.0537 7.7889 9.99665 7.84794ZM16.5591 12.1552C16.5021 12.0962 16.434 12.049 16.3587 12.0163C16.2834 11.9836 16.2024 11.966 16.1203 11.9647C16.0383 11.9633 15.9567 11.9781 15.8804 12.0082C15.804 12.0383 15.7343 12.0832 15.6753 12.1402L13.9062 13.8502V6.24219C13.9062 6.07643 13.8404 5.91746 13.7232 5.80025C13.606 5.68304 13.447 5.61719 13.2812 5.61719C13.1155 5.61719 12.9565 5.68304 12.8393 5.80025C12.7221 5.91746 12.6562 6.07643 12.6562 6.24219V13.8502L10.8871 12.1402C10.8285 12.0815 10.7587 12.035 10.6819 12.0035C10.6051 11.972 10.5227 11.9562 10.4397 11.9569C10.3567 11.9575 10.2747 11.9748 10.1984 12.0075C10.1221 12.0402 10.0531 12.0879 9.99537 12.1476C9.93768 12.2073 9.89247 12.2779 9.86237 12.3552C9.83227 12.4326 9.81789 12.5152 9.82007 12.5982C9.82224 12.6812 9.84093 12.7629 9.87504 12.8386C9.90915 12.9143 9.95801 12.9825 10.0187 13.0391L12.8469 15.7727C12.858 15.7835 12.8707 15.7912 12.8824 15.8009C12.8911 15.8081 12.8995 15.8156 12.9085 15.8224C12.9184 15.8298 12.9277 15.8382 12.9379 15.845C12.9561 15.8561 12.9749 15.8663 12.9942 15.8754C13.0093 15.8834 13.0235 15.893 13.0394 15.8997L13.046 15.9021C13.068 15.9102 13.0905 15.917 13.1133 15.9226C13.1281 15.9267 13.1421 15.9327 13.1574 15.9358L13.1617 15.9366C13.2406 15.9522 13.3217 15.9522 13.4006 15.9366L13.4049 15.9358C13.4202 15.9327 13.4342 15.9267 13.449 15.9226C13.4718 15.917 13.4943 15.9102 13.5163 15.9021L13.5229 15.8997C13.5388 15.893 13.553 15.8834 13.5681 15.8754C13.5874 15.8663 13.6062 15.8561 13.6244 15.845C13.6346 15.8382 13.6439 15.8298 13.6538 15.8224C13.6628 15.8156 13.6712 15.8081 13.6799 15.8009C13.6916 15.7911 13.7043 15.7834 13.7154 15.7727L16.5437 13.0391C16.6028 12.982 16.65 12.9139 16.6828 12.8387C16.7155 12.7634 16.7331 12.6824 16.7345 12.6003C16.736 12.5182 16.7212 12.4367 16.6911 12.3603C16.661 12.2839 16.6162 12.2142 16.5591 12.1552Z"
                    fill="#4D4D4D"
                  />
                </svg>
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
        </div>
        <button
          onClick={createManufacturer}
          type="button"
          className="sm:absolute sm:top-28 sm:right-7 z-[9999] flex h-10 w-full sm:w-[172px] items-center justify-center border rounded-lg border-btn_bg bg-btn_bg text-[13px] transition-all duration-300 hover:bg-btn_bg"
        >
          <svg
            className="h-5 w-5"
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9.85742 0.25C4.48133 0.25 0.107422 4.62391 0.107422 10C0.107422 15.3761 4.48133 19.75 9.85742 19.75C15.2335 19.75 19.6074 15.3761 19.6074 10C19.6074 4.62391 15.2335 0.25 9.85742 0.25ZM13.6074 10.75H10.6074V13.75C10.6074 13.9489 10.5284 14.1397 10.3878 14.2803C10.2471 14.421 10.0563 14.5 9.85742 14.5C9.65851 14.5 9.46774 14.421 9.32709 14.2803C9.18644 14.1397 9.10742 13.9489 9.10742 13.75V10.75H6.10742C5.90851 10.75 5.71774 10.671 5.57709 10.5303C5.43644 10.3897 5.35742 10.1989 5.35742 10C5.35742 9.80109 5.43644 9.61032 5.57709 9.46967C5.71774 9.32902 5.90851 9.25 6.10742 9.25H9.10742V6.25C9.10742 6.05109 9.18644 5.86032 9.32709 5.71967C9.46774 5.57902 9.65851 5.5 9.85742 5.5C10.0563 5.5 10.2471 5.57902 10.3878 5.71967C10.5284 5.86032 10.6074 6.05109 10.6074 6.25V9.25H13.6074C13.8063 9.25 13.9971 9.32902 14.1378 9.46967C14.2784 9.61032 14.3574 9.80109 14.3574 10C14.3574 10.1989 14.2784 10.3897 14.1378 10.5303C13.9971 10.671 13.8063 10.75 13.6074 10.75Z"
              fill="white"
            />
          </svg>
          <span className="pl-2 font-Mulish text-white transition-all duration-300 group-hover:text-transparent">
            Add Manufacturer
          </span>
        </button>
      </div>

      <DynamicTable
        tableRef={tableRef}
        columns={columns}
        data={manufacturer}
        loading={loading}
      />

      <div className="w-full mt-4 px-3">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
      {isDeleteModalOpen && (
        <DeleteModal
          onClose={() => setIsDeleteModalOpen(false)}
          onDelete={confirmDelete}
        />
      )}
    </div>
  );
}

export default ManufacturerList;
