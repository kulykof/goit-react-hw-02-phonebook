import css from './filter.module.css';
import { PropTypes } from 'prop-types';

const Filter = ({ onChange, value }) => {
  return (
    <>
      <label className={css.title}>
        Find contacts by name
        <input
          className={css.input}
          type="text"
          value={value}
          onChange={onChange}
        />
      </label>
    </>
  );
};
Filter.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string,
};
export default Filter;
