// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import ReactPaginate from "react-paginate";
// import DataTable from "react-data-table-component";
// import QuotesSubHeader from "./QuotesSubHeader";
// import {
//   GET_ALL_DATA_QUOTES,
//   GET_FILTERS_SaleOrder,
//   GET_ALL_DATA_FILTER_QUOTES,
//   RESET_STATE_SaleOrder,
// } from "../../../Redux/actions/quotes";
// import { useNavigate } from "react-router-dom";
// import { AlignJustify } from "react-feather";
// import EnumFilter from "../../../Components/enumFilter";
// import { SearchIcon } from "../../../assets/svgIcons";
// import { styled } from "styled-components";
// import moment from "moment";
// import {
//   ChevronLeft,
//   ChevronRight,
// } from "feather-icons-react/build/IconComponents";
// import PageLoader from "../../../Components/pageLoader";

// const TableMain = styled.div`
//   .epRaQS {
//     ${({ data }) =>
//       data?.length === 0 &&
//       `height: 100%;
// display: flex;
// align-items: center;`}
//   }
// `;

// const getdefaultFilter = () => {
//   return JSON.parse(localStorage.getItem("defaultFilter-quotes"));
// };

// const QuotesList = (props) => {
//   const [showRows, setShowRows] = useState(
//     localStorage.getItem("quotes-pagelimit") || 10
//   );
//   const [search, setSearch] = useState("");
//   const [selectedFilter, setselectedFilter] = useState(
//     getdefaultFilter() || []
//   );
//   const [currentPage, setCurrentPage] = useState(1);

//   // setp 1
//   const data = useSelector((state) => state.Quotes.List);
//   const pagination = useSelector((state) => state.Quotes.pagination);
//   let tableHeader = useSelector((state) => state.Quotes.tableHeader) || [];
//   const filters = useSelector((state) => state.Quotes.Filters);
//   const sideBar = useSelector((state) => state.sideBarReducer.sideBar);
//   const loading = useSelector((state) => state.user.loading);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     let view = localStorage.getItem("quotes-module-view");
//     if (view === "canvas") {
//       navigate("/crm/quotes/quotes-canvas-list");
//     } else {
//       navigate("/crm/quotes");
//     }
//   }, []);

//   // setp 2 for filter
//   const hideFilterList = [
//     "_id",
//     "organizationId",
//     "salesOrderOwnerId",
//     "organizationId",
//     "connectionId",
//     "ModifiedBy",
//     "id",
//     "QuotesOwnerId",
//   ];

//   // setp 2
//   useEffect(() => {
//     tableHeader = [
//       "Subject",
//       "CustomerNo",
//       "QuoteName",
//       "Carrier",
//       "SalesCommission",
//       "AccountName",
//     ];
//     dispatch(RESET_STATE_SaleOrder());
//     dispatch(GET_FILTERS_SaleOrder());
//     dispatch(
//       GET_ALL_DATA_FILTER_QUOTES({
//         offset: 1,
//         limit: 10,
//       })
//     );
//   }, [dispatch]);

//   const filterData = () => {
//     let temparr = [];
//     filters.forEach((element) => {
//       let tempobj = {
//         name: element,
//         value: "",
//         apply: false,
//       };
//       temparr.push(tempobj);
//     });
//     setselectedFilter(temparr);
//   };

//   useEffect(() => {
//     if (selectedFilter?.length === 0) {
//       filterData();
//     }
//   }, [filters]);

//   const handlePagination = (page) => {
//     // check if selected checkbox is true then apply filter
//     if (showFilter()) {
//       applyFilter(page.selected + 1, showRows);
//     } else {
//       dispatch(GET_ALL_DATA_QUOTES(page.selected + 1, showRows));
//       setCurrentPage(page.selected + 1);
//     }
//   };

//   const setCondition = (name, value) => {
//     let afterAddEnum = selectedFilter?.map((el) => {
//       if (el?.name === name) {
//         el["filter"] = value;
//       }
//       return el;
//     });
//     setselectedFilter(afterAddEnum);
//   };

//   // const handleselectedFilter = (data) => {
//   //   var temp = [...selectedFilter];
//   //   temp?.forEach((element) => {
//   //     if (element.name === data.name) {
//   //       element.value = data.value;
//   //       element.apply = data.apply;
//   //     }
//   //   });
//   //   setselectedFilter(temp);
//   // };
//   const handleselectedFilter = (data) => {
//     var temp = [...selectedFilter];
//     let getValue = temp.filter((item, index) => item.apply == true);
//     if (getValue.length > 0) {
//       temp?.forEach((element) => {
//         if (element.name === data.name) {
//           element.value = data.value;
//           element.apply = data.apply;
//           element.filter = data?.filter;
//         }
//       });
//       console.log(temp);
//       setselectedFilter(temp);
//     } else {
//       ClearFilter();
//     }
//   };
//   const showFilter = () => {
//     let show = false;
//     var temp = [...selectedFilter];
//     temp?.forEach((element) => {
//       if (element.apply === true) {
//         show = true;
//       }
//     });
//     return show;
//   };

