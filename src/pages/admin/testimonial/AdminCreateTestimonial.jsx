import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'


import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'


import formValidator from '../../../FormValidators/formValidator'
import imageValidator from '../../../FormValidators/imageValidator'

import { createTestimonial } from "../../../Redux/ActionCreators/TestimonialActionCreators"

export default function AdminCreateTestimonial() {
    let [data, setData] = useState({
        name: "",
        pic: "",
        message: "",
        active: true
    })
    let [error, setError] = useState({
        name: "Name Field is Mendatory",
        pic: "Pic Field is Mendatory",
        message: "Message Field is Mendatory"
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let dispatch = useDispatch()

    function getInputData(e) {
        let name = e.target.name
        // let value = e.target.files ? e.target.files[0] : e.target.value //in case of real backend
        let value = e.target.files ? "testimonial/" + e.target.files[0].name : e.target.value


        if (name !== "active") {
            setError((old) => {
                return {
                    ...old,
                    [name]: e.target.files ? imageValidator(e) : formValidator(e)
                }
            })
        }
        setData((old) => {
            return {
                ...old,
                [name]: name === "active" ? (value === "1" ? true : false) : value
            }
        })

    }
    function postSubmit(e) {
        e.preventDefault()
        let errorItem = Object.values(error).find(x => x !== "")
        if (errorItem)
            setShow(true)
        else {
            dispatch(createTestimonial({ ...data }))

            // //in case of real backend and form has a fle field
            // let formData = new FormData()
            // formData.append("name",data.name)
            // formData.append("pic",data.pic)
            // formData.append("active",data.active)
            // formData.append("message",data.message)
            // dispatch(createTestimonial({ formData }))

            navigate("/admin/testimonial")

        }
    }
    return (
        <>
            <HeroSection title="Admin - Testimonial" />
            <div className="container-fluid py-5 mb-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'> <Link to="/admin/testimonial"><i className='fa fa-arrow-left text-light float-end '></i></Link>Testimonial</h5>
                        <form onSubmit={postSubmit}>
                            <div className="mb-3">
                                <label >Name*</label>
                                <input type="text" name='name' onChange={getInputData} placeholder='Testimonial Name' className={`form-control border-2 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                {show && error.name ? <p className='text-danger text-capitalize'>{error.name}</p> : null}
                            </div>


                            <div className="mb-3">
                                <label>Message*</label>
                                <textarea name="message" onChange={getInputData} className={`form-control border-2 ${show && error.message ? 'border-danger' : 'border-primary'}`} placeholder='Message...' rows={4}></textarea>
                                {show && error.message ? <p className='text-danger text-capitalize'>{error.name}</p> : null}
                            </div>


                            <div className="row">
                                <div className="col-md-6 mb-6">
                                    <label >Pic*</label>
                                    <input type="file" name='pic' onChange={getInputData} className={`form-control border-2 ${show && error.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.pic ? <p className='text-danger text-capitalize'>{error.pic}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label >Active*</label>
                                    <select name="active" onChange={getInputData} className='form-select border-2 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>
                            <div className="mb-3">
                                <button type='submit' className='btn btn-primary w-100'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
