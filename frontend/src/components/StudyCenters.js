import React, { useState, useEffect } from 'react';
import axios from 'axios';

function StudyCenters() {
    const [centers, setCenters] = useState([]);
    const [newCenterName, setNewCenterName] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchStudyCenters();
    }, []);

    const fetchStudyCenters = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:4010/api/user/study-centers', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            setCenters(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch study centers:", error);
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Study Centers</h1>
            {loading ? (
                <p>Loading study centers...</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {centers.map(center => (
                     <div key={center.id} className="bg-white rounded-lg shadow-md p-4">
                         <h3 className="text-lg font-semibold">{center.name}</h3>
                         <p className="text-gray-600">{center.location}</p>
                     </div>
                 ))}
             </div>
            )}
        </div>
    );
}

export default StudyCenters;
