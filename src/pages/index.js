import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';



export default function Home() {
  const [orgs, setOrgs] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        setError('Missing env vars: set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel.');
        return;
      }
      const { data, error } = await supabase
        .from('organisations')
        .select('id,name,slug')
        .limit(10);
      if (error) setError(error.message);
      else setOrgs(data || []);
    }
    load();
  }, []);

  return (
    <div style={{ fontFamily:'sans-serif', background:'#f6fbff', minHeight:'100vh' }}>
      <main style={{ maxWidth:860, margin:'2rem auto', background:'#fff', borderRadius:16, padding:16, boxShadow:'0 2px 10px rgba(0,0,0,0.05)' }}>
        <h1 style={{ color:'#9C0044' }}>My Virtual Pantry — MVP Starter</h1>

        {error && <p style={{ color:'#b00020' }}>Error: {error}</p>}
        {!error && !orgs && <p>Loading…</p>}
        {!error && orgs && (orgs.length ? (
          <>
            <h3>Organisations</h3>
            <ul>{orgs.map(o => <li key={o.id}>{o.name} <small style={{color:'#666'}}>({o.slug})</small></li>)}</ul>
            <p>Great! Supabase is connected.</p>
          </>
        ) : (
          <p>No organisations yet. If you ran the schema v2, you should see <b>Creative Leiston</b> here.</p>
        ))}

        <hr style={{margin:'1rem 0'}}/>
        <p>Next: we’ll replace this with the full app (Basket, Incoming, Stock Take, Documents).</p>
      </main>
    </div>
  );
}
