// pages/lead.js
import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

export default function LeadThankYou() {
  const [qs, setQs] = useState(null);

  useEffect(() => {
    // client-only: read query params safely
    const params = new URLSearchParams(window.location.search);
    const obj = {};
    for (const [k, v] of params.entries()) obj[k] = v;
    setQs(obj);
  }, []);

  const service = useMemo(() => {
    if (!qs) return "Renovation";
    return qs.service || qs.s || "Renovation";
  }, [qs]);

  return (
    <>
      <Head>
        <title>Thank You | Unicorn Renovations</title>
        <meta
          name="description"
          content="Thank you. Your request has been received. Unicorn Renovations will contact you shortly."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div style={{ minHeight: "100vh", background: "#f9fafb", padding: "40px 16px" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", background: "#fff", border: "1px solid #e5e5e5", borderRadius: 16, padding: 28 }}>
          <div style={{ fontSize: 44, marginBottom: 10 }}>✅</div>
          <h1 style={{ fontSize: 26, marginBottom: 8 }}>Request Received</h1>
          <p style={{ color: "#555", marginBottom: 18 }}>
            Thanks — our team will contact you shortly regarding <strong>{service}</strong>.
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 12 }}>
            <a
              href="tel:+971585658002"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                borderRadius: 10,
                fontWeight: 800,
                textDecoration: "none",
                border: "2px solid #111",
                color: "#111",
              }}
            >
              📞 Call Now
            </a>

            <a
              href="/"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "12px 16px",
                borderRadius: 10,
                fontWeight: 800,
                textDecoration: "none",
                background: "#d97706",
                color: "#fff",
                border: "2px solid #d97706",
              }}
            >
              ← Back to Home
            </a>
          </div>

          <p style={{ marginTop: 14, fontSize: 12, color: "#777" }}>
            Note: This page is intentionally lightweight for speed and stability.
          </p>
        </div>
      </div>
    </>
  );
}
