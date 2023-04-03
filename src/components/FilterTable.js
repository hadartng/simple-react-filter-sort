import {useEffect, useState} from 'react';
import debounce from 'lodash/debounce';
import Input from './Input';
import Table from './Table';
import styles from './FilterTable.module.css';

const DATA = [
    {id: 1, name: 'Hadar', age: 36},
    {id: 2, name: 'Sandy', age: 3.5},
    {id: 3, name: 'Bob', age: 17},
    {id: 4, name: 'Alice', age: 8},
    {id: 5, name: 'Elvis', age: 42},
    {id: 6, name: 'Bono', age: 62},
];

function FilterTable() {
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [sortKey, setSortKey] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [data, setData] = useState(DATA);

    const handleFilter = debounce((value) => {
        setLoading(true);
        setTimeout(() => setQuery(value), 300);
    }, 300);

    useEffect(() => {
        if (query) {
            const filteredData = DATA.filter((item) =>
                item.name.toLowerCase().includes(query.toLowerCase())
            );
            setLoading(false);
            setData(filteredData);
        } else {
            setLoading(false);
            setData(DATA);
        }
    }, [query]);

    const handleSort = (key) => {
        setSortKey(key);
        setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    };

    const sortedData = sortKey ? data.slice().sort((a, b) => {
        const valueA = a[sortKey];
        const valueB = b[sortKey];

        if (valueA < valueB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (valueA > valueB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    }) : data;

    return (
        <div className={styles.container}>
            <h1>Filter sortable table</h1>
            <h2>React.js mini-feature</h2>
            <Input onChange={handleFilter}/>
            <div className={styles.loaderWrp}>
                {loading && (
                    <div className={styles.loader}>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                )}
            </div>
            <Table data={sortedData} onSort={handleSort}/>
        </div>
    );
}

export default FilterTable;
