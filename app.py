from flask import Flask, render_template, url_for, request, flash, redirect
from formforcontact import ContactForm

import os
from pathlib import Path

from dotenv import load_dotenv
from flask_mail import Mail, Message


load_dotenv(Path(__file__).with_name(".env"))

app = Flask(__name__)

app.secret_key = os.getenv("SECRET_KEY")

app.config["RECAPTCHA_PUBLIC_KEY"] = os.getenv(
    "RECAPTCHA_PUBLIC_KEY"
)

app.config["RECAPTCHA_PRIVATE_KEY"] = os.getenv(
    "RECAPTCHA_PRIVATE_KEY"
)


def str_to_bool(value):
    return str(value).lower() in (
        "1",
        "true",
        "yes",
        "on"
    )


app.config.update(
    MAIL_SERVER=os.getenv(
        "MAIL_SERVER",
        "smtp.gmail.com"
    ),

    MAIL_PORT=int(
        os.getenv(
            "MAIL_PORT",
            "587"
        )
    ),

    MAIL_USE_TLS=str_to_bool(
        os.getenv(
            "MAIL_USE_TLS",
            "true"
        )
    ),

    MAIL_USE_SSL=str_to_bool(
        os.getenv(
            "MAIL_USE_SSL",
            "false"
        )
    ),

    MAIL_USERNAME=os.getenv(
        "MAIL_USERNAME"
    ),

    MAIL_PASSWORD=os.getenv(
        "MAIL_PASSWORD"
    ),

    MAIL_DEFAULT_SENDER=os.getenv(
        "MAIL_DEFAULT_SENDER",
        os.getenv("MAIL_USERNAME")
    ),
)

mail = Mail(app)


@app.route("/", methods=["GET", "POST"])
def index():

    form = ContactForm()

    if form.validate_on_submit():

        name = form.name.data
        email = form.email.data
        message = form.message.data

        message_to_send = Message(
            subject=f"saadshahid.net Contact Form - {name}",

            recipients=[
                app.config["MAIL_USERNAME"]
            ],

            reply_to=email,

            body=f"""
New message from saadshahid.net

Name: {name}
Email: {email}

Message:
{message}
"""
        )

        try:

            mail.send(message_to_send)

            flash(
                "Message sent successfully. Thank you for reaching out!",
                "success"
            )

        except Exception:

            app.logger.exception(
                "Contact form email failed."
            )

            flash(
                "Your message could not be sent. "
                "Please email me directly at "
                "dev@saadshahid.net.",
                "error"
            )

        return redirect(
            url_for(
                "index",
                _anchor="contact"
            )
        )

    return render_template(
        "index.html",
        form=form
    )


@app.route(
    "/contact",
    methods=["GET", "POST"]
)
def contact():

    if request.method == "GET":

        return redirect(
            url_for(
                "index",
                _anchor="contact"
            )
        )

    form = ContactForm()

    if form.validate_on_submit():

        name = form.name.data
        email = form.email.data
        message = form.message.data

        message_to_send = Message(
            subject=f"saadshahid.net Contact Form - {name}",

            recipients=[
                app.config["MAIL_USERNAME"]
            ],

            reply_to=email,

            body=f"""
New message from saadshahid.net

Name: {name}
Email: {email}

Message:
{message}
"""
        )

        try:

            mail.send(message_to_send)

            flash(
                "Message sent successfully. "
                "Thank you for reaching out!",
                "success"
            )

        except Exception:

            app.logger.exception(
                "Contact form email failed."
            )

            flash(
                "Your message could not be sent. "
                "Please email me directly at "
                "dev@saadshahid.net.",
                "error"
            )

        return redirect(
            url_for(
                "index",
                _anchor="contact"
            )
        )

    return render_template(
        "index.html",
        form=form
    )


@app.route("/about")
def about():
    return render_template(
        "about.html"
    )


@app.route("/courses")
def courses():
    return render_template(
        "courses.html"
    )


@app.route("/projects")
def projects():
    return render_template(
        "projects.html"
    )


@app.route("/certifications")
def certifications():
    return render_template(
        "certifications.html"
    )


if __name__ == "__main__":
    app.run(debug=True)