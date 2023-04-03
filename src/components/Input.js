function Input({onChange}) {
    return (
        <input
            type="text"
            placeholder="Filter by name"
            onChange={(e) => onChange(e.target.value)}
        />
    );
}

export default Input;
