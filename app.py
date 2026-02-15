from flask import Flask, render_template, url_for,request,flash,redirect
from formforcontact import ContactForm
import re,os
from dotenv import load_dotenv
from pathlib import Path
from flask_mail import Mail, Message

load_dotenv(Path(__file__).with_name(".env"))


app= Flask(__name__)
app.secret_key= os.getenv("SECRET_KEY")
app.config["RECAPTCHA_PUBLIC_KEY"] = os.getenv("RECAPTCHA_PUBLIC_KEY")
app.config["RECAPTCHA_PRIVATE_KEY"] = os.getenv("RECAPTCHA_PRIVATE_KEY")

def str_to_bool(x):
    return str(x).lower() in ("1", "true", "yes", "on")

app.config.update(
    MAIL_SERVER=os.getenv("MAIL_SERVER", "smtp.gmail.com"),
    MAIL_PORT=int(os.getenv("MAIL_PORT", "587")),
    MAIL_USE_TLS=str_to_bool(os.getenv("MAIL_USE_TLS", "true")),
    MAIL_USE_SSL=str_to_bool(os.getenv("MAIL_USE_SSL", "false")),
    MAIL_USERNAME=os.getenv("MAIL_USERNAME"),
    MAIL_PASSWORD=os.getenv("MAIL_PASSWORD"),
    MAIL_DEFAULT_SENDER=os.getenv("MAIL_DEFAULT_SENDER", os.getenv("MAIL_USERNAME")),
)

mail = Mail(app)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact", methods = ['GET','POST'])
def contact():
    form = ContactForm()

    if form.validate_on_submit():
        name= form.name.data
        email= form.email.data
        message=form.message.data

        messagetosend= Message(
            subject="Contact Form Submission",
recipients=[app.config["MAIL_USERNAME"]],

            body=f"""
saadshahid.net:
Message sent from {name} --> Email: {email}

Message:
{message}
            """
        )
        mail.send(messagetosend)
        flash("Thank you for submitting the message.")
        return redirect(url_for('contact'))

    if request.method=='POST':
        for field, errors in form.errors.items():
            for error in errors:
                flash(f"{field}: {error}")


    return render_template("contact.html",form=form)


@app.route("/courses")
def courses():
    return render_template("courses.html")

@app.route("/projects")
def projects():
    return render_template("projects.html")


@app.route("/certifications")
def certifications():
    return render_template("certifications.html")

if __name__ == "__main__":
    app.run(debug=True)
