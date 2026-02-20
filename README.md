````md
# SaadShahid.net v2 — Personal Portfolio Website

This repository contains the source code for my personal portfolio website. It’s built with **Flask + Jinja2** and showcases my projects, certifications, courses, and background, with a functional contact form.

## What this site includes

- **Home / Landing page** with custom UI (gradient background, sidebar menu, social links)
- **Projects** page
- **Certifications** page
- **Courses** page
- **About Me** page
- **Contact** page with a real form workflow:
  - validation (name / email / message)
  - **Google reCAPTCHA**
  - email delivery via **Flask-Mail (SMTP)**

## Notable implementation details

- **Flask routing + Jinja templates** for clean multi-page structure
- **Static asset pipeline** via Flask (`static/`) for CSS/JS/images
- **Reusable layout style** using Jinja blocks (`{% block head %}`, `{% block body %}`)
- **Security-minded form handling** (server-side validation + reCAPTCHA)
- **Production deployment ready** via **Gunicorn** (Procfile included)

## Tech Stack

- **Python / Flask**
- **Jinja2**
- **HTML / CSS / JavaScript**
- **Flask-WTF / WTForms**
- **Flask-Mail**
- **python-dotenv** (environment-based configuration)

## Repository structure

```text
SAADSHAHID.NET-V2/
├─ app.py
├─ formforcontact.py
├─ requirements.txt
├─ Procfile
├─ templates/
│  ├─ index.html
│  ├─ projects.html
│  ├─ certifications.html
│  ├─ courses.html
│  ├─ about.html
│  └─ contact.html
└─ static/
   ├─ css/
   │  └─ styles.css
   ├─ js/
   │  └─ main.js
   └─ images/
      └─ (icons, photos, UI assets)
````

## Site navigation

The main navbar routes to:

* `/` Home
* `/projects` Projects
* `/certifications` Certifications
* `/courses` Courses
* `/about` About Me
* `/contact` Contact

The sidebar includes links to related/adjacent work (e.g., DarjahAI) and placeholders for upcoming subdomains.

## Contact

* Email: `dev@saadshahid.net`
* GitHub: `xxaad0`
* LinkedIn: `saad-shahid-560622217`

