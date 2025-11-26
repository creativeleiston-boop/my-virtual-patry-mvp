// src/pages/index.js
import Head from 'next/head';
import { supabase } from '../lib/supabaseClient';

export default function Home({ orgName, error }) {
  return (
    <>
      <Head>
        <title>My Virtual Pantry — Dashboard</title>
      </Head>

      <main
        style={{
          minHeight: '100vh',
          margin: 0,
          padding: '2rem 1rem',
          background: '#f5fbff',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}
      >
        <section
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            background: '#ffffff',
            borderRadius: '16px',
            padding: '1.75rem 2rem',
            boxShadow: '0 12px 30px rgba(0,0,0,0.06)',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: '1.9rem',
              fontWeight: 700,
              color: '#b0136b',
            }}
          >
            My Virtual Pantry
          </h1>

          <p
            style={{
              margin: '0.35rem 0 1.2rem',
              fontSize: '0.98rem',
              color: '#555',
            }}
          >
            Build OK. Connected to Supabase.
          </p>

          <div
            style={{
              display: 'inline-block',
              padding: '0.45rem 0.9rem',
              borderRadius: '999px',
              background: '#eef7ff',
              fontSize: '0.85rem',
              color: '#24527a',
              marginBottom: '0.9rem',
            }}
          >
            Organisation:{' '}
            <strong>{orgName || '— none found —'}</strong>
          </div>

          {error && (
            <p
              style={{
                marginTop: '0.5rem',
                fontSize: '0.9rem',
                color: '#b00020',
              }}
            >
              Supabase error: {error}
            </p>
          )}

          <hr style={{ margin: '1.4rem 0', borderColor: '#eee' }} />

          <p
            style={{
              margin: 0,
              fontSize: '0.95rem',
              color: '#666',
            }}
          >
            Next, we&apos;ll wire in the <strong>Goods In</strong> screen with barcode
            scanning, price lookup, and FEFO batch handling.
          </p>
        </section>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  try {
    const { data, error } = await supabase
      .from('organisations')
      .select('name')
      .order('name', { ascending: true })
      .limit(1);

    if (error) {
      return { props: { orgName: null, error: error.message } };
    }

    const orgName = data && data.length > 0 ? data[0].name : null;
    return { props: { orgName, error: null } };
  } catch (err) {
    return { props: { orgName: null, error: err.message || 'Unknown error' } };
  }
}
