import { useFormik } from 'formik'
import React from 'react'
import { useRestPasswordMutation } from '../Redux/superAgentApi'
import { toast } from 'react-toastify'

const ResetPassword = ({ onHide, agentId }) => {

    const [resetPassword] = useRestPasswordMutation()

    const formik = useFormik({
        initialValues: {
            AgentID: agentId,
            Password: ""
        },

        onSubmit: async (superData) => {
            try {
                const response = await resetPassword({
                    body:
                    {
                        AuthCode: "r1d3r",
                        Flag: "RP",
                        AgentID: superData.AgentID.toString(),
                        Password: superData.Password
                    }

                }).unwrap();
                toast.success('Password reset successfully');
                onHide();
            } catch (err) {
                toast.error(err.message);

            }
        }

    })
    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <div className="mb-3" style={{ width: "350px" }}>
                    <label htmlFor="AgentCode" className="form-label">Password</label>
                    <input
                        type='text'
                        name='Password'
                        onChange={formik.handleChange}
                        value={formik.values.Password}
                        size="lg"
                        className='form-control'
                        label="Password"
                    />
                    {formik.errors.Password && formik.touched.Password && (
                        <div className='mt-1 text-red-600'>{formik.errors.Password}</div>
                    )}
                </div>
                <button type="submit" class="btn btn-outline-primary">Reset</button>
            </form>
        </div>
    )
}

export default ResetPassword