//   const applyFilter = (offset = 1, limit = showRows) => {
//     // let payload = {
//     //   offset,
//     //   limit,

//     // };
//     // let search = [];
//     // // var temp = [...selectedFilter];
//     // for (let el of selectedFilter) {
//     //   if (el?.apply) {
//     //     search.push({
//     //       field: el?.name,
//     //       data: el?.value,
//     //       filter: "IS",
//     //     });
//     //   }
//     // }
//     // if (search.length > 0) {
//     //   payload["search"] = search;
//     // }

//     let payload = {
//       offset,
//       limit,
//       buttonType: "All",
//     };
//     let search = [];
//     // var temp = [...selectedFilter];
//     for (let el of selectedFilter) {
//       console.log(el, "--->>>el console");
//       if (el?.apply) {
//         if (el?.name === "Owner") {
//           search.push({
//             field: `${el?.name}`,
//             data: el?.value,
//             filter: el?.filter,
//             type: el?.type,
//           });
//         } else {
//           search.push({
//             field: el?.name,
//             data: el?.value,
//             filter: el?.filter ? el?.filter : "IS",
//             type: el?.type ? el?.type : "text",
//           });
//         }
//       }
//     }
//     if (search.length > 0) {
//       payload["search"] = search;
//     }
//     // console.log("payloadpayload", payload, "==>", selectedFilter);
//     // dispatch(GET_ALL_DATA_FILTER(api.getApi, payload));

//     dispatch(GET_ALL_DATA_FILTER_QUOTES(payload));
//     setShowRows(10);
//   };

//   useEffect(() => {
//     if (selectedFilter?.length > 0) {
//       const debounceTimer = setTimeout(() => {
//         localStorage.setItem(
//           "defaultFilter-quotes",
//           JSON.stringify(selectedFilter)
//         );
//         // applyFilter(currentPage, showRows)
//       }, 2000);

//       return () => {
//         clearTimeout(debounceTimer);
//       };
//     }
//   }, [selectedFilter]);

//   const ClearFilter = () => {
//     setShowRows(10);
//     let payload = {
//       offset: currentPage,
//       limit: showRows,
//     };
//     dispatch(GET_ALL_DATA_FILTER_QUOTES(payload));
//     let temparr = [];
//     filters.forEach((element) => {
//       let tempobj = {
//         name: element,
//         value: "",
//         apply: false,
//       };
//       temparr.push(tempobj);
//     });
//     setselectedFilter(temparr);
//   };

//   const getTitle = (value) => {
//     let titleis = value
//       ?.replace(/([A-Z])/g, " $1")
//       ?.replace(/^./, function (str) {
//         return str.toUpperCase();
//       });
//     return titleis.replace(/_/g, "");
//   };

//   const CustomPagination = () => {
//     const count = Number(Math.ceil(pagination?.total / showRows));

//     return (
//       <ReactPaginate
//         previousLabel={<ChevronLeft />}
//         nextLabel={<ChevronRight />}
//         pageCount={count || 1}
//         activeClassName="active"
//         forcePage={currentPage !== 0 ? currentPage - 1 : 0}
//         onPageChange={(page) => handlePagination(page)}
//         containerClassName={
//           "pagination react-paginate text-sm gap-2 flex justify-end my-2"
//         }
//       />
//     );
//   };
//   const handleShowRows = (value) => {
//     setShowRows(value);
//     localStorage.setItem("quotes-pagelimit", value);
//     dispatch(GET_ALL_DATA_QUOTES(1, value));
//   };

//   const calldetail = (_id) => {
//     navigate("/crm/quotes-details/" + _id);
//     let tempArry = [];

//     if (tableHeader?.length === 0) {
//       tableHeader = filters
//         ?.slice(0, 5)
//         ?.filter((item) => !hideFilterList?.includes(item));
//     }
//     tableHeader?.forEach((element) => {
//       let temp = {};
//       temp.title = getTitle(element);
//       temp.sortId = element;
//       temp = {
//         name: getTitle(element),
//         selector: { element },
//         sortable: false,
//         minWidth: "200px",
//         cell: (row) => (
//           <div
//             className="flex items-center"
//             onClick={() => {
//               if (element === "Phone") {
//                 //phone(row[element]);
//               }
//             }}
//           >
//             <div className="flex flex-col">
//               <span className="font-bold">{row[element]}</span>
//             </div>
//           </div>
//         ),
//       };

//       tempArry.push(temp);
//     });
//     return [
//       ...tempArry,
//       {
//         name: "Action",
//         selector: "action",
//         sortable: true,
//         minWidth: "200px",
//         cell: (row) => (
//           <div className="flex items-center">
//             <div className="flex flex-col">
//               <span
//                 onClick={() => {
//                   calldetail(row._id);
//                 }}
//                 className="font-bold"
//               >
//                 View
//               </span>
//             </div>
//           </div>
//         ),
//       },
//     ];
//   };
//   const renderTabel = () => {
//     let tempArry = [];

//     if (tableHeader?.length === 0) {
//       tableHeader = filters
//         ?.slice(0, 5)
//         ?.filter((item) => !hideFilterList?.includes(item));
//     }
//     tableHeader?.forEach((element) => {
//       let temp = {};
//       temp.title = getTitle(element);
//       temp.sortId = element;
//       temp = {
//         name: getTitle(element),
//         selector: (row) => {
//           if (element === "createdTime" || element === "updatedTime") {
//             return moment(row[element]).format("DD-MM-YYYY HH:mm:ss");
//           }
//           return row[element];
//         },
//         sortable: true,
//         minWidth: "200px",
//         header: <AlignJustify />,
//         cell: (row) => (
//           <div
//             className="flex items-center"
//             onClick={() => {
//               if (element === "Phone") {
//                 //phone(row[element]);
//               }
//             }}
//           >
//             <div className="flex flex-col" onClick={() => calldetail(row._id)}>
//               <span className="">{row[element]}</span>
//             </div>
//           </div>
//         ),
//       };

