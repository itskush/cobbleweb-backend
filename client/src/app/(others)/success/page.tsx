import React from 'react';

const Success = () => {
  return (
    <div className="flex flex-col text-black justify-center items-center text-center w-[100%]">
      <div className='flex justify-center mx-auto mb-5'>
        <img className='w-[50%]' src="/images/assets/success.png"/>
      </div>
      <div className=''>
      <h1 className="font-weight-700 text-lg ">Registration Successful!</h1>
        <p>Thank you for registering. Your registration was successful.</p>
        <p>You may now by using the login button in the navigation</p>
      </div>
    </div>
  );
};

export default Success;