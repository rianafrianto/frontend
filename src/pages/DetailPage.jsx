import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const DetailPage = () => {
  const location = useLocation();
  const { record } = location.state || {};
  const { Button, Empty, navigate } = useContext(DataContext);

  return (
    <>
      <Navbar />
      <div className='container mx-auto p-10 bg-white shadow-lg rounded-lg mt-10'>
        <h1 className='text-3xl font-bold text-center mb-6'>Detail Page</h1>
        {record ? (
          <div className='row'>
            <div className='col-md-6 mb-4'>
              <h2 className='text-md font-semibold mb-4'>
                <span className='font-semibold'>Name: </span>
                {record.name}
              </h2>
              <p className='text-md font-semibold mb-4'>
                <span className='font-semibold'>Description: </span>
                {record.description}
              </p>
              <p className='text-md font-semibold mb-2'>
                <span className='font-semibold'>Price: </span>
                <span className='text-green-600'>Rp {Number(record.price).toLocaleString()}</span>
              </p>
              <p className='text-md font-semibold mb-2'>
                <span className='font-semibold'>Category: </span>
                {record.category}
              </p>
            </div>
          </div>
        ) : (
          <div className='text-center'>
            <Empty description='Data not found' />
          </div>
        )}
        <Button type='primary' className='w-full mt-10' onClick={() => navigate('/homepage')}>
          Kembali
        </Button>
      </div>
    </>
  );
};

export default DetailPage;