//       tempArry.push(temp);
//     });
//     return [
//       ...tempArry,
//       {
//         name: "Action",
//         selector: "action",
//         sortable: true,
//         minWidth: "200px",
//         cell: (row) => (
//           <div className="flex items-center">
//             <div className="flex flex-col">
//               <span
//                 onClick={() => {
//                   calldetail(row._id);
//                 }}
//                 className="font-semibold text-[#142D6C]"
//               >
//                 View
//               </span>
//             </div>
//           </div>
//         ),
//       },
//     ];
//   };
//   if (loading) {
//     return <PageLoader title="Loading" />;
//   }
//   return (
//     <>
//       <QuotesSubHeader moduleName="quotes" />
//       <div className="flex gap-3 items-center px-3 flex-col w-full">
//         <div className="w-full">
//           <div className="flex justify-between items-center my-4">
//             <div className="text-sm font-medium text-[#18181B]">
//               Total Records{" "}
//               <span className="text-sm font-semibold text-[#18181B]">
//                 {pagination?.total}
//               </span>
//             </div>
//             <div className="w-6/12 flex justify-end items-center gap-4">
//               <div className="border border-[#E4E4E7] rounded-2xl px-3 bg-white">
//                 <select
//                   value={showRows}
//                   className="focus:outline-none pe-2 py-3 text-sm font-medium text-[#18181B]"
//                   onChange={(e) => handleShowRows(e.target.value)}
//                 >
//                   <option className="text-sm font-medium" value="10">
//                     10 Records Per Page
//                   </option>
//                   <option className="text-sm font-medium" value="20">
//                     20 Records Per Page
//                   </option>
//                   <option className="text-sm font-medium" value="50">
//                     50 Records Per Page
//                   </option>
//                   <option className="text-sm font-medium" value="100">
//                     100 Records Per Page
//                   </option>
//                 </select>
//               </div>
//               {CustomPagination()}
//             </div>
//           </div>
//           <div className="flex justify-start items-start w-full  gap-5 overflow-y-auto">
//             {sideBar && (
//               <div className="pl-1 pr-1 py-8 bg-white rounded-xl h-full col-span-3 xl:col-span-2 w-[270px] min-w-[270px] ">
//                 <div>
//                   <div className="cardbodyMain px-3">
//                     <div className="cardbody">
//                       <div className="text-[#142D6C] font-medium mb-2">
//                         Filter by
//                       </div>
//                       <div className="">
//                         <div className="absolute left-3 top-3">
//                           <SearchIcon className="w-5 h-5" />
//                         </div>
//                         <input
//                           type="search"
//                           className="border border-[#E6E6EB] mb-6 rounded-xl px-4 w-full py-2 focus:outline-none"
//                           placeholder="Search"
//                           value={search}
//                           onChange={(e) => {
//                             // make first letter capital
//                             let result = e.target.value.replace(
//                               /(^\w{1})|(\s+\w{1})/g,
//                               (letter) => letter.toUpperCase()
//                             );
//                             setSearch(result);
//                           }}
//                         />
//                       </div>
//                       <div
//                         className={`overflow-y-auto ${
//                           showFilter()
//                             ? "h-[calc(100vh-549px)]"
//                             : "h-[calc(100vh-495px)]"
//                         } -mr-4 `}
//                       >
//                         {selectedFilter &&
//                           selectedFilter
//                             ?.filter(
//                               (filter) => !hideFilterList.includes(filter.name)
//                             )
//                             ?.filter((filter) => filter.name.includes(search))
//                             ?.map((filter, index) => {
//                               return (
//                                 <div key={filter?.name}>
//                                   <div className="hover:bg-gray-50 flex gap-2 items-center">
//                                     <div>
//                                       <input
//                                         type="checkbox"
//                                         className="mr-4"
//                                         value={filter.apply}
//                                         checked={filter.apply}
//                                         id={filter.name}
//                                         onChange={(e) => {
//                                           filter.apply = e.target.checked;
//                                           handleselectedFilter(filter);
//                                         }}
//                                       />
//                                       <label htmlFor={filter.name}>
//                                         {getTitle(filter.name)}
//                                       </label>
//                                     </div>
//                                   </div>
//                                   {filter.apply && (
//                                     // add the text field and button on that click on that button it will filter the data
//                                     <div className="pt-2 flex justify-start items-center">
//                                       <input
//                                         type="text"
//                                         placeholder="Enter text"
//                                         className="border p-1 rounded-md focus:outline-none w-full"
//                                         value={filter.value}
//                                         onChange={(e) => {
//                                           filter.value = e.target.value;
//                                           handleselectedFilter(filter);
//                                         }}
//                                       />
//                                       <EnumFilter
//                                         filter={filter?.filter}
//                                         setCondition={setCondition}
//                                         name={filter?.name}
//                                       />
//                                     </div>
//                                   )}
//                                 </div>
//                               );
//                             })}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 {showFilter() && (
//                   <div className="flex gap-3 mt-3">
//                     <button
//                       onClick={() => {
//                         applyFilter();
//                       }}
//                       className="w-full bg-primary rounded-2xl text-white p-2"
//                     >
//                       Apply Filter
//                     </button>
//                     <button
//                       onClick={() => {
//                         ClearFilter();
//                       }}
//                       class
//                       className="w-full bg-white rounded-2xl text-primary p-2 border border-primary"
//                     >
//                       Clear
//                     </button>
//                   </div>
//                 )}
//               </div>
//             )}
//             <TableMain
//               // style={{ width: "85%" }}
//               className={`bg-white cstm-table col-span-9 xl:col-span-10 ${
//                 sideBar ? "w-[calc(100%-295px)]" : "w-full"
//               } rounded-xl flex flex-col leads-table h-full`}
//               data={data || []}
//             >
//               <DataTable
//                 noHeader={false}
//                 pagination={false}
//                 subHeader={false}
//                 responsive
//                 sortable={true}
//                 selectableRows
//                 onRowClicked={(row) => {
//                   calldetail(row._id);
//                 }}
//                 noDataComponent={
//                   <div className="text-center">
//                     <h5 className="mt-2">Sorry! No Results matching your search.</h5>
//                     <p className="text-muted mb-0">
//                       
//                      
//                     </p>
//                   </div>
//                 }
//                 id="_id"
//                 columns={renderTabel()}
//                 sortIcon={
//                   <>
//                     <svg
//                       width="10"
//                       height="11"
//                       viewBox="0 0 10 11"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M8.845 9.36719H1.625"
//                         stroke="#6A6A6D"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M8.845 5.17969H1.625"
//                         stroke="#6A6A6D"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                       <path
//                         d="M8.62866 1H1.625"
//                         stroke="#6A6A6D"
//                         strokeWidth="1.5"
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                       />
//                     </svg>
//                   </>
//                 }
//                 className="react-dataTable dataTables_wrapper"
//                 // paginationComponent={}
//                 data={data || []}
//               />
//             </TableMain>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };
// export default QuotesList;

import React from "react";
//import CallSubHeader from "../quotes/QuotesSubHeader";
import TableList from "../../../Components/table";
// import TableList from "../../Components/table";
import { useSelector } from "react-redux";
// import CallSubHeader from "./CallSubHeader";
// import CallReminder from './reminder'
import QuotesSubHeader from "./QuotesSubHeader";

function QuoteList() {
  const form = useSelector((state) => state.user.form);

  return (
    <>
      <QuotesSubHeader form={form?.sections} />
      <div className="flex gap-3 px-2 items-center  flex-col w-full">
        <TableList key="quote" moduleName="Quotes" />
      </div>
    </>
  );
}

export default QuoteList;
