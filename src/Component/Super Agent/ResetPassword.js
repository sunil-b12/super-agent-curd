import React from 'react'
import { useRestPasswordMutation } from '../Redux/superAgentApi'
import { toast } from 'react-toastify'

const ResetPassword = ({ onHide, agentId }) => {

    const [resetPassword] = useRestPasswordMutation(agentId)

    const okButton = () => {
        onHide();
        toast.success("Password Rest")
    }

    return (
        <div className='d-flex justify-content-center gap-3'>
            <button type="submit" className="btn btn-outline-primary mr-4" onClick={okButton}>Ok</button>
            <button type="submit" className="btn btn-outline-primary" onClick={onHide}>Canel</button>
        </div>
    )
}

export default ResetPassword