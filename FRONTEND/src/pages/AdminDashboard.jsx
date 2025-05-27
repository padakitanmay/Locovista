import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utills/config";

const AdminDashboard = () => {
    const [pendingTours, setPendingTours] = useState([]);

    const token = localStorage.getItem("token"); // token from login

    // Fetch all pending tours
    const fetchPendingTours = async () => {
        try {
            const res = await fetch(`${BASE_URL}/admin/getAllPendingReq`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const result = await res.json();
            setPendingTours(result.pendingTours);
        } catch (err) {
            console.error("Error fetching pending tours", err);
        }
    };

    useEffect(() => {
        fetchPendingTours();
    }, []);

    const handleAction = async (id, action) => {
        try {
            const res = await fetch(`${BASE_URL}/admin/${action}/${id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.ok) {
                alert(`Tour ${action}ed successfully`);
                fetchPendingTours(); // Refresh list
            }
        } catch (err) {
            console.error("Error performing action:", err);
        }
    };

    return (
        <div className="container mx-auto p-8">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>
            {pendingTours?.length === 0 ? (
                <p>No pending submissions</p>
            ) : (
                <table className="w-full border">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="p-2">Title</th>
                            <th className="p-2">City</th>
                            <th className="p-2">Address</th>
                            <th className="p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingTours?.map((tour) => (
                            <tr key={tour._id} className="border-t">
                                <td className="p-2">{tour.title}</td>
                                <td className="p-2">{tour.city}</td>
                                <td className="p-2">{tour.address}</td>
                                <td className="p-2 space-x-2">
                                    <button
                                        onClick={() =>
                                            handleAction(tour._id, "accept")
                                        }
                                        className="bg-green-500 text-white px-3 py-1 rounded"
                                    >
                                        Approve
                                    </button>
                                    <button
                                        onClick={() =>
                                            handleAction(tour._id, "reject")
                                        }
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Reject
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default AdminDashboard;
