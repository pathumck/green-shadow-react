import React from 'react'
import './PageTitle.css'

function PageTitle(props : any) {
  return (
    <>
      <div className='container-fluid d-flex title-wrap'>
        <div className='d-flex'>
        <span className='me-1'>{props.icon}</span>
        <h5>{props.title}</h5>
        </div>
      </div>
    </>
  )
}

export default PageTitle