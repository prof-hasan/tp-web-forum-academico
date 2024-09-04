'use client'

import React, { use, useEffect } from "react";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    router.push("/login");
  }, []);

  return (
    <main className={styles.main}>
      <h1>Loading...</h1>
    </main>
  );
}
