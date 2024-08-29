"use client";
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import Navbar from '../../../components/navbar'
import "../SelectTeam/selectTeamStyles.css"

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) setError(error.message);
    else setMessage('Check your email for the confirmation link!');
  };

  return (
    <body className='container'>
      <Navbar />
      <h1>Create Account</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p style={{ color: 'green' }}>{message}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignUp}>Create Account</button>
    </body>
  );
}
