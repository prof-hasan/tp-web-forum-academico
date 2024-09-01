//'use client'

import React from "react";
import styles from "./page.module.css";
//import { useRouter } from "next/navigation";

export default function Home() {
  //const router = useRouter();
  //router.push("/login");

  return (
    <main className={styles.main}>
      <h1>Pagina inicial Forum academico</h1>
    </main>
  );
}
