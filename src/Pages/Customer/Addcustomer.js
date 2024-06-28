import React, { useState, useRef, useContext } from "react";
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { AppContext } from "../../context/AppContext";
import { notifyError, notifySuccess } from "../../utils/toast";
import useUtilsFunction from "../../hooks/useUtilsFunction";
import CustomerServices from "../../services/CutomerServices";
import { saveCustomer } from '../../redux/reducers/appSlice';
import { useDispatch } from 'react-redux';



const Addcustomer = () => {
  const dispatch = useDispatch()
  const [isShippingAddress, setShowShippingAddress] = useState(false)
  const [billingAddress, setBillingAddress] = useState("")
  const [shippingAddress, setShippingAddress] = useState("")
  const { setAddCustomer, setIsUpdate ,setCustomerModal } = useContext(AppContext);
  const [isLoading, setLoading] = useState(false);
  const { catchError } = useUtilsFunction();


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
    }
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
    setBilling(prevUser => ({
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


  function checkDigitValue(value) {
    if (/^\d+$/.test(value)) {
      setBilling(prevUser => ({
        ...prevUser,
        postcode: value
      }));
      return true
    } else {
      setBilling(prevUser => ({
        ...prevUser,
        state: value
      }));
      return false
    }
  }

  const selectBillingAddress = (address) => {
    setBillingAddress(address)
    console.log("Fulllladdress", address)
    const fullAddress = address?.label || ""
    const formatedAddress = address?.value?.terms
    const countryName = formatedAddress?.pop()?.value || ""
    const strValue = formatedAddress?.pop()?.value || ""

    if (checkDigitValue(strValue)) {
      const stateName = formatedAddress?.pop()?.value || ""
      setBilling(prevUser => ({
        ...prevUser,
        postcode: strValue,
        state: stateName
      }));
    }

    else {
      setBilling(prevUser => ({
        ...prevUser,
        state: strValue,
        postcode: "",
      }));
    }

    const cityName = formatedAddress?.pop()?.value || ""

    setBilling(prevUser => ({
      ...prevUser,
      address_1: fullAddress,
      country: countryName,
      city: cityName
    }));
  }


  const selectShippingAddress = (address) => {
    setShippingAddress(address)
    const fullAddress = address?.label || ""
    const formatedAddress = address?.value?.terms
    const countryName = formatedAddress?.pop()?.value || ""
    const strValue = formatedAddress?.pop()?.value || ""

    if (checkDigitValue(strValue)) {
      const stateName = formatedAddress?.pop()?.value || ""
      setShipping(prevUser => ({
        ...prevUser,
        postcode: strValue,
        state: stateName
      }));
    }

    else {
      setShipping(prevUser => ({
        ...prevUser,
        state: strValue,
        postcode: "",
      }));
    }
    const cityName = formatedAddress?.pop()?.value || ""
    setShipping(prevUser => ({
      ...prevUser,
      address_1: fullAddress,
      country: countryName,
      city: cityName
    }));
  }

  const resetFormData = () => {
    setUser(
      {
        email: "",
        first_name: "",
        last_name: "",
        username: "",
        phone: ""
      }
    )
    setBilling(
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
    setShipping({
      first_name: "",
      last_name: "",
      company: "",
      address_1: "",
      address_2: "",
      city: "",
      state: "",
      postcode: "",
      country: "",
    })
    setShowShippingAddress(false)
    setBillingAddress("")
    setShippingAddress("")

  }

  const handleSubmit = async () => {
    if (!user.first_name) {
      notifyError("First name is required")
    }

    else if (!user.last_name) {
      notifyError("Last name is required")
    }

    else if (!user.email) {
      notifyError("Email is Required")
    }

    else {
      let payload = {
        ...user,
        username: `${user.first_name} ${user.last_name} `,
        billing: { ...billing },
        shipping: { ...billing }
      };
      if (shipping.first_name && shipping.last_name && shippingAddress) {
        Object.assign(payload, { shipping: { ...shipping } })
      }
      try {
        setLoading(true);
        const response = await CustomerServices.addCustomerApi(payload);
        console.log("CustomerResponse", response)
        if (response.id) {
          dispatch(saveCustomer(response))
        }
        notifySuccess("Customer created successfully")
        setIsUpdate(true);
        setCustomerModal(false)
        resetFormData();
        setLoading(false);
      } catch (error) {
        const errorMessage = catchError(error);
        setLoading(false);
        notifyError(errorMessage);
      }
    }
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
        <button type="button" onClick={handleSubmit} className="bg-[#3498db] text-white px-4 py-2 rounded mb-4">
          {isLoading ? "Processing" : "Save"}
        </button>
      </div>
      <div className="addcustomer_container m-auto">
        <div className="form_container max-w-[100%] m-auto">
          <div className="billing_address">
            <h1 className="text-[16px] pb-3 text-[#000000]">
              Billing Details
            </h1>
            <form>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px]">
                <input
                  type="text"
                  required
                  name="first_name"
                  value={user.first_name}
                  onChange={handleUserChange}
                  placeholder="First Name*"
                  className="px-5 py-1 sm:py-1 md:py-1 lg:py-2"
                />
                <input
                  type="text"
                  name="last_name"
                  required
                  value={user.last_name}
                  onChange={handleUserChange}
                  placeholder="Last Name*"
                  className="px-5 py-3"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[10px] mt-3">
                <input
                  type="number"
                  name="phone"
                  required
                  value={user.phone}
                  onChange={handleUserChange}
                  placeholder="Phone*"
                  className="px-5 py-3 mt-3"
                />
                <input
                  type="email"
                  name="email"
                  required
                  value={user.email}
                  onChange={handleUserChange}
                  placeholder="Email*"
                  className="px-5 py-3 mt-3"
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  name="company"
                  required
                  value={billing.company}
                  onChange={handleBillingChange}
                  placeholder="Company"
                  className="px-5 py-3"
                />
              </div>
              <div className="mt-3">
                <GooglePlacesAutocomplete
                  apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
                  selectProps={{
                    placeholder: "Billing Address 1",
                    isClearable: true,
                    billingAddress,
                    onChange: selectBillingAddress,
                  }}
                />
              </div>
              <div className="mt-3">
                <input
                  type="text"
                  name="address_2"
                  required
                  value={billing.address_2}
                  onChange={handleBillingChange}
                  placeholder="Address 2"
                  className="px-5 py-3"
                />
              </div>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-[10px]">
                <input
                  type="text"
                  name="country"
                  required
                  value={billing.country}
                  onChange={handleBillingChange}
                  placeholder="Country"
                  className="px-5 py-3"
                />
                <input
                  type="text"
                  name="state"
                  required
                  value={billing.state}
                  onChange={handleBillingChange}
                  placeholder="State"
                  className="px-5 py-3"
                />
                <input
                  type="text"
                  name="postcode"
                  required
                  value={billing.postcode}
                  onChange={handleBillingChange}
                  placeholder="Zip"
                  className="px-5 py-3"
                />
              </div>
            </form>
          </div>
          <div className="shipping_address">
            <input onChange={(e) => setShowShippingAddress(e.target.checked)} checked={isShippingAddress} type="checkbox" className="mt-5 cursor-pointer" />{" "}
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

                  <div className="mt-3">
                    <input
                      type="text"
                      name="company"
                      required
                      value={shipping.company}
                      onChange={handleShippingChange}
                      placeholder="Company"
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
                  <div className="mt-3">
                    <input
                      type="text"
                      name="address_2"
                      required
                      value={shipping.address_2}
                      onChange={handleShippingChange}
                      placeholder="Address 2"
                      className="px-5 py-3"
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
