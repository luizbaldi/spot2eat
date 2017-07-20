import React from 'react';

const Grid = ({spots}) => {
    const columns = ['Id', 'Nome'];
    return (
        <div>
            <button>Adicionar novo restaurante</button>
            <table>
                <thead>
                    <tr>
                        {columns.map((column, idx) => <th key={idx}>{column}</th>)}
                    </tr>
                </thead>
                <tbody>
                        {spots.map((spot, index) => {
                            return (
                                <tr key={`spot_${index}`}>
                                    <td>{spot.spotId}</td>
                                    <td>{spot.name}</td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    );
};

export default Grid;