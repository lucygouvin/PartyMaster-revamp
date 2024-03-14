import './styles/Header.css';

function Header() {

  return (
    <header className="header">
      <a href='/'> <h1>PartyMaster</h1></a>
      <div className='header-button-group'>
        <button className='button dashboard-button'>Dashboard</button>
        <a href='/create-event'> <button className='button create-button'>Create Event</button></a>
      </div>
    </header>
  );
}

export default Header;
