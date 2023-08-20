import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import button from 'react-bootstrap/button';
import Modal from 'react-bootstrap/Modal';
import { AiOutlineClose } from "react-icons/ai";
import { useDeleteSuperAgentMutation, useGetSuperAgentByIdQuery, useGetSuperAgentQuery, useIsActiveMutation, useIsAllowMutation } from '../Redux/superAgentApi';
import AddSuperAgent from './AddSuperAgent';
import { Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';
import UpdateSuperAgent from './UpdateSuperAgent';

const SuperAgent = () => {

    const [show, setShow] = useState(false);

    const [updateshow, setUpdateShow] = useState(false);
    const [agentId, setAgentId] = useState(null);

    const { data: superAgentData, refetch, isLoading } = useGetSuperAgentQuery();

    const { data: superAgentDataId, isLoading: superAgentDataIdLoading, } = useGetSuperAgentByIdQuery(agentId)

    const [isActiveMutation] = useIsActiveMutation()
    const [isAllowMutation] = useIsAllowMutation()

    const [deleteSuperAgentMutation] = useDeleteSuperAgentMutation();


    const handleEditAgent = (agentId) => {
        setUpdateShow(true)

        setAgentId(agentId)
    };

    const handleDeleteAgent = async (agentId) => {
        try {
            const response = await deleteSuperAgentMutation(agentId);
            console.log(`Deleted agent with ID: ${agentId}`);
            console.log('Response:', response);
            refetch();
            // Manual refetch might not be needed if the mutation updates the store automatically
        } catch (error) {
            console.error("Error deleting agent:", error);
        }
    };


    const handleStatus = async (AgentID, IsActive) => {
        const isUpdated = IsActive === "A" ? "I" : "A"
        try {
            const response = await isActiveMutation({
                body: {
                    "AuthCode": "r1d3r",
                    "Flag": "AI",
                    "AgentID": AgentID.toString(),
                    "IsActive": isUpdated
                }
            });
            // toast.success('Success');
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const checkStatus = (status) => {
        if (status === "A") {
            return (
                <button>
                    Active
                </button>
            );
        } else if (status === "I") {
            return (
                <button>
                    Deactive
                </button>
            );
        }
    };




    const handleAllow = async (AgentID, AllowApp) => {
        const isUpdated = AllowApp === "Y" ? "N" : "Y"
        try {
            const response = await isActiveMutation({
                body: {
                    "AuthCode": "r1d3r",
                    "Flag": "AD",
                    "AgentID": AgentID.toString(),
                    "AllowApp": isUpdated
                }
            });

            // toast.success('Success');
            refetch();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const checkAllow = (status) => {
        if (status === "Y") {
            return (
                <button>
                    Allow
                </button>
            );
        } else if (status === "N") {
            return (
                <button>
                    Disallow
                </button>
            );
        }
    };


    if (superAgentDataIdLoading) {
        return <p>Loading...</p>; // Display a loading indicator while data is being fetched
    }

    return (
        <>
            <div style={{ padding: "20px" }} className='container grid'>
                <h2 className='text-center mt-3'>Super Agent Data</h2>
                <div className=" my-5 d-flex justify-content-end">
                    <button variant="primary" onClick={() => setShow(true)}>
                        Create Agent
                    </button>
                </div>

                {isLoading ? (
                    <div className="text-center">
                        <Spinner animation="border" variant="primary" />
                    </div>
                ) : (
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>FullName</th>
                                <th>Username</th>
                                <th>Address</th>
                                <th>AgentCode</th>
                                <th>AllowApp</th>
                                <th>GradingRate</th>
                                <th>NoOfProperty</th>
                                <th>IsActive</th>
                                <th>CreatedDate</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                superAgentData?.Values.map((agentData) => {
                                    return <tr key={agentData.AgentID}>
                                        <td>{agentData.AgentID}</td>
                                        <td>{agentData.FullName}</td>
                                        <td>{agentData.UserName}</td>
                                        <td>{agentData.Address}</td>
                                        <td>{agentData.AgentCode}</td>
                                        <td>
                                            <button
                                                className="uk-badge cursor-pointer bg-success text-white"
                                                style={{ fontSize: "11px" }}
                                                onClick={() => handleAllow(agentData.AgentID, agentData.AllowApp)}
                                            >
                                                {checkAllow(agentData.AllowApp)}
                                            </button>
                                        </td>
                                        <td>{agentData.GradingRate}</td>
                                        <td>{agentData.NoOfProperty}</td>
                                        <td>
                                            <button
                                                className="uk-badge cursor-pointer bg-success text-white"
                                                style={{ fontSize: "11px" }}
                                                onClick={() => handleStatus(agentData.AgentID, agentData.IsActive)}
                                            >
                                                {checkStatus(agentData.IsActive)}
                                            </button>
                                        </td>
                                        <td>{agentData.CreatedDate}</td>
                                        <td>
                                            <button className="btn text-warning btn-act" onClick={() => handleEditAgent(agentData.AgentID)}>
                                                <i className="material-icons">Edit</i>
                                            </button>
                                            <button
                                                onClick={() => handleDeleteAgent(agentData.AgentID)}
                                                className="btn text-danger btn-act"
                                                data-toggle="modal"
                                            >
                                                <i className="material-icons">delete</i>
                                            </button>
                                        </td>
                                    </tr>

                                })
                            }
                        </tbody>
                    </Table>
                )}
            </div>
            <div>
                <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    dialogClassName="custom-modal"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Create New Super Agent
                        </Modal.Title>
                        <button onClick={() => setShow(false)} className="uk-button bg-close-btn">
                            <AiOutlineClose uk-tooltip="Close" size="1.3rem" color="#fff" />
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <AddSuperAgent onHide={() => setShow(false)} />
                    </Modal.Body>
                </Modal>
            </div >

            <div>
                <Modal
                    show={updateshow}
                    onHide={() => setUpdateShow(false)}
                    dialogClassName="custom-modal"
                    aria-labelledby="example-custom-modal-styling-title"
                >
                    <Modal.Header>
                        <Modal.Title id="example-custom-modal-styling-title">
                            Update Super Agent
                        </Modal.Title>
                        <button onClick={() => setUpdateShow(false)} className="uk-button bg-close-btn">
                            <AiOutlineClose uk-tooltip="Close" size="1.3rem" color="#fff" />
                        </button>
                    </Modal.Header>
                    <Modal.Body>
                        <UpdateSuperAgent onHide={() => setUpdateShow(false)} superAgentDataId={superAgentDataId} />
                    </Modal.Body>
                </Modal>
            </div >
        </>
    );
};

export default SuperAgent;