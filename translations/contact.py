def get_contact_translations(lang: str):
    contact_translations = {
        "en": {
            "contacts_nav_title": "CONTACTS",
            "home_link_text": "Home",
            "central_office_title": "CENTRAL OFFICE",
            "office_address": "Chisinau, str. Ion Creanga 13",
            "phone_label": "Phone:",
            "phone_number_1": "+37360123456",
            "phone_number_2": "+37360654321",
            "email_label": "E-mail:",
            "email_address": "RentCarsMD@gmail.com",
            "working_hours": "Working hours: 24/24",
            "name_placeholder": "Name/Surname",
            "phone_placeholder": "Phone",
            "email_placeholder": "Insert Email",
            "message_placeholder": "Insert the message",
            "submit_button": "Submit",
            "submit_button_text": "Expediază"
        },
        "ro": {
            "contacts_nav_title": "CONTACTE",
            "home_link_text": "Acasă",
            "central_office_title": "OFICIUL CENTRAL",
            "office_address": "Chișinău, str. Ion Creangă 13",
            "phone_label": "Telefon:",
            "phone_number_1": "+37360123456",
            "phone_number_2": "+37360654321",
            "email_label": "E-mail:",
            "email_address": "RentCarsMD@gmail.com",
            "working_hours": "Program de lucru: 24/24",
            "name_placeholder": "Nume/Prenume",
            "phone_placeholder": "Telefon",
            "email_placeholder": "Introduceți e-mailul",
            "message_placeholder": "Introduceți mesajul",
            "submit_button": "Trimite",
            "submit_button_text": "Expediază"
        },
        "ru": {
            "contacts_nav_title": "КОНТАКТЫ",
            "home_link_text": "Главная",
            "central_office_title": "ЦЕНТРАЛЬНЫЙ ОФИС",
            "office_address": "Кишинёв, ул. Ион Крянгэ 13",
            "phone_label": "Телефон:",
            "phone_number_1": "+37360123456",
            "phone_number_2": "+37360654321",
            "email_label": "E-mail:",
            "email_address": "RentCarsMD@gmail.com",
            "working_hours": "Часы работы: 24/24",
            "name_placeholder": "Имя/Фамилия",
            "phone_placeholder": "Телефон",
            "email_placeholder": "Введите email",
            "message_placeholder": "Введите сообщение",
            "submit_button": "Отправить",
            "submit_button_text": "Отправить"
        }
    }
    return contact_translations.get(lang)