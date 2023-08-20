import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { AiFillCloseSquare, AiOutlinePlus } from "react-icons/ai";
import { useFormik } from 'formik';
import { useUpdateSuperAgentMutation } from '../Redux/superAgentApi';

const UpdateSuperAgent = ({ onHide, superAgentDataId }) => {

    const [updateSuperAgent] = useUpdateSuperAgentMutation();

    const [superAgentData1] = superAgentDataId?.Values
    console.log("superAgentDataId:", superAgentDataId);
    console.log("superAgentDataId.Values:", superAgentDataId?.Values);
    console.log("superAgentData1.Values:", superAgentData1);

    const [isUploaded, setIsUploaded] = useState(false);
    const [image, setImage] = useState('');



    const formik = useFormik({
        initialValues: {
            FullName: superAgentData1?.FullName,
            UserName: superAgentData1?.UserName,
            Address: superAgentData1?.Address,
            District: superAgentData1?.District,
            GradingRate: superAgentData1?.GradingRate,
            Academic: superAgentData1?.Academic,
            Professional: superAgentData1?.Professional,
            WorkExp: superAgentData1?.WorkExp,
            ResponseTime: superAgentData1?.ResponseTime,
            ProdCategory: superAgentData1?.ProdCategory,
            ProductType: superAgentData1?.ProductType,
            Statement: superAgentData1?.Statement,
            Contact: superAgentData1?.Contact
            // Image: null,

        },
        onSubmit: async (superData) => {
            console.log('val:', superData);
            let formData = new FormData();
            formData.append('FullName', superData.FullName);
            formData.append('UserName', superData.UserName);
            formData.append('Password', superData.Password);
            formData.append('Address', superData.Address);
            formData.append('District', superData.District);
            formData.append('StarGrading', superData.StarGrading);
            formData.append('Professional', superData.Professional);
            formData.append('ResponseTime', superData.ResponseTime);
            formData.append('ProductCat', superData.ProductCat);
            formData.append('ProductType', superData.ProductType);
            formData.append('Statement', superData.Statement);
            formData.append('Contact', superData.Contact);
            formData.append('AllowApp', superData.AllowApp);
            formData.append('image', superData.Image);

            try {
                const response = await updateSuperAgent({
                    body:
                    {
                        AuthCode: "r1d3r",
                        Flag: "U",
                        FullName: superData.FullName,
                        UserName: superData.UserName,
                        Address: superData.Address,
                        Professional: superData.Professional,
                        District: superData.District,
                        ResponseTime: superData.ResponseTime,
                        ProductCat: superData.ProductCat,
                        ProductType: superData.ProductType,
                        Statement: superData.Statement,
                        AllowApp: superData.AllowApp,
                    }

                }).unwrap();
                toast.success('Super Agent Update successfully');
                onHide();
            } catch (err) {
                toast.error(err.message);

            }

        },
        // validationSchema: valSchema
    });




    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <div className='grid-column-03'>
                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">UserName</label>
                        <input
                            type='text'
                            name='UserName'
                            onChange={formik.handleChange}
                            value={formik.values.UserName}
                            size="lg"
                            className='form-control'
                            label="UserName"
                        />
                        {formik.errors.UserName && formik.touched.UserName && (
                            <div className='mt-1 text-red-600'>{formik.errors.UserName}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">FullName</label>
                        <input
                            type='text'
                            name='FullName'
                            onChange={formik.handleChange}
                            value={formik.values.FullName}
                            size="lg"
                            className='form-control'
                            label="FullName"
                        />
                        {formik.errors.FullName && formik.touched.FullName && (
                            <div className='mt-1 text-red-600'>{formik.errors.FullName}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Address</label>
                        <input
                            type='text'
                            name='Address'
                            value={formik.values.Address}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Address"
                        />
                        {formik.errors.Address && formik.touched.Address && (
                            <div className='mt-1 text-red-600'>{formik.errors.Address}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">District</label>
                        <select
                            id="District"
                            name="District"
                            value={formik.values.District}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='form-select'
                        >
                            <option value="" disabled>Select a District</option>
                            <option value="district1">District 1</option>
                            <option value="district2">District 2</option>
                            <option value="district3">District 3</option>
                            <option value="district4">District 4</option>
                            <option value="district5">District 5</option>
                        </select>
                        {formik.errors.District && formik.touched.District && (
                            <div className="invalid-feedback">
                                {formik.errors.District}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">StarGrading</label>
                        <input
                            type='text'
                            name='GradingRate'
                            value={formik.values.GradingRate}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Star Grading"
                        />
                        {formik.errors.GradingRate && formik.touched.GradingRate && (
                            <div className='mt-1 text-red-600'>{formik.errors.GradingRate}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Academic</label>
                        <input
                            type='text'
                            name='Academic'
                            value={formik.values.Academic}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Academic"
                        />
                        {formik.errors.Academic && formik.touched.Academic && (
                            <div className='mt-1 text-red-600'>{formik.errors.Academic}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Professional</label>
                        <input
                            type='text'
                            name='Professional'
                            value={formik.values.Professional}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Professional"
                        />
                        {formik.errors.Professional && formik.touched.Professional && (
                            <div className='mt-1 text-red-600'>{formik.errors.Professional}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Work Experience</label>
                        <input
                            type='text'
                            name='WorkExp'
                            value={formik.values.WorkExp}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Work Experience"
                        />
                        {formik.errors.WorkExp && formik.touched.WorkExp && (
                            <div className='mt-1 text-red-600'>{formik.errors.WorkExp}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Response Time</label>
                        <input
                            type="text"
                            id="ResponseTime"
                            name="ResponseTime"
                            value={formik.values.ResponseTime}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                        />
                        {formik.errors.ResponseTime && formik.touched.ResponseTime && (
                            <div className="invalid-feedback">
                                {formik.errors.ResponseTime}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Product Category</label>
                        <input
                            type='text'
                            name='ProdCategory'
                            value={formik.values.ProdCategory}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Product Category"
                        />
                        {formik.errors.ProdCategory && formik.touched.ProdCategory && (
                            <div className='mt-1 text-red-600'>{formik.errors.ProdCategory}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Product Type</label>
                        <input
                            type='text'
                            name='ProdType'
                            value={formik.values.ProdType}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Product Type"
                        />
                        {formik.errors.ProdType && formik.touched.ProdType && (
                            <div className='mt-1 text-red-600'>{formik.errors.ProdType}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">contact</label>
                        <input
                            type='text'
                            name='Contact'
                            value={formik.values.Contact}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Contact"
                        />
                        {formik.errors.Contact && formik.touched.Contact && (
                            <div className='mt-1 text-red-600'>{formik.errors.Contact}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Statement</label>
                        <input
                            type='text'
                            name='Statement'
                            value={formik.values.Statement}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Statement"
                        />
                        {formik.errors.Statement && formik.touched.Statement && (
                            <div className='mt-1 text-red-600'>{formik.errors.Statement}</div>
                        )}
                    </div>

                    {/* Image input */}
                    <div className="input-field">
                        {isUploaded ? (
                            <div className="inputfield">
                                <img src={image} alt="" style={{ height: "200px" }} />
                                <span
                                    className="close"
                                    onClick={() => {
                                        setImage("");
                                        setIsUploaded(false);
                                        formik.setFieldValue('Image', ''); // Clear the image field value
                                    }}
                                >
                                    <AiFillCloseSquare />
                                </span>
                            </div>
                        ) : (
                            <div className="inputfield">
                                <input
                                    type="file"
                                    onChange={(event) => {
                                        const selectedImage = event.target.files[0];
                                        if (selectedImage) {
                                            setImage(URL.createObjectURL(selectedImage));
                                            setIsUploaded(true);
                                            formik.setFieldValue('Image', selectedImage); // Set the image field value
                                        }
                                    }}
                                    id="Image"
                                />
                                <label className="image_box" htmlFor="image">
                                    <AiOutlinePlus size="2rem" color="var(--primary)" />
                                </label>
                            </div>
                        )}
                    </div>
                </div>

                <button variant="primary" type="submit" className='mt-5'>
                    Update Agent
                </button>
            </Form >
        </>
    );
};

export default UpdateSuperAgent;