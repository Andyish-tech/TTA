import React from 'react';

function Footer({ message }) {
  return (
    <footer style={{ background: 'blueviolet',opacity: '90%', color: '#fff', padding: '15px', textAlign: 'center' }}>
      <p>{message}</p>
    </footer>
  );
}

export default Footer;
