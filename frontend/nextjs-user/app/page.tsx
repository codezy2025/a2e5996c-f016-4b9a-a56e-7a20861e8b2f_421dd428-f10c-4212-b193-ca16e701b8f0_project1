"use client";

import React from "react";

const HomePage = () => {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Welcome Back!</h1>
        <p style={styles.subtitle}>Explore your dashboard, track activities, and manage your profile</p>
      </header>

      <section style={styles.section}>
        <div style={styles.card}>
          <h2 style={styles.cardTitle}>My Profile</h2>
          <p style={styles.cardDesc}>View and update your personal information and settings.</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Activity Feed</h2>
          <p style={styles.cardDesc}>Stay updated with your recent actions and system updates.</p>
        </div>

        <div style={styles.card}>
          <h2 style={styles.cardTitle}>Help & Support</h2>
          <p style={styles.cardDesc}>Need help? Browse FAQs or contact support directly.</p>
        </div>
      </section>

      <footer style={styles.footer}>
        <p>© 2025 User Portal | All rights reserved.</p>
      </footer>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: "2rem",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f9fafc",
    minHeight: "100vh",
  },
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.5rem",
    color: "#2a4365",
    marginBottom: "0.5rem",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#4a5568",
  },
  section: {
    display: "flex",
    justifyContent: "space-around",
    flexWrap: "wrap",
    gap: "1.5rem",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "1.5rem",
    borderRadius: "12px",
    boxShadow: "0 4px 8px rgba(0,0,0,0.06)",
    width: "300px",
    transition: "transform 0.2s ease",
  },
  cardTitle: {
    fontSize: "1.4rem",
    color: "#2d3748",
    marginBottom: "0.5rem",
  },
  cardDesc: {
    fontSize: "1rem",
    color: "#718096",
  },
  footer: {
    marginTop: "3rem",
    textAlign: "center",
    color: "#a0aec0",
    fontSize: "0.9rem",
  },
};

export default HomePage;
