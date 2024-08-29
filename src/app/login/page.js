"use client";
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useRouter } from 'next/navigation';
import Navbar from '../../../components/navbar';
import "../SelectTeam/selectTeamStyles.css"

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      // Redirect to home page after successful login
      router.push('/');
    }
  };

  return (
    <body className='container'>
      <Navbar />
      <h1>Login</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
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
      <button onClick={handleLogin}>Login</button>
    </body>
  );
}