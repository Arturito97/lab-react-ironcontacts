import './App.css';
import React from 'react';
import contacts from './contacts.json';

class App extends React.Component {
  state = {
    contacts: contacts.slice(0, 5)
  }

  randomContact = () => {
    const random = contacts[Math.floor(Math.random() * contacts.length-5)+5]
    const contactsCopy = [...this.state.contacts]
    
   contactsCopy.push(random)
    this.setState({...this.state, contacts: contactsCopy})
  }

  sortedNameContacts = () => {
    const contactsCopy = [...this.state.contacts]
    const oderedName = contactsCopy.sort((a, b) => {
      if(a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) return -1 
      if(a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) return 1 
      return 0
    })
    this.setState({...this.state, contacts: oderedName})

  }

  sortedPopularityContacts = () =>{
    const contactsCopy = [...this.state.contacts]
    const oderedPopularity = contactsCopy.sort((a, b) => {
      if(a.popularity < b.popularity) return -1 
      if(a.popularity > b.popularity) return 1 
      return 0
    })
    this.setState({...this.state, contacts: oderedPopularity})

  }

    deleteContact = (event) => {
      const deleteId = event.target.id
      const contactsCopy = [...this.state.contacts]
    
      const newContacts = contactsCopy.filter((contact)=>{
        return contact.id !== deleteId
    })
      this.setState({contacts: newContacts})
  }



  render() {
    const contactList = this.state.contacts.map((contact, index) => (
      <tr key={index}>
        <td ><img src={contact.pictureUrl} alt={contact.name} className='contactImg'/></td>
        <td>{contact.name}</td>
        <td>{contact.popularity.toFixed(2)}</td>
        <button onClick={this.deleteContact} id={contact.id}>Delete</button>
      </tr>
      ));  

    return (
      <div className="App">
        <div className='Contacts-table'>
        <h1>IronContacts</h1>
        <button onClick={this.randomContact}>Add Random Contact</button>
        <button onClick={this.sortedNameContacts}>Sort by name</button>
        <button onClick={this.sortedPopularityContacts}>Sort by popularity</button>
          <table>
            <tr>
              <th>Picture</th>
              <th>Name</th>
              <th>Popularity</th>
              <th>Action</th>
            </tr>
            {contactList}
          </table>
        </div>
      </div>
    );
  }
}
export default App;
