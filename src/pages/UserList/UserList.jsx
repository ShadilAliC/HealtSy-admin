import React, { useEffect, useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { FaEye, FaEdit, FaTrash } from "react-icons/fa";
// import * as XLSX from "xlsx";
import DynamicTable from "../../components/ui/Table";
import ViewData from "../../components/ui/ViewData";
import { getUserDetail, getUsers } from "../../api/AuthApi";
import Pagination from "../../common/Pagination";

function UserList() {
  const tableRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState();
  const [searchText, setSearchText] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const applySort = () => {
    setIsDropdownOpen(false);
    console.log("Applied sort:", selectedSort);
    fetchUsers();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    fetchUsers(1, Number(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };
  const handleDownload = () => {
    if (users.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(
        users.map((user) => ({
          "First Name": user.firstName,
          "Last Name": user.lastName,
          "Pharmacy Name": user.pharmacyName,
          Email: user.email,
          Phone: user.phone,
          "Pharmacy Business Type": user.pharmacyBusinessType,
          "Company Name": user.companyName,
          "Pharmacy GST Number": user.pharmacyGstNumber,
          "Drug License Number": user.drugLicenseNumber,
          "FSSAI Number": user.fssaiNumber,
          "Pharmacist License Number": user.pharmacistLicenseNumber,
          State: user.state,
          City: user.city,
          "Pharmacy Address": user.pharmacyAddress,
          Pincode: user.pincode,
          "Medicine Discount": user.medicineDiscount,
          "OTC Discount": user.otcDiscount,
          "Pharmacy Size": user.pharmacySize,
          "Inventory Value": user.inventoryValue,
          "Monthly Turnover": user.monthlyTurnover,
          "Pharmacists Count": user.pharmacistsCount,
          "Has Delivery Staff": user.hasDeliveryStaff,
          "Has POC": user.hasPoc,
          "Is Part Of Platform": user.isPartOfPlatform,
          "Wholesale License": user.wholesaleLicense,
          "Billing Software": user.billingSoftware,
        }))
      );
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
      XLSX.writeFile(workbook, "user_info.xlsx");
    }
  };

  const fetchUsers = async () => {
    const page = currentPage;
    const limit = itemsPerPage;
    const search = searchText;
    const sort = selectedSort === "Newest" ? "desc" : "asc";
    const letter = selectedLetter;
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        search,
        sort: sort === "Newest" ? "desc" : "asc",
        letter,
      };
      const response = await getUsers(params);
      setUsers(response.data);
      setTotalItems(response.meta.total);
      setCurrentPage(response.meta.currentPage);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleView = async (userId) => {
    const userData = await getUserDetail(userId);
    setSelectedUser(userData.data);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const columns = [
    { key: "no", header: "No", render: (_, __, index) => index + 1 },
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "pharmacyName", header: "Pharmacy Name" },
    { key: "email", header: "Email" },
    { key: "phone", header: "Mobile" },
    {
      key: "action",
      header: "Action",
      render: (_, user) => (
        <div className="flex gap-1">
          <button
            onClick={() => handleView(user._id)}
            className="bg-blue-500 text-xs hover:scale-105 transform transition-all ease-in-out duration-300 hover:shadow-md cursor-pointer text-white rounded-md p-2"
          >
            <FaEye />
          </button>
          <button
            onClick={() => {}}
            className="bg-green-500 text-xs text-white rounded-md p-2 hover:scale-105 transform transition-all ease-in-out duration-300 hover:shadow-md cursor-pointer"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {}}
            className="bg-red-500 text-xs hover:scale-105 transform transition-all ease-in-out duration-300 hover:shadow-md cursor-pointer text-white rounded-md p-2"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-4 pt-3">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 sm:space-x-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex  gap-4">
            <div className="relative w-[50%] sm:w-32">
              <select
                className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] appearance-none"
                defaultValue="10"
              >
                <option value="10">Show: 10</option>
                <option value="20">Show: 20</option>
                <option value="50">Show: 50</option>
                <option value="100">Show: 100</option>
              </select>
              <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-500 pointer-events-none" />
            </div>

            <div className="relative w-[50%] sm:w-40">
              <button
                className="w-full flex items-center justify-between px-3 py-2 text-sm bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CB1B5B]"
                onClick={toggleDropdown}
              >
                <span>Sort by: {selectedSort}</span>
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {isDropdownOpen && (
                <div className="absolute top-full left-0 z-10 w-full mt-2 bg-white border border-gray-300 rounded-md shadow-md">
                  <ul className="py-1">
                    <li
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        selectedSort === "Newest"
                          ? "text-primary font-semibold"
                          : ""
                      }`}
                      onClick={() => setSelectedSort("Newest")}
                    >
                      Newest
                    </li>
                    <li
                      className={`px-3 py-2 cursor-pointer hover:bg-gray-100 ${
                        selectedSort === "Oldest"
                          ? "text-primary font-semibold"
                          : ""
                      }`}
                      onClick={() => setSelectedSort("Oldest")}
                    >
                      Oldest
                    </li>
                  </ul>
                  <button
                    className="w-full px-3 py-2 text-sm border-t-2 hover:scale-105 text-primary font-semibold rounded-b hover:bg-opacity-90"
                    onClick={applySort}
                  >
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="relative w-full sm:w-64">
            <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search className="text-gray-500 w-5 h-5" />
            </span>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md py-2 px-4 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-[#CB1B5B] focus:border-transparent"
              placeholder="Search..."
            />
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="relative flex items-center justify-center gap-2 w-full sm:w-auto h-10 px-6 py-2 text-white bg-[#307750] rounded-md shadow-lg transition-all duration-250 hover:before:w-full hover:bg-[#469b61] before:absolute before:h-full before:w-0 before:bg-[#469b61] before:-z-10 before:transition-all before:duration-350 before:rounded-md"
        >
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 50 50"
            className="shrink-0"
          >
            <path d="M28.8125 .03125L.8125 5.34375C.339844 5.433594 0 5.863281 0 6.34375L0 43.65625C0 44.136719 .339844 44.566406 .8125 44.65625L28.8125 49.96875C28.875 49.980469 28.9375 50 29 50C29.230469 50 29.445313 49.929688 29.625 49.78125C29.855469 49.589844 30 49.296875 30 49L30 1C30 .703125 29.855469 .410156 29.625 .21875C29.394531 .0273438 29.105469 -.0234375 28.8125 .03125ZM32 6L32 13L34 13L34 15L32 15L32 20L34 20L34 22L32 22L32 27L34 27L34 29L32 29L32 35L34 35L34 37L32 37L32 44L47 44C48.101563 44 49 43.101563 49 42L49 8C49 6.898438 48.101563 6 47 6ZM36 13L44 13L44 15L36 15ZM6.6875 15.6875L11.8125 15.6875L14.5 21.28125C14.710938 21.722656 14.898438 22.265625 15.0625 22.875L15.09375 22.875C15.199219 22.511719 15.402344 21.941406 15.6875 21.21875L18.65625 15.6875L23.34375 15.6875L17.75 24.9375L23.5 34.375L18.53125 34.375L15.28125 28.28125C15.160156 28.054688 15.035156 27.636719 14.90625 27.03125L14.875 27.03125C14.8125 27.316406 14.664063 27.761719 14.4375 28.34375L11.1875 34.375L6.1875 34.375L12.15625 25.03125ZM36 20L44 20L44 22L36 22ZM36 27L44 27L44 29L36 29ZM36 35L44 35L44 37L36 37Z" />
          </svg>
          <span className="block sm:hidden  lg:block">Export to Excel</span>
        </button>
      </div>

      <div className="min-h-[400px] mt-2">
        <DynamicTable
          tableRef={tableRef}
          columns={columns}
          data={users}
          loading={loading}
        />
      </div>
      
      <div className="w-full mt-4 px-3">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={totalItems}
          onPageChange={handlePageChange}
        />
      </div>
      <ViewData
        isModalOpen={isModalOpen}
        selectedUser={selectedUser}
        closeModal={closeModal}
      />
    </div>
  );
}

export default UserList;
