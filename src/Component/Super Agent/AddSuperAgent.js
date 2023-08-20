import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { AiFillCloseSquare, AiOutlinePlus } from 'react-icons/ai';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Form from 'react-bootstrap/Form';
import { useCreateSuperAgentMutation } from '../Redux/superAgentApi';

const AddSuperAgent = ({ onHide }) => {

    const [createSuperAgent] = useCreateSuperAgentMutation()



    const valSchema = Yup.object().shape({
        AgentCode: Yup.string().required(),
        FullName: Yup.string().required(),
        UserName: Yup.string().required(),
        Password: Yup.string().required(),
        Address: Yup.string().required(),
        //     StarGrading: Yup.number().required(),
        //     Academic: Yup.string(),
        //     Professional: Yup.string(),
        //     WorkExp: Yup.string(),
        //     ResponseTime: Yup.string(),
        //     ProductCat: Yup.string(),
        //     ProductType: Yup.string(),
        //     Statement: Yup.string(),
        //     Contact: Yup.string(),
        Image: Yup.mixed(),
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const parts = reader.result.split(',');
            if (parts.length === 2) {
                formik.setFieldValue('Image', parts[1]); // Set only the base64 data
            }
        };
    };

    const formik = useFormik({
        initialValues: {
            AuthCode: "r1d3r", // Replace with actual AuthCode
            Flag: "i",
            AgentCode: "",
            FullName: "",
            UserName: "",
            Password: "",
            Address: "",
            District: "",
            StarGrading: "",
            Academic: "",
            Professional: "",
            WorkExp: "",
            ResponseTime: "",
            ProductCat: "",
            ProductType: "",
            Statement: "",
            Contact: "",
            AllowApp: 'Y',
            Image: "",
        },
        onSubmit: async (formdata) => {
            console.log(formdata)
            try {
                const responseData = await createSuperAgent({
                    AuthCode: formdata.AuthCode,
                    Flag: formdata.Flag,
                    AgentCode: formdata.AgentCode,
                    FullName: formdata.FullName,
                    UserName: formdata.UserName,
                    Password: formdata.Password,
                    Address: formdata.Address,
                    District: formdata.District.toString(),
                    Academic: formdata.Academic,
                    StarGrading: formdata.StarGrading.toString(),
                    Professional: formdata.Professional,
                    ResponseTime: formdata.ResponseTime,
                    ProductCat: formdata.ProductCat,
                    WorkExp: formdata.WorkExp,
                    ProductType: formdata.ProductType,
                    Statement: formdata.Statement,
                    ProductType: formdata.ProductType,
                    Contact: formdata.Contact,
                    AllowApp: formdata.AllowApp,
                    Image: formdata.Image,
                }).unwrap();
                toast.success('Super Agent Added successfully');
                console.log('API Response:', responseData);
                onHide();
            } catch (error) {
                console.error(error);
                toast.success('error');

            }
        },
        validationSchema: valSchema
    });


    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <div className='grid-column-03'>
                    <div className="mb-3">
                        <input
                            type='text'
                            name='AgentCode'
                            onChange={formik.handleChange}
                            value={formik.values.AgentCode}
                            size="lg"
                            className='form-control'
                            label="Agent Code"
                            placeholder='Agent Code'
                        />
                        {formik.errors.AgentCode && formik.touched.AgentCode && (
                            <div className='mt-1 text-red-600'>{formik.errors.AgentCode}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='UserName'
                            onChange={formik.handleChange}
                            value={formik.values.UserName}
                            size="lg"
                            className='form-control'
                            label="UserName"
                            placeholder='User Name'
                        />
                        {formik.errors.UserName && formik.touched.UserName && (
                            <div className='mt-1 text-red-600'>{formik.errors.UserName}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='FullName'
                            onChange={formik.handleChange}
                            value={formik.values.FullName}
                            size="lg"
                            className='form-control'
                            label="FullName"
                            placeholder='FullName'
                        />
                        {formik.errors.FullName && formik.touched.FullName && (
                            <div className='mt-1 text-red-600'>{formik.errors.FullName}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='Address'
                            value={formik.values.Address}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Address"
                            placeholder='Address'
                        />
                        {formik.errors.Address && formik.touched.Address && (
                            <div className='mt-1 text-red-600'>{formik.errors.Address}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <select
                            id="District"
                            name="District"
                            value={formik.values.District}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className='form-select'
                        >
                            <option value="" disabled>Select a District</option>
                            <option value="1">District 1</option>
                            <option value="2">District 2</option>
                            <option value="3">District 3</option>
                            <option value="4">District 4</option>
                            <option value="5">District 5</option>
                        </select>
                        {formik.errors.District && formik.touched.District && (
                            <div className="invalid-feedback">
                                {formik.errors.District}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='Password'
                            value={formik.values.Password}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Password"
                            placeholder='password'
                        />
                        {formik.errors.Password && formik.touched.Password && (
                            <div className='mt-1 text-red-600'>{formik.errors.Password}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type="number"
                            name="StarGrading"
                            value={formik.values.StarGrading}
                            onChange={formik.handleChange}
                            size="lg"
                            className="form-control"
                            label="Star Grading"
                            placeholder="Star Grading"
                        />
                        {formik.errors.StarGrading && formik.touched.StarGrading && (
                            <div className="mt-1 text-red-600">{formik.errors.StarGrading}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='Academic'
                            value={formik.values.Academic}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Academic"
                            placeholder='Academic'
                        />
                        {formik.errors.Academic && formik.touched.Academic && (
                            <div className='mt-1 text-red-600'>{formik.errors.Academic}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='Professional'
                            value={formik.values.Professional}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Professional"
                            placeholder='Professional'
                        />
                        {formik.errors.Professional && formik.touched.Professional && (
                            <div className='mt-1 text-red-600'>{formik.errors.Professional}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='WorkExp'
                            value={formik.values.WorkExp}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Work Experience"
                            placeholder='Work Experience'
                        />
                        {formik.errors.WorkExp && formik.touched.WorkExp && (
                            <div className='mt-1 text-red-600'>{formik.errors.WorkExp}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <input
                            type="text"
                            id="ResponseTime"
                            name="ResponseTime"
                            value={formik.values.ResponseTime}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            placeholder="Response Time"
                        />
                        {formik.errors.ResponseTime && formik.touched.ResponseTime && (
                            <div className="invalid-feedback">
                                {formik.errors.ResponseTime}
                            </div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='ProductCat'
                            value={formik.values.ProductCat}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Product Category"
                            placeholder='Product Category'
                        />
                        {formik.errors.ProductCat && formik.touched.ProductCat && (
                            <div className='mt-1 text-red-600'>{formik.errors.ProductCat}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='ProductType'
                            value={formik.values.ProductType}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Product Type"
                            placeholder='Product Type'
                        />
                        {formik.errors.ProductType && formik.touched.ProductType && (
                            <div className='mt-1 text-red-600'>{formik.errors.ProductType}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='Contact'
                            value={formik.values.Contact}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Contact" placeholder='contact'
                        />
                        {formik.errors.Contact && formik.touched.Contact && (
                            <div className='mt-1 text-red-600'>{formik.errors.Contact}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <input
                            type='text'
                            name='Statement'
                            value={formik.values.Statement}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Statement"
                            placeholder='Statement'
                        />
                        {formik.errors.Statement && formik.touched.Statement && (
                            <div className='mt-1 text-red-600'>{formik.errors.Statement}</div>
                        )}
                    </div>


                    {/* Image input */}
                    <div className="mb-3">
                        <label htmlFor="Image">Image</label>
                        <input
                            type="file"
                            id="Image"
                            name="Image"
                            className="bg-white"
                            onChange={handleImageChange}
                        />
                        {formik.values.Image && (
                            <img src={`data:image/png;base64,${formik.values.Image}`} height={100} width={100} alt="Selected" />
                        )}
                        {formik.errors.Image && formik.touched.Image && (
                            <div className="mt-1 text-red-600">{formik.errors.Image}</div>
                        )}
                    </div>


                </div>

                <button variant="primary" type="submit" className="mt-5">
                    Add Agent
                </button>
            </Form >
        </>
    );
};

export default AddSuperAgent;