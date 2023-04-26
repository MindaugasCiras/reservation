import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          auth: {
            login: "Login",
            register: "Register",
            username: "Username",
            password: "Password",
            loginButton: "Log In",
            registerButton: "Register",
            repeatPassword: "Repeat password",
            validation: {
              username: {
                required: "Please input your username!",
                tooShort: "Username too short",
              },
              password: {
                required: "Please input your password!",
                tooShort: "Password too short",
              },
              repeatPassword: {
                required: "Please confirm your password!",
                noMatch: "The two passwords that you entered do not match!",
              },
            },
          },
          navBar: {
            search: "Search",
            reservations: "Reservations",
            rooms: "Rooms",
            users: "Users",
            logout: "Logout",
          },
          search: {
            divider: "Search rooms",
            searchButton: "Search",
          },
          reservations: {
            divider: "Reservations",
            card: {
              user: "User",
              fromDate: "From",
              toDate: "To",
              breakfast: "Breakfast",
              dailyClean: "Daily clean",
              revoke: "Revoke",
              revokeConfirmation: {
                title: "Revoke this reservation",
                description: "Are you sure?",
              },
            },
          },
          rooms: {
            divider: "Rooms",
            createNewButton: "Create new",
          },
          editRoom: {
            divider: "Edit room",
            roomName: "Room name",
            imageUrl: "Image url",
            capacity: "Capacity",
            size: "Size sqm",
            bedCount: "Bed count",
            price: "Price",
            buttonDelete: "Delete",
            buttonUpdate: "Update",
            buttonCreate: "Create",
            validation: {
              nameRequired: "Please input room name!",
              imageRequired: "Please input image url!",
              sizeRequired: "Please input size in square meters!",
              capacityRequired: "Please input room capacity!",
              bedCountRequired: "Please input bed count!",
              priceRequired: "Please input room price!",
              url: "Incorrect url"
            },
            deleteConfirmation: {
              title: "Delete the task",
              description: "Are you sure?",
            },
          },
          bookRoom: {
            divider: "Book room",
            breakfast: "Breakfast included",
            dailyCleaning: "Daily cleaning",
            buttonBookNow: "Book now",
            comment: "Comment",
          },
          createRoom: {
            divider: "Create room"
          },
          users: {
            divider: "Users",
            deletionConfirmation: {
              title: "Delete the user",
              description: "Are you sure?",
            },
          },
          messages: {
            registered: "Registered successfully",
            deleted: "Deleted",
            updated: "Updated",
            revoked: "Revoked",
            error: "An error occurred!",
            created: "Created",
          },
          false: "no",
          true: "yes",
          yes: "Yes",
          no: "No",
        },
      },
      lt: {
        translation: {
          auth: {
            login: "Prisijungimas",
            register: "Registracija",
            username: "Vartotojo vardas",
            password: "Slaptažodis",
            loginButton: "Prisijungti",
            registerButton: "Registruotis",
            repeatPassword: "Pakartokite slaptažodį",
            validation: {
              username: {
                required: "Įveskite vartotojo vardą!",
                tooShort: "Vartotojo vardas per trumpas",
              },
              password: {
                required: "Įveskite slaptažodį!",
                tooShort: "Slaptažodis per trumpas",
              },
              repeatPassword: {
                required: "Patvirtinkite slaptažodį!",
                noMatch: "Slaptažodžiai nesutampa!",
              },
            },
          },
          navBar: {
            search: "Paieška",
            reservations: "Rezervacijos",
            rooms: "Kambariai",
            users: "Vartotojai",
            logout: "Atsijungti",
          },
          search: {
            divider: "Kambarių paieška",
            searchButton: "Ieškoti",
          },
          reservations: {
            divider: "Kambarių rezervacijos",
            card: {
              user: "Vartojas",
              fromDate: "Nuo",
              toDate: "Iki",
              breakfast: "Pusryčiai",
              dailyClean: "Kasdienis valymas",
              revoke: "Atšaukti",
              revokeConfirmation: {
                title: "Rezervacijos atšaukimas",
                description: "Ar tikrai norite atšaukti šią rezervaciją?",
              },
            },
          },
          rooms: {
            divider: "Kambariai",
            createNewButton: "Sukurti naują",
          },
          editRoom: {
            divider: "Redaguoti kambarį",
            roomName: "Kambario pavadinimas",
            imageUrl: "Nuotraukos nuoroda",
            capacity: "Žmonių talpumas",
            size: "Dydis m2",
            bedCount: "Lovų skaičius",
            price: "Kaina",
            buttonDelete: "Pašalinti",
            buttonUpdate: "Redaguoti",
            buttonCreate: "Sukurti",
            validation: {
              nameRequired: "Įveskite kambario pavadinimą!",
              imageRequired: "Įveskite nuotraukos nuorodą!",
              sizeRequired: "Įveskite kambario dydį!",
              capacityRequired: "Įveskite kambario žmonių talpinimą!",
              bedCountRequired: "Įveskite lovų skaičių!",
              priceRequired: "Įveskite kambario kainą nakčiai!",
              url: "Neteisinga nuoroda"
            },
            deleteConfirmation: {
              title: "Ištrinti kambarį",
              description: "Ar jūs tuo tikri?",
            },
          },
          bookRoom: {
            divider: "Kambario rezervacija",
            breakfast: "Reikalingi pusryčiai",
            dailyCleaning: "Kasdienis valymas",
            buttonBookNow: "Rezervuoti",
            comment: "Komentaras",
          },
          createRoom: {
            divider: "Sukurti kambarį"
          },
          users: {
            divider: "Vartotojai",
            deletionConfirmation: {
              title: "Ištrinti vartotoją",
              description: "Ar jūs tuo tikri?",
            },
          },
          messages: {
            registered: "Registracija sekminga",
            deleted: "Ištrinta",
            updated: "Redaguota",
            revoked: "Atšaukta",
            error: "Įvyko klaida!",
            created: "Sukurta",
          },
          false: "ne",
          true: "taip",
          yes: "Taip",
          no: "Ne",
        },
      },
    },
  });

export default i18n;
