import { HiSearch } from 'react-icons/hi';
// import css from './SearchBox.module.css';

export const SearchBox = ({ value, onChange }) => {
  return (
    <div>
      <HiSearch />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};
