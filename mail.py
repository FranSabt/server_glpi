from flask_mail import Mail, Message

mail = Mail()

def configure(app):
    mail.init_app(app)

def send_email(to, subject, template):
    msg = Message(
        subject,
        recipients=[to],
        html=template,
        sender='fhernandez@netcomplusve.com'
    )
    mail.send(msg)
