import { useState, useEffect } from 'react';
import { supabase } from '../src/app/supabaseClient';
import Link from 'next/link';
import styles from '../src/app/page.module.css';

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Fetch the current session using the correct Supabase method
    const getSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();
      if (sessionData?.session) {
        setUser(sessionData.session.user);
      }
    };

    getSession();

    // Listen for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    // Unsubscribe properly on cleanup
    return () => {
      if (authListener?.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          {user ? (
            // Use a span styled as a link for "Sign Out" but trigger the logout function
            <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
              Sign Out
            </span>
          ) : (
            <Link href="/login" className={styles.left}>
              Login
            </Link>
          )}
        </li>

        <li>
          <Link href="/" className={styles.middle}>
            Basedball
          </Link>
        </li>

        {!user && (
          <li>
            <Link href="/create-account" className={styles.right}>
              Create Account
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
