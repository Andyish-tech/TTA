import React from 'react';
import Header from './components/Header';
import Welcome from './components/Welcome';
import UserCard from './components/UserCard';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app">
      <Header title="React Page" />
      <Welcome message="👋 Welcome, React Developer!" />
      <UserCard
        name="Andy Ish"
        age={18}
        imageUrl="https://media.licdn.com/dms/image/v2/D4D03AQHqx-9c_u8DZg/profile-displayphoto-shrink_100_100/B4DZZKIGGYHIAY-/0/1745000361125?e=1755734400&v=beta&t=ciil39XqIbG1n59IAhZfj-7nzeRUHxN3jDxpgMb4CUQ"
      />
      <Footer message="© 2025 - All rights reserved. By Andy" />
    </div>
  );
}

export default App;
