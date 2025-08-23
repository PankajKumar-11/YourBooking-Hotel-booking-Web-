import React from 'react'
import "./MailList.css"
const MailList = () => {
  return (
    <div className='mailList'>
        <div className="mailContent">
        <div className="mailContent1">
        <div className="mailTitle">
            <span className='mailSlogan'>Save time , Save money!</span>
            <span className='mailMsg'>Sign up and we'll send the best deals to you</span>
        </div>
        <div className="mailData">
            <input className="mailInput" type="text" placeholder='Your email' />
            <button className='mailButton'>Subscribe</button>
        </div>
        <div className="mailContent2">
          <div className="propertyList">
            
          </div>
        </div>

        </div>
        </div>
      
    </div>
  )
}

export default MailList
