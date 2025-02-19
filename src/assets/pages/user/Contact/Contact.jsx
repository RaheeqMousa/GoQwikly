import React from 'react'
import contact from './contactUsImg.png'
import contact_style from './Contact.module.css'
export default function Contact() {



  return (
    <>
      <div className={`${contact_style.contact}`}>
        <div className='d-flex justify-content-center flex-column ms-3 py-3'>
          <h2>Contact Us</h2>
          <p>Feel free to reach out to us anytime. We'd love to hear from you!</p>
        </div>

        <div className="position-relative d-flex justify-content-center">
          <img src={contact} alt="Contact" className="img-fluid" />

          {/* Form Overlay */}
          <div className={`position-absolute ${contact_style.contactForm} top-50 start-50 translate-middle p-5 rounded shadow ms-3`}>
            
            <div className="w-100 d-flex align-items-center justify-content-center">
              <form className="d-flex flex-column gap-2">
                <input type="text" className="form-control" placeholder="Name" />
                <input type="email" className="form-control" placeholder="Email" />
                <textarea className="form-control" placeholder="Message" rows="5"></textarea>
                <button type="submit" className="btn btn-primary btn-dark w-100">Submit</button>
              </form>
            </div>

          </div>
        </div>

      </div>

    </>

  )
}