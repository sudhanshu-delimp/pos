import React, { useState, useRef, useContext } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { geocodeByAddress, getLatLng } from 'react-google-places-autocomplete';
import { AppContext } from "../../context/AppContext";


const Addcustomer = () => {
  const [isShippingAddress, setShowShippingAddress] = useState(false)
  const [billingAddress, setBillingAddress] = useState("")
  const [shippingAddress, setShippingAddress] = useState("")
  const { addCustomer, setAddCustomer } = useContext(AppContext);

  const [user, setUser] = useState({
    email: "",
    first_name: "",
    last_name: "",
    username: "",
    phone: ""
  })

  const [billing, setBilling] = useState(
    {
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
      email: "",
      phone: ""
    },
  )

  const [shipping, setShipping] = useState({
    first_name: "",
    last_name: "",
    company: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
  }
  )

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleUserChange = (e) => {
    const { name, value } = e.target;
    setUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleShippingChange = (e) => {
    const { name, value } = e.target;
    setShipping(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };


  const selectBillingAddress = (address) => {
    console.log("value", address)
    setBillingAddress(address)
    const formatedAddress = address?.value?.terms
    const countryName = formatedAddress?.pop()?.value
    const stateName = formatedAddress?.pop()?.value
    setBilling(prevUser => ({
      ...prevUser,
      country: countryName,
      state: stateName
    }));
  }


  const selectShippingAddress = (address) => {
    setShippingAddress(address)
    const formatedAddress = address?.value?.terms
    const countryName = formatedAddress?.pop()?.value
    const stateName = formatedAddress?.pop()?.value
    setShipping(prevUser => ({
      ...prevUser,
      country: countryName,
      state: stateName
    }));
  }


  return (
    <>
      <div className="flex items-center justify-between">
        <button
          type="button"
          className="bg-[#3498db] text-white px-4 py-2 rounded mb-4"
          onClick={() => setAddCustomer(false)}
        >
          Back
        </button>
        <h3>Create new customer</h3>
        <button className="bg-[#3498db] text-white px-4 py-2 rounded mb-4">
          Save
        </button>
      </div>
      <div className="addcustomer_container m-auto">
        <div className="form_container max-w-[100%] m-auto">
          <div className="billing_address">
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px]">
                <input
                  type="text"
                  name="first_name"
                  value={user.first_name}
                  onChange={handleUserChange}
                  placeholder="First Name"
                  className="px-5 py-1 sm:py-1 md:py-1 lg:py-2"
                />
                <input
                  type="text"
                  name="last_name"
                  value={user.last_name}
                  onChange={handleUserChange}
                  placeholder="Last Name"
                  className="px-5 py-3"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px] mt-3">
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleUserChange}
                  placeholder="Phone"
                  className="px-5 py-3 mt-3"
                />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleUserChange}
                  placeholder="Email"
                  className="px-5 py-3 mt-3"
                />
              </div>
              <div className=" mt-3">
                <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                  selectProps={{
                    placeholder: "Billing Address",
                    isClearable: true,
                    billingAddress,
                    onChange: selectBillingAddress,
                  }}
                />
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[10px]">
                <input
                  type="text"
                  name="country"
                  value={billing.country}
                  onChange={handleBillingChange}
                  placeholder="Country"
                  className="px-5 py-3"
                />
                <input
                  type="text"
                  name="state"
                  value={billing.state}
                  onChange={handleBillingChange}
                  placeholder="State"
                  className="px-5 py-3"
                />
                <input
                  type="text"
                  name="postcode"
                  value={billing.postcode}
                  onChange={handleBillingChange}
                  placeholder="Zip"
                  className="px-5 py-3"
                />
              </div>
            </form>
          </div>
          <div className="shipping_address">
            <input onChange={(e) => setShowShippingAddress(e.target.checked)} type="checkbox" className="mt-5 cursor-pointer" />{" "}
            <span className="text-[16px] pb-5 pt-5  text-[#00000082]">
              <span className="pt-1 pr-1"></span>
              Ship to a different address
            </span>
            {isShippingAddress &&
              <>
                <h1 className="text-[16px] pb-3 text-[#000000]">
                  Shipping Address
                </h1>
                <form>
                  <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px]">
                    <input
                      type="text"
                      name="first_name"
                      value={shipping.first_name}
                      onChange={handleShippingChange}
                      placeholder="First Name"
                      className="px-5 py-1 sm:py-1 md:py-1 lg:py-2"
                    />
                    <input
                      type="text"
                      name="last_name"
                      value={shipping.last_name}
                      onChange={handleShippingChange}
                      placeholder="Last Name"
                      className="px-5 py-3"
                    />
                  </div>

                  <div className=" mt-3">
                    <GooglePlacesAutocomplete
                      apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                      selectProps={{
                        placeholder: "Shipping Address",
                        isClearable: true,
                        shippingAddress,
                        onChange: selectShippingAddress,
                      }}
                    />
                  </div>
                  <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[10px]">
                    <input
                      type="text"
                      name="country"
                      value={shipping.country}
                      onChange={handleShippingChange}
                      placeholder="Country"
                      className="px-5 py-3"
                    />
                    <input
                      type="text"
                      name="state"
                      value={shipping.state}
                      onChange={handleShippingChange}
                      placeholder="State"
                      className="px-5 py-3"
                    />
                    <input
                      type="text"
                      name="postcode"
                      value={shipping.postcode}
                      onChange={handleShippingChange}
                      placeholder="Zip"
                      className="px-5 py-3"
                    />
                  </div>
                </form>
              </>
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default Addcustomer;
