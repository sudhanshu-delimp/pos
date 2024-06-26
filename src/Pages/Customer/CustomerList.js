import React, { useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import CustomerModal from './CustomerModal';

const CustomerList = () => {
    const { setAddCustomer, setCustomerModal } = useContext(AppContext);

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <div>
                    <button
                        type="button"
                        className="bg-[#3498db] text-white px-4 py-2 rounded mr-2"
                        onClick={() => setCustomerModal(false)}
                    >
                        Cancel
                    </button>
                </div>
                <div>
                    <a className=" text-[#000]">Customers</a>
                </div>
                <div>
                    <button
                        onClick={() => setAddCustomer(true)}
                        className="cursor-pointer bg-[#3498db] text-white px-4 py-2 rounded"
                    >
                        Add
                    </button>
                </div>
            </div>
            <div className="table_container">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg tbody_scroll">
                    <div className="pb-4 bg-white dark:bg-gray-900">
                        <label htmlFor="table-search" className="sr-only">
                            Search
                        </label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg
                                    className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                    />
                                </svg>
                            </div>
                            <input
                                type="text"
                                id="table-search"
                                className="block pt-2 pb-2 ps-10 text-sm text-gray-900 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[100%] search_customer"
                                placeholder="Search for items"
                            />
                        </div>
                    </div>
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <tbody>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-[#000]">A customer</td>
                                <td className="px-6 py-4 text-[#000] text-right ">
                                    54154555
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-[#000]">A customer</td>
                                <td className="px-6 py-4 text-[#000] text-right">
                                    54154555
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-[#000]">A customer</td>
                                <td className="px-6 py-4 text-[#000] text-right">
                                    54154555
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-[#000]">A customer</td>
                                <td className="px-6 py-4 text-[#000] text-right">
                                    54154555
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-[#000]">A customer</td>
                                <td className="px-6 py-4 text-[#000] text-right">
                                    54154555
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                <td className="px-6 py-4 text-[#000]">A customer</td>
                                <td className="px-6 py-4 text-[#000] text-right">
                                    54154555
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

export default CustomerList
