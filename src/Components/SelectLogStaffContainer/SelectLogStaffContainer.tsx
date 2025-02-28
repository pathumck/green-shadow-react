import React, { useEffect } from 'react'
import './SelectLogStaffContainer.css'
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../redux/store/store';
import { updateUserId } from '../../redux/slices/logDataSlice';

function SelectLogStaffContainer() {
  
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const userId = "US-0001";
    dispatch(updateUserId(userId));
  }, [dispatch])
  const userId = useSelector((state: RootState) => state.logData)
  console.log(userId)
  return (
    <>
      <h6 className="log-staff-id-title">crip</h6>            
    </>
  )
}

export default SelectLogStaffContainer