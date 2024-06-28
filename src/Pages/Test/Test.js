import React from 'react'

function Test() {
    return (
        <>
            <nav className="fixed top-0 z-50 w-full bg-[#3498db] border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
                <div className="px-3 py-3 lg:px-5 lg:pl-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center justify-start rtl:justify-end">
                            <button
                                data-drawer-target="logo-sidebar"
                                data-drawer-toggle="logo-sidebar"
                                aria-controls="logo-sidebar"
                                type="button"
                                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                            >
                                <span className="sr-only">Open sidebar</span>
                                <svg
                                    className="w-6 h-6"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        clipRule="evenodd"
                                        fillRule="evenodd"
                                        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                    />
                                </svg>
                            </button>
                            <a href="https://flowbite.com" className="flex ms-2 md:me-24">

                                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                    AppHo sma
                                </span>
                            </a>
                        </div>
                        <div className="flex items-center">
                            <div className="flex items-center ms-3">
                                <div>
                                    <button
                                        type="button"
                                        className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded="false"
                                        data-dropdown-toggle="dropdown-user"
                                    >
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            className="w-8 h-8 rounded-full"
                                            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                                            alt="user photo"
                                        />
                                    </button>
                                </div>
                                <div
                                    className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                                    id="dropdown-user"
                                >
                                    <div className="px-4 py-3" role="none">
                                        <p
                                            className="text-sm text-gray-900 dark:text-white"
                                            role="none"
                                        >
                                            Neil Sims
                                        </p>
                                        <p
                                            className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                            role="none"
                                        >
                                            neil.sims@flowbite.com
                                        </p>
                                    </div>
                                    <ul className="py-1" role="none">
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Dashboard
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Settings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Earnings
                                            </a>
                                        </li>
                                        <li>
                                            <a
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                                role="menuitem"
                                            >
                                                Sign out
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>



            <aside
                id="logo-sidebar"
                className="fixed top-0 left-0 z-40 w-96 h-screen pt-16 pb-16 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
                aria-label="Sidebar"
            >
                <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a
                                href="#"
                                className="items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <img
                                            className="w-12 h-12 rounded-full mr-4 rounded-full outline outline-1 outline-offset-4 outline-gray-300"
                                            src="https://devserver.delimp.net/uploads/Product/1718361907325-product.jpeg"
                                            alt="Product Image"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                Dutso Ghee - 15 kg
                                            </h3>
                                            <p className="text-gray-500 text-xs">Item Price $276.15</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <span className="font-bold">$276.15</span>
                                        <div className="flex ml-4">
                                            <button className="bg-gray-300 text-gray-700 rounded-l px-3 py-1">
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center border-t border-b border-gray-300"
                                                defaultValue={1}
                                            />
                                            <button className="bg-gray-300 text-gray-700 rounded-r px-3 py-1">
                                                +
                                            </button>
                                        </div>
                                        <button className="ml-4 bg-[#3498db] text-white rounded px-3 py-1">🗑</button>
                                    </div>
                                </div>

                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <img
                                            className="w-12 h-12 rounded-full mr-4 rounded-full outline outline-1 outline-offset-4 outline-gray-300"
                                            src="https://devserver.delimp.net/uploads/Product/1718361907325-product.jpeg"
                                            alt="Product Image"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                Dutso Ghee - 15 kg
                                            </h3>
                                            <p className="text-gray-500 text-xs">Item Price $276.15</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <span className="font-bold">$276.15</span>
                                        <div className="flex ml-4">
                                            <button className="bg-gray-300 text-gray-700 rounded-l px-3 py-1">
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center border-t border-b border-gray-300"
                                                defaultValue={1}
                                            />
                                            <button className="bg-gray-300 text-gray-700 rounded-r px-3 py-1">
                                                +
                                            </button>
                                        </div>
                                        <button className="ml-4 bg-[#3498db] text-white rounded px-3 py-1">🗑</button>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <img
                                            className="w-12 h-12 rounded-full mr-4 rounded-full outline outline-1 outline-offset-4 outline-gray-300"
                                            src="https://devserver.delimp.net/uploads/Product/1718361907325-product.jpeg"
                                            alt="Product Image"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                Dutso Ghee - 15 kg
                                            </h3>
                                            <p className="text-gray-500 text-xs">Item Price $276.15</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <span className="font-bold">$276.15</span>
                                        <div className="flex ml-4">
                                            <button className="bg-gray-300 text-gray-700 rounded-l px-3 py-1">
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center border-t border-b border-gray-300"
                                                defaultValue={1}
                                            />
                                            <button className="bg-gray-300 text-gray-700 rounded-r px-3 py-1">
                                                +
                                            </button>
                                        </div>
                                        <button className="ml-4 bg-[#3498db] text-white rounded px-3 py-1">🗑</button>
                                    </div>
                                </div>
                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <img
                                            className="w-12 h-12 rounded-full mr-4 rounded-full outline outline-1 outline-offset-4 outline-gray-300"
                                            src="https://devserver.delimp.net/uploads/Product/1718361907325-product.jpeg"
                                            alt="Product Image"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                Dutso Ghee - 15 kg
                                            </h3>
                                            <p className="text-gray-500 text-xs">Item Price $276.15</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <span className="font-bold">$276.15</span>
                                        <div className="flex ml-4">
                                            <button className="bg-gray-300 text-gray-700 rounded-l px-3 py-1">
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center border-t border-b border-gray-300"
                                                defaultValue={1}
                                            />
                                            <button className="bg-gray-300 text-gray-700 rounded-r px-3 py-1">
                                                +
                                            </button>
                                        </div>
                                        <button className="ml-4 bg-[#3498db] text-white rounded px-3 py-1">🗑</button>
                                    </div>
                                </div>

                            </a>
                        </li>

                        <li>
                            <a
                                href="#"
                                className="items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 group"
                            >
                                <div className="p-4 bg-white rounded-lg shadow-md">
                                    <div className="flex items-center">
                                        <img
                                            className="w-12 h-12 rounded-full mr-4 rounded-full outline outline-1 outline-offset-4 outline-gray-300"
                                            src="https://devserver.delimp.net/uploads/Product/1718361907325-product.jpeg"
                                            alt="Product Image"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-semibold">
                                                Dutso Ghee - 15 kg
                                            </h3>
                                            <p className="text-gray-500 text-xs">Item Price $276.15</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center">
                                        <span className="font-bold">$276.15</span>
                                        <div className="flex ml-4">
                                            <button className="bg-gray-300 text-gray-700 rounded-l px-3 py-1">
                                                -
                                            </button>
                                            <input
                                                type="number"
                                                className="w-12 text-center border-t border-b border-gray-300"
                                                defaultValue={1}
                                            />
                                            <button className="bg-gray-300 text-gray-700 rounded-r px-3 py-1">
                                                +
                                            </button>
                                        </div>
                                        <button className="ml-4 bg-[#3498db] text-white rounded px-3 py-1">🗑</button>
                                    </div>
                                </div>

                            </a>
                        </li>

                    </ul>
                </div>
            </aside>


            <div className="p-4 sm:ml-96">
                <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
                        <div className="group relative bg-gray-100 rounded-[9px] p-3">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="https://dev-actibookly.pantheonsite.io/wp-content/uploads/2024/06/1.png"
                                    alt="Front of men's Basic Tee in black."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Subs Day
                                        </a>
                                    </h3>
                                    <p className="mt-1 font-medium text-gray-900">40</p>
                                </div>
                                <img
                                    className="group-hover:grayscale cursor-pointer group-hover:brightness-[15] p-2 border h-auto self-end border-solid rounded-md border-gray-300"
                                    src="/static/media/lock.5caf6f12a3990c557832ab6963c7d653.svg"
                                    alt="add-cart"
                                />

                            </div>
                        </div>
                        <div className="group relative bg-gray-100 rounded-[9px] p-3">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="https://dev-actibookly.pantheonsite.io/wp-content/uploads/2024/06/1.png"
                                    alt="Front of men's Basic Tee in white."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Subs Day
                                        </a>
                                    </h3>
                                    <p className="mt-1 font-medium text-gray-900">40</p>
                                </div>
                                <img
                                    className="group-hover:grayscale cursor-pointer group-hover:brightness-[15] p-2 border h-auto self-end border-solid rounded-md border-gray-300"
                                    src="/static/media/lock.5caf6f12a3990c557832ab6963c7d653.svg"
                                    alt="add-cart"
                                />

                            </div>
                        </div>
                        <div className="group relative bg-gray-100 rounded-[9px] p-3">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="https://dev-actibookly.pantheonsite.io/wp-content/uploads/2024/06/1.png"
                                    alt="Front of men's Basic Tee in dark gray."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Subs Day
                                        </a>
                                    </h3>
                                    <p className="mt-1 font-medium text-gray-900">40</p>
                                </div>
                                <img
                                    className="group-hover:grayscale cursor-pointer group-hover:brightness-[15] p-2 border h-auto self-end border-solid rounded-md border-gray-300"
                                    src="/static/media/lock.5caf6f12a3990c557832ab6963c7d653.svg"
                                    alt="add-cart"
                                />

                            </div>
                        </div>
                        <div className="group relative bg-gray-100 rounded-[9px] p-3">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                                <img
                                    src="https://dev-actibookly.pantheonsite.io/wp-content/uploads/2024/06/1.png"
                                    alt="Front of men's Artwork Tee in peach with white and brown dots forming an isometric cube."
                                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                                />
                            </div>
                            <div className="mt-4 flex justify-between">
                                <div>
                                    <h3 className="text-gray-700">
                                        <a href="#">
                                            <span aria-hidden="true" className="absolute inset-0" />
                                            Subs Day
                                        </a>
                                    </h3>
                                    <p className="mt-1 font-medium text-gray-900">40</p>
                                </div>
                                <img
                                    className="group-hover:grayscale cursor-pointer group-hover:brightness-[15] p-2 border h-auto self-end border-solid rounded-md border-gray-300"
                                    src="/static/media/lock.5caf6f12a3990c557832ab6963c7d653.svg"
                                    alt="add-cart"
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <footer className="bg-gray-800 text-white p-4 fixed bottom-0 w-full z-40">
                <div className="container mx-auto">
                    <p className="text-center">© 2024 Your Company. All rights reserved.</p>
                </div>
            </footer>


        </>

    )
}

export default Test
