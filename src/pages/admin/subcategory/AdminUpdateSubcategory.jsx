import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'


import HeroSection from '../../../Components/HeroSection'
import AdminSidebar from '../../../Components/AdminSidebar'

import formValidator from '../../../FormValidators/formValidator'
import imageValidator from '../../../FormValidators/imageValidator'

import { getSubcategory, updateSubcategory } from '../../../Redux/ActionCreators/SubcategoryActionCreators'

export default function AdminUpdateSubcategory() {
    // let { _id } = useParams()  //in case of real backend
    let { id } = useParams()

    let [data, setData] = useState({
        name: "",
        pic: "",
        active: true
    })
    let [error, setError] = useState({
        name: "",
        pic: ""
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()

    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

    function getInputData(e) {
        let name = e.target.name
        // let value = e.target.files ? e.target.files[0] : e.target.value  //in case of real backend
        let value = e.target.files ? "subcategory/" + e.target.files[0].name : e.target.value
        console.log(name)

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
            // let item = SubcategoryStateData.find(x => x._id !== _id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())  // in case of real backend
            let item = SubcategoryStateData.find(x => x.id !== id && x.name.toLocaleLowerCase() === data.name.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setError((old) => {
                    return {
                        ...old,
                        "name": "Subcategory Already Exist"
                    }
                })
            }
            else {
                dispatch(updateSubcategory({ ...data }))

                // //in case of real backend and form has a fle field
                // let formData = new FormData()
                // formData.append("name",data_id) //use id case of RDBMS and use _id in case of mongodb
                // formData.append("name",data.name)
                // formData.append("name",data.pic)
                // formData.append("name",data.active)
                // dispatch(createSubcategory({ formData }))
                navigate("/admin/subcategory")
            }
        }
    }


    useEffect(() => {
        (() => {
            dispatch(getSubcategory())
            if (SubcategoryStateData.length) {
                let item = SubcategoryStateData.find(x => x.id === id)
                // let item = SubcategoryStateData.find(x => x.id === _id) in case of real realbackend
                if (item)
                    setData({ ...item })
            }
        })()
    }, [SubcategoryStateData.length])
    return (
        <>
            <HeroSection title="Admin - Subcategory" />
            <div className="container-fluid py-5 mb-5">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light text-center p-2'>Subcategory <Link to="/admin/subcategory"><i className='fa fa-arrow-left text-light float-end'></i></Link></h5>
                        <form onSubmit={postSubmit}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" name="name" value={data.name} onChange={getInputData} placeholder='Subcategory Name' className={`form-control border-3 ${show && error.name ? 'border-danger' : 'border-primary'}`} />
                                {show && error.name ? <p className='text-danger text-capitalize'>{error.name}</p> : null}
                            </div>

                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name="pic" onChange={getInputData} className={`form-control border-3 ${show && error.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && error.pic ? <p className='text-danger text-capitalize'>{error.pic}</p> : null}
                                </div>

                                <div className="col-md-6 mb-3">
                                    <label>Active</label>
                                    <select name="active" value={data.active ? "1" : "0"} onChange={getInputData} className='form-select border-3 border-primary'>
                                        <option value="1">Yes</option>
                                        <option value="0">No</option>
                                    </select>
                                </div>
                            </div>

                            <div className="mb-3">
                                <button type="submit" className='btn btn-primary w-100'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}





