import React, { useContext, useState } from "react";
import { BASE_URL } from "../utills/config";
import { useNavigate } from "react-router-dom";
import CommonSection from "../shared/commonSection";
import { AuthContext } from "../components/context/AuthContext";

const Events = () => {
    const { user } = useContext(AuthContext);

    const fields = ["Title", "City", "Date", "Description"];

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: "",
        city: "",
        date: "",
        desc: "",
        photo: null,
    });

    const handleChange = (e) => {
        const { name, value, type, checked, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]:
                type === "checkbox"
                    ? checked
                    : type === "file"
                    ? files[0]
                    : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();

        console.log(formData);

        for (const key in formData) {
            form.append(key, formData[key]);
        }

        try {
            const res = await fetch(`${BASE_URL}/events`, {
                method: "POST",
                body: form,
            });
            const data = await res.json();
        } catch (error) {
            console.log(error.message);
        }
    };

    return user ? (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-4">
            <CommonSection title={"Add a event"} />
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="rounded-md shadow-sm space-y-4">
                            {fields.map((field) => (
                                <div key={field}>
                                    <label
                                        htmlFor={field}
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {field.charAt(0).toUpperCase() +
                                            field.slice(1)}
                                    </label>
                                    <input
                                        id={field}
                                        name={field}
                                        type={
                                            field === "Date" ||
                                            field === "unlockRadius"
                                                ? "date"
                                                : "text"
                                        }
                                        value={formData[field]}
                                        onChange={handleChange}
                                        required
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder={
                                            field.charAt(0).toUpperCase() +
                                            field.slice(1)
                                        }
                                    />
                                </div>
                            ))}
                            <div>
                                <label
                                    htmlFor="photo"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Photo
                                </label>
                                <input
                                    id="photo"
                                    name="photo"
                                    type="file"
                                    onChange={handleChange}
                                    className="mt-1 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    ) : (
        <>
            <CommonSection title={"Login to contribute event"} />
        </>
    );
};

export default Events;
