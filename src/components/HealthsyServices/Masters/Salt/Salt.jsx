import React, { useEffect, useRef, useState } from "react";
import { Plus, Search, ChevronDown, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { deleteSalt, getSaltMolecule } from "../../../../api/HealthSyServicesApi";
import DynamicTable from "../../../ui/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import Pagination from "../../../../common/Pagination";
import DeleteModal from "../../../../common/DeleteModal";
import toast from "react-hot-toast";
import { useMastersContext } from "../../../../context/MastersContext";
import AlphabetFilter from "../../../../common/AlphabetFilter";
function Salt() {
  const tableRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setAddAction } = useMastersContext();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalItems, setTotalItems] = useState();
  const [searchText, setSearchText] = useState("");
  const [salts, setSalts] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [DeleteId,setDeleteId]=useState(null)


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const applySort = () => {
    setIsDropdownOpen(false);
    fetchSalts();
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchSalts(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
    fetchSalts(1, Number(e.target.value));
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const createSalt = () => {
    setAddAction("Add Salt/Molecule");
    navigate("salt-molecule/add-salt-molecule");
  };

  const fetchSalts = async (
    page = currentPage,
    limit = itemsPerPage,
    search = searchText,
    sort = selectedSort,
    letter = selectedLetter
  ) => {
    try {
      setLoading(true);
      const params = {
        page,
        limit,
        search,
        sort: sort === "Newest" ? "desc" : "asc",
        letter,
      };
      const res = await getSaltMolecule(params);
      setSalts(res.data || []);
      setTotalItems(res.meta.total);
      setCurrentPage(res.meta.currentPage);
    } catch (error) {
      console.error("Error fetching salt molecules:", error.message);
      setSalts([]);
      setTotalItems(0);
    } finally {
      setLoading(false);
    }
  };

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter === selectedLetter ? "" : letter);
  };
  const handleEdit = (id) => {
    setAddAction("Edit Salt/Molecule");
    navigate(`salt-molecule/edit-salt-molecule/${id}`);
  };
  const handleDelete=async(id)=>{
    setDeleteId(id)
    setIsDeleteModalOpen(true)
  }
  const confirmDelete = async () => {
    if (DeleteId) {
      try {
        await deleteSalt(DeleteId);
        toast.success("Role removed successfully");
        fetchSalts(1, itemsPerPage, searchText, selectedSort, selectedLetter);
      } catch (error) {
        console.error("Error removing role:", error);
        toast.error("Failed to remove role");
      } finally {
        setIsDeleteModalOpen(false);
        setDeleteId(null);
      }
    }
  };
  const RefreshTable = () => {
    setSelectedLetter("");
    fetchSalts(1, itemsPerPage, searchText, selectedSort, selectedLetter);
  };

  useEffect(() => {
    setCurrentPage(1);
    fetchSalts(1, itemsPerPage, searchText, selectedSort, selectedLetter);
    return () => {
      setSalts([]);
    };
  }, [itemsPerPage, searchText, selectedSort, selectedLetter]);

  const columns = [
    {
      key: "No",
      header: "S.No",
      render: (_, __, index) => (currentPage - 1) * itemsPerPage + index + 1,
    },
    { key: "name", header: "Salt / Molecule Name" },
    { key: "therapeutic_classification", header: "Therapeutic Classification" },
    {
      key: "status",
      header: "Status",
      render: (_, user) => (
        <span
          className={`p-1 rounded-md ${
            user.status === true
              ? "text-[#158844] bg-[#E8F7EE] "
              : "text-[#C1A53F] bg-[#FCF5DC]"
          } font-semibold`}
        >
          {user.status === true ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      key: "action",
      header: "Action",
      render: (_, user) => (
        <div className="flex gap-1">
          <button
            onClick={() => {
              handleEdit(user._id);
            }}
            className="bg-blue-500 text-xs text-white rounded-md p-2 hover:scale-105 transform transition-all ease-in-out duration-300 hover:shadow-md cursor-pointer"
          >
            <FaEdit />
          </button>
          <button
            onClick={() => {handleDelete(user._id)}}
            className="bg-red-500 text-xs hover:scale-105 transform transition-all ease-in-out duration-300 hover:shadow-md cursor-pointer text-white rounded-md p-2"
          >
            <FaTrash />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full h-auto overflow-hidden">
      <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 px-3 py-5 pb-5">
        <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
          <div className="flex  gap-4">
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
                <div className="absolute top-full left-0 z-10 w-40 mt-2 bg-white border border-gray-300 rounded-md shadow-md">
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
              value={searchText}
              onChange={handleSearch}
            />
          </div>

          <div className="relative group">
            <button
              onClick={RefreshTable}
              className="flex items-center justify-center p-2 rounded bg-gray-100 hover:bg-gray-200"
              aria-label="Refresh table"
            >
              <RefreshCw className="w-4 text-primary" />
            </button>
            <span className="absolute top-1/2 left-full transform -translate-y-1/2 ml-2 px-2 py-1 text-xs text-white bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Refresh table
            </span>
          </div>
        </div>

        <button
          onClick={createSalt}
          type="button"
          className="relative flex h-10 w-full sm:w-[150px] items-center justify-between border rounded-lg border-btn_bg bg-btn_bg text-[13px] transition-all duration-300 hover:bg-btn_bg"
        >
          <span className="flex-1 px-4 font-Mulish text-white transition-all duration-300 group-hover:text-transparent">
            Add Salt / Molecule
          </span>
          <span className="absolute right-0 top-0 flex h-full w-[39px] items-center justify-center rounded-lg bg-btn_bg transition-all duration-300 hover:w-full hover:translate-x-0 active:bg-[#2e8644]">
            <Plus className="h-6 w-6 stroke-white stroke-2" />
          </span>
        </button>
      </div>

      <AlphabetFilter
        onLetterSelect={handleLetterSelect}
        selectedLetter={selectedLetter}
      />

      <DynamicTable
        tableRef={tableRef}
        columns={columns}
        data={salts}
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

export default Salt;
