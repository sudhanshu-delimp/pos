import React from "react";

const Addcustomer = () => {
  return (
    <>
      <div className="addcustomer_container mt-10 p-10 max-w-[60%] m-auto">
        <div className="form_container max-w-[100%] m-auto">
          <form>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px]">
              <input
                type="text"
                placeholder="First Name"
                className="px-5 py-3"
              />
              <input
                type="text"
                placeholder="Last Name"
                className="px-5 py-3"
              />
            </div>
            <input
              type="text"
              placeholder="Address Line 1"
              className="px-5 py-3 mt-3 mb-3"
            />
            <input
              type="text"
              placeholder="Address Line 2"
              className="px-5 py-3"
            />
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px]">
              <select className="px-5 py-3">
                <option>Country</option>
                <option>Usa</option>
                <option>Austrlia</option>
                <option>England</option>
              </select>
              <select className="px-5 py-3">
                <option>State</option>
                <option>Usa</option>
                <option>Austrlia</option>
                <option>England</option>
              </select>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px] mt-3">
              <input type="text" placeholder="Zip" className="px-5 py-3" />
              <input type="text" placeholder="Phone" className="px-5 py-3" />
            </div>
            <input
              type="email"
              placeholder="email"
              className="px-5 py-3 mt-3"
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default Addcustomer;
