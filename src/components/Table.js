function Table({data, onSort}) {
    return (
        <table>
            <thead>
            <tr>
                <th onClick={() => onSort('name')}>Name</th>
                <th onClick={() => onSort('age')}>Age</th>
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.age}</td>
                </tr>
            ))}
            </tbody>
        </table>
    );
}

export default Table;
