import { AddressElement } from "@stripe/react-stripe-js";

const AddressForm = () => {  
  return (
    <div className="mb-6">  
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Shipping Address</h3>
      <AddressElement
        options={{ mode: "shipping" }}
        onChange={(event) => {
          if (event.complete) {
            const address = event.value.address;
            console.log('Address collected:', address);
          }
        }}
      />
    </div>
  );
};

export default AddressForm;