import React from 'react';
function UserCard({ name, age, imageUrl }) {
  return (
    <div style={styles.card}>
      <img src={imageUrl} alt={name} style={styles.image} />
      <h2>{name}</h2>
      <p>Age: {age}</p>
    </div>
  );
}

const styles = {
  card: {
    background: '#fff',
    width: '250px',
    marginBottom: '150px ',
    marginLeft: '40%',
    padding: '45px',
    textAlign: 'center',
    border: '1px solid blueviolet',
    borderRadius: '10px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  image: {
    width: '150px',
    height: 'Auto',
    borderRadius: '50%',
    objectFit: 'cover',
    marginBottom: '10px',
  },
};

export default UserCard;
