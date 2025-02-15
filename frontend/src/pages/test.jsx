// File: ParentChildComponent.jsx
import React, { useState, useEffect } from 'react';
function Child({ data, onUpdate }) {
    useEffect(() => {
        console.log("Child: data updated to", data);
    }, [data]);
    return (
        <div>
            <h3>Child Component</h3>
            <p>Data: {data}</p>
            <button onClick={() => onUpdate(data + 1)}>
                Increment Data
            </button>
        </div>
    );
}
function Parent() {
    const [data, setData] = useState(0);
    // Function passed to Child to update the state in Parent
    const updateData = (newData) => {
        setData(newData);
    };
    return (
        <div>
            <h2>Parent Component</h2>
            <Child data={data} onUpdate={updateData} />
        </div>
    );
}
export default Parent;