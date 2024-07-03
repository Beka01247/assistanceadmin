import React, { useState, useEffect } from 'react';
import axios from 'axios';

function NaturalDisasters() {
    const [disasters, setDisasters] = useState([]);
    const [newDisasterName, setNewDisasterName] = useState('');
    const [newDisasterDate, setNewDisasterDate] = useState('');
    const [newDisasterDesc, setNewDisasterDesc] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchDisasters();
    }, []);

    const fetchDisasters = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4010/api/user/disasters', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setDisasters(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch disasters:", error);
            setLoading(false);
        }
    };

    const handleAddDisaster = async (event) => {
        event.preventDefault();
        if (!newDisasterName) return;

        try {
            const response = await axios.post('http://localhost:4010/api/user/disaster/add-disaster', {
                name: newDisasterName,
                description: newDisasterDesc,
                date_occurred: newDisasterDate
            }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json'
                }
            });
            setDisasters([...disasters, response.data]); // Assuming the backend returns the added disaster
            setNewDisasterName(''); // Reset input after submission
            setNewDisasterDesc('');
            setNewDisasterDate('');
            fetchDisasters();
        } catch (error) {
            console.error("Failed to add disaster ", error);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center">Natural Disasters</h1>
            {loading ? (
                <p>Loading disasters...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {disasters.map(disaster => (
                        <div key={disaster.id} className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="text-lg font-semibold">{disaster.name}</h3>
                            <p className="text-gray-600">{disaster.description}</p>
                            <p className="text-sm text-gray-500">Date of occurrence: {new Date(disaster.date_occurred).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
            <h1 className="text-2xl font-bold mb-4  mt-4 text-center">Add disaster</h1>
            <form onSubmit={handleAddDisaster}>
                <input
                    type="text"
                    value={newDisasterName}
                    onChange={(e) => setNewDisasterName(e.target.value)}
                    className="mt-3 block w-full px-4 py-2 border rounded-md shadow-sm"
                    placeholder="New disaster name"
                />
                <input
                    type="text"
                    value={newDisasterDesc}
                    onChange={(e) => setNewDisasterDesc(e.target.value)}
                    className="mt-3 block w-full px-4 py-2 border rounded-md shadow-sm"
                    placeholder="New disaster description"
                />
                <input
                    type="date"
                    value={newDisasterDate}
                    onChange={(e) => setNewDisasterDate(e.target.value)}
                    className="mt-3 block w-full px-4 py-2 border rounded-md shadow-sm"
                    placeholder="New disaster date"
                />
                <div className='w-full flex '>
                    <button type="submit" className="mt-3 px-4 py-2 text-sm font-medium text-white rounded bg-green-600 hover:bg-green-700 mx-auto">
                        Add Disaster
                    </button>
                </div>
            </form>
        </div>
    );
}

export default NaturalDisasters;
