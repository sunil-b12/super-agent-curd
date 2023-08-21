import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import { toast } from 'react-toastify';
import { AiFillCloseSquare, AiOutlinePlus } from "react-icons/ai";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useUpdateSuperAgentMutation } from '../Redux/superAgentApi';

const UpdateSuperAgent = ({ onHide, superAgentDataId }) => {

    const [updateSuperAgent] = useUpdateSuperAgentMutation();


    const valSchema = Yup.object().shape({
        FullName: Yup.string().required(),
        Address: Yup.string().required(),
        StarGrading: Yup.string()
            .required()
            .test('max-length', 'StarGrading must be a number with up to 5 characters', val => {
                if (val === undefined) return false;
                return val.toString().length <= 5;
            }),
    })

    const [superAgentData1] = superAgentDataId?.Values
    console.log("superAgentData1.Values:", superAgentData1);

    const [selectedImage, setSelectedImage] = useState(superAgentData1.Image);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const parts = reader.result.split(',');
            if (parts.length === 2) {
                formik.setFieldValue('Image', parts[1]); // Set only the base64 data
                setSelectedImage(reader.result); // Store the selected image data
            }
        };
    };



    const formik = useFormik({
        initialValues: {
            AgentID: superAgentData1?.AgentID,
            FullName: superAgentData1?.FullName,
            Address: superAgentData1?.Address,
            District: superAgentData1?.District,
            StarGrading: superAgentData1?.GradingRate,
            Academic: superAgentData1?.Academic,
            Professional: superAgentData1?.Professional,
            WorkExp: superAgentData1?.WorkExp,
            ResponseTime: superAgentData1?.ResponseTime,
            ProductCat: superAgentData1?.ProdCategory,
            ProductType: superAgentData1?.ProdType,
            Statement: superAgentData1?.Statement,
            Contact: superAgentData1?.Contact,
            Image: null,

        },
        onSubmit: async (formData) => {
            console.log('val:', formData);
            try {
                const response = await updateSuperAgent({
                    body:
                    {
                        AuthCode: "r1d3r",
                        Flag: "U",
                        AgentID: formData.AgentID.toString(),
                        FullName: formData.FullName,
                        Password: formData.Password,
                        Address: formData.Address,
                        District: formData.District.toString(),
                        StarGrading: formData.StarGrading.toString(),
                        Professional: formData.Professional,
                        ResponseTime: formData.ResponseTime,
                        ProductCat: formData.ProductCat,
                        WorkExp: formData.WorkExp,
                        ProductType: formData.ProductType,
                        Statement: formData.Statement,
                        Contact: formData.Contact,
                        Image: formData.Image,
                    }

                }).unwrap();
                toast.success('Super Agent Update successfully');
                onHide();
            } catch (err) {
                toast.error(err.message);

            }

        },
        validationSchema: valSchema
    });




    return (
        <>
            <Form onSubmit={formik.handleSubmit}>
                <div className='grid-column-03'>
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
                        <label htmlFor="AgentCode" className="form-label">StarGrading</label>
                        <input
                            type='text'
                            name='StarGrading'
                            value={formik.values.StarGrading}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Star Grading"
                        />
                        {formik.errors.StarGrading && formik.touched.StarGrading && (
                            <div className='mt-1 text-red-600'>{formik.errors.StarGrading}</div>
                        )}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">StarGrading</label>
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
                            name='ProductCat'
                            value={formik.values.ProductCat}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Product Category"
                        />
                        {formik.errors.ProductCat && formik.touched.ProductCat && (
                            <div className='mt-1 text-red-600'>{formik.errors.ProductCat}</div>
                        )}
                    </div>

                    <div className="mb-3">
                        <label htmlFor="AgentCode" className="form-label">Product Type</label>
                        <input
                            type='text'
                            name='ProductType'
                            value={formik.values.ProductType}
                            onChange={formik.handleChange}
                            size="lg"
                            className='form-control'
                            label="Product Type"
                        />
                        {formik.errors.ProductType && formik.touched.ProductType && (
                            <div className='mt-1 text-red-600'>{formik.errors.ProductType}</div>
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
                    {/* Render your form fields, including image input */}
                    <div className="mb-3">
                        <label htmlFor="Image">Image</label>
                        <input
                            type="file"
                            id="Image"
                            name="Image"
                            className="bg-white"
                            onChange={(e) => handleImageChange(e, formik)}
                        />
                        {selectedImage && (
                            <div>
                                <img src={selectedImage} height={100} width={100} alt="Selected" />
                                <button
                                    type="button"
                                    onClick={() => {
                                        formik.setFieldValue('Image', ''); // Clear the selected image
                                        setSelectedImage(null); // Clear the stored image data
                                    }}
                                >
                                    Remove
                                </button>
                            </div>
                        )}
                        {formik.errors.Image && formik.touched.Image && (
                            <div className="mt-1 text-red-600">{formik.errors.Image}</div>
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