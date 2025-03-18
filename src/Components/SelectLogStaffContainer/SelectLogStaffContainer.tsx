import React, { useEffect } from 'react'
import './SelectLogStaffContainer.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { updateUserId } from '../../redux/slices/logDataSlice';

function SelectLogStaffContainer() {
  const userId = useSelector((state: RootState) => state.logData)
  return (
    <>
      <h6 className="log-staff-id-title fw-bold">User ID : {userId.userId}</h6>            
    </>
  )
}

export default SelectLogStaffContainer