const categories = ['Transport', 'Electricity', 'Food', 'Waste'];

export default function CategorySelector({ value, onChange }) {
  return (
    <>
      <label htmlFor="category">Category</label>
      <select id="category" value={value} onChange={onChange}>
        {categories.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </>
  );
}
