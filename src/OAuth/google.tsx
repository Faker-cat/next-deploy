import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { createClient } from '@supabase/supabase-js';
import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Google(){
  const supabase = createClient('Project URL', 'Project API anon key')

  return (
    <>
      <div className={styles.container}>
      <Head>
        <title>Google認証画面</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className={styles.grid}>
          <Auth
            supabaseClient={supabase}
            appearance={{ theme: ThemeSupa }}
            providers={['google']}
          />
        </div>
      </main>
      <footer className={styles.footer}>
      </footer>
    </div>
    </>
  )
}

