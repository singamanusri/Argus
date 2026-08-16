# Argus

**A hundred eyes. Zero blind spots.**

Argus is a SOC (Security Operations Center) alert triage dashboard that helps analysts quickly investigate security alerts using real threat-intelligence data.

## What it does

1. Displays security alerts, color-coded by severity (critical / medium / low)
2. Lets an analyst click an alert to see full details
3. Automatically checks any IP address involved against [AbuseIPDB](https://www.abuseipdb.com/), a real threat-intelligence database
4. Shows real data: abuse confidence score, number of reports, country, ISP, and whether the IP is a known Tor exit node
5. Lets the analyst mark the alert as **Resolved** or **Escalated**

## Why I built it

SOC analysts spend hours manually checking whether alerts are real threats or false positives. Argus automates the "is this IP dangerous?" step, so analysts can focus on decision-making instead of manual lookups.

## Tech Stack

- **Frontend:** React + Vite, deployed on Vercel
- **Backend:** Vercel Serverless Function (Node.js)
- **Threat Intelligence:** AbuseIPDB API

## Why a backend function?

Threat-intel APIs like AbuseIPDB block direct requests from browsers for security reasons (CORS policy) — and calling the API directly would also expose the secret API key. To solve this, I built a small serverless function that securely calls AbuseIPDB on the server side, keeping the API key hidden and avoiding the CORS restriction entirely.

## Live Demo

[argus-sigma-three.vercel.app](https://argus-sigma-three.vercel.app)

## What's simulated vs real

- The 3 sample alerts are hardcoded for demo purposes (not from a live system)
- The threat-intelligence check on IP addresses is **fully real**, using live data from AbuseIPDB

## Future Improvements

- Connect to a real log source (e.g., Wazuh or ELK) instead of hardcoded alerts
- Support enrichment for more IOC types (domains, file hashes)
- Add authentication for multi-analyst use
