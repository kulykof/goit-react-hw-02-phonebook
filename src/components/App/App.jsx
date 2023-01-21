import { Component } from 'react';
import css from './app.module.css';
import { nanoid } from 'nanoid';
import ContactForm from 'components/ContactForm';
import ContactList from 'components/ContactList';
import Filter from 'components/Filter';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  addName = ({ name, number }) => {
    const names = this.state.contacts.map(contact =>
      contact.name.toLowerCase()
    );
    const lowerCaseName = name.toLowerCase();

    if (names.indexOf(lowerCaseName) >= 0) {
      alert(name + ' is already in contacts');
      return;
    }
    this.setState(prevState => {
      return {
        contacts: [{ name, number, id: nanoid() }, ...prevState.contacts],
      };
    });
  };
  removeName = idx => {
    this.setState(prevState => {
      let newContacts = [];
      prevState.contacts.forEach(contact => {
        if (contact.id !== idx) {
          newContacts.push(contact);
        }
      });
      return { contacts: newContacts };
    });
  };
  handleFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  getVisibleContacts = () => {
    let { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();
    const newArray = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
    return newArray;
  };
  render() {
    const { filter } = this.state;
    return (
      <div className={css.container}>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onSubmit={this.addName} />

        <h2 className={css.subtitle}>Contacts</h2>
        <Filter onChange={this.handleFilter} value={filter} />
        <ContactList
          contacts={this.getVisibleContacts()}
          onRemove={this.removeName}
        />
      </div>
    );
  }
}

export default App;
