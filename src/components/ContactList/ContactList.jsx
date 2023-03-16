import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact, fetchContacts } from 'redux/operations';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.contacts);
  const filter = useSelector(state => state.contacts.filter);

  const filteredContact = contacts.filter(
    contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()) ||
      contact.number.includes(filter)
  );

  const handleDeleteContact = id => {
    dispatch(deleteContact(id))
      .then(() => {
        dispatch(fetchContacts());
      })
      .catch(error => {
        console.log(`Error: ${error.message}`);
      });
  };

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  return (
    <table>
      <tbody className={css.list}>
        {filteredContact.map(({ id, name, number }) => (
          <tr key={id} id={id} className={css.item}>
            <td className={css.name}>{name}:</td>
            <td className={css.number}>{number}</td>
            <td>
              <button
                className={css.button}
                type="submit"
                onClick={() => handleDeleteContact(id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      name: PropTypes.string,
      number: PropTypes.string,
    }).isRequired
  ),
};

export default ContactList;
