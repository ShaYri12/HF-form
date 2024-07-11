import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      appointmentReserved: "Appointment is reserved for",
      error: {
        textError: "Please enter letters only.",
        fillError: "This field cannot be left blank.",
        agreementError: "You must agree to the terms and conditions.",
        selectError: "Please make a selection.",
        emailError: "The email address is not valid.",
        stateError: "Please select your state.",
        poundsError: "Please enter your weight in pounds.",
        feetError: "Please enter your height in feet.",
        inchesError: "Please enter your height in inches.",
        firstNameError: "Please enter your first name.",
        lastNameError: "Please enter your last name.",
        streetAddressError:
          "Please enter your street address (e.g., 123 Main Street).",
        cityError: "Please enter your city (e.g., Los Angeles).",
        zipCodeError: "Please enter your zip code (e.g., 90001).",
        stateMismatchError:
          "State must match the one selected at the beginning of the questionnaire.",
        monthFillError: "Please Enter your birth month",
        dayFillError: "Please Enter your birth day",
        yearFillError: "Please Enter your birth year",
        monthError: "Please enter a valid month (1-12).",
        dateError: "Please enter a valid day (1-31).",
        yearError: "Please enter a valid year (e.g., 1990).",
        ageError:
          "You must be at least 18 years old to participate in the HealthFare weight loss program.",
        phoneFillError: "Please enter your phone number",
        phoneError:
          "Please enter a valid phone number in the format (000) 000-0000.",
        phoneDigitsError: "The phone number must be at least 10 digits.",
        emailRequiredError: "Please enter your email address.",
        emailInvalidError:
          "This is not a valid email address. Please enter a valid email address.",
        smsNotificationError:
          "Please select if you prefer to receive SMS notifications.",
        disqualifyTitle: "UNFORTUNATELY, YOU ARE NOT ELIGIBLE.",
        disqualifyMsg:
          "You do not meet the requirements to be eligible for this program. Please contact us if you need further assistance.",
        currentMedicationsError:
          "Please specify if you are currently taking any medications.",
        medicationAllergiesError:
          "Please indicate if you have any allergies to medications.",
        dietarySupplementsError:
          "Please confirm if you are taking any prescription or over-the-counter diet aids.",
        currentAntibioticsError:
          "Please state if you are currently taking any antibiotics.",
        weightLossMedicationsError:
          "Please mention if you have taken any weight loss medications before.",
        healthConditionsError:
          "Please select at least one health condition. If none, select ‘None’.",
      },
      loading: {
        msg1: "Calculating your BMI...",
        msg2: "Almost there...",
        msg3: "Just a moment…",
        msg4: "Done",
        before: "Before",
        after: "After",
        caption1: "Sara J. lost 30 lbs in 3 months with Semaglutide.",
        caption2: "Jessica M. lost 52 lbs in 3 months with Tirzepatide.",
      },
      testimonial: {
        realStories: "REAL STORIES, REAL RESULTS",
        testimonials: [
          {
            rating: "5",
            source: "Google",
            text: "After struggling with my weight for years, I finally found a solution that works. The Tirzepatide program helped me lose 25 pounds in 9 weeks. The structured approach, combined with the caring and professional support, made it so manageable. I learned to make healthier choices and stay active. Now, I'm living a healthier lifestyle and feeling fantastic. This program exceeded my expectations and gave me the tools I needed to succeed!",
            author: "ALEX",
          },
          {
            rating: "5",
            source: "Facebook",
            text: "I’ve been using semaglutide for 2 months and I’m thrilled to share that I’ve lost 26 pounds or 11kgs! This medication truly surpassed my expectations. From the start, I noticed a significant decrease in my appetite, which made it much easier to control my eating habits. Remarkably, I didn’t experience any side effects. The weight came off steadily, and I feel much healthier and more energetic.",
            author: "Brenda",
          },
        ],
      },
      notEligible: {
        title: "Unfortunately, You Are Not Eligible",
        message:
          "Your BMI is below 27. This program requires a BMI of 27 or higher for participation. Message: Thank you for your interest. Based on your BMI, you do not qualify for this program at this time.",
        backButton: "Home",
      },
      review: {
        excellent: "Excellent",
        reviewsOn: "reviews on",
        basedOn: "Based on",
      },
      stepOne: {
        title: "LET'S GET STARTED!",
        description:
          "Embark on a journey to a healthier, happier you. Get started now and take the first step towards transforming your life.",
        languagePrompt: "What language would you like to start?",
        chooseLocation: "Select Your State:",
        startJourney: "Start Your Journey",
        acknowledgement: "I acknowledge the ",
        refundPolicy: "Refund Policy",
        termsAndConditions: "Terms & Conditions",
        noticeOfPrivacyPractices: "Notice of Privacy Practices",
        and: "and",
        consentToTelehealth: "Consent to Telehealth",
      },
      stepTwo: {
        title: "Which treatment plan suits your needs?",
        description:
          "After completing your digital health visit with one of our licensed physicians, they will review your medical history and clinical information. Based on your selection, they will approve the appropriate treatment plan for you.",
        back: "Back",
        startLosingWeight: "Start Losing Weight",
        month: "Month",
        year: "year",
        totalSavings: "Total Savings",
        cards: [
          {
            title: "Semaglutide GLP-1",
            stock: "limited stock",
            label: "Popular Pick",
            imgSrc: "/assets/med1.svg",
            price: "Starting at just $297 per month",
            titleDesc:
              "Semaglutide the active ingredient in Ozempic® and Wegovy®.",
            type: "5mg / mL Injection",
            descriptions: ["Lose up to 10 pounds per month."],
            features: [
              "Includes Provider and Medication. No hidden costs. No insurance required.",
              "Enhanced with Vitamin B-12 and Glycine.",
            ],
            code: "HF-SEMA",
            star: "5",
            plans: [
              {
                title: "monthly supply",
                code: "1M",
                price: "$297",
                type: "subscription",
              },
              {
                title: "3-month supply",
                code: "3M",
                price: "$279",
                originalPrice: "$297",
                type: "one-time",
              },
            ],
          },
          {
            title: "Tirzepatide Dual GIP/GLP-1",
            label: "Premium Option",
            imgSrc: "/assets/med1.svg",
            stock: "In Stock",
            price: "Starting at just $425 per month",
            titleDesc:
              "Tirzepatide the same active ingredient in Mounjaro® and Zepbound™",
            type: "10mg / mL Injection",
            descriptions: ["Lose up to 16 pounds per month."],
            features: [
              "Includes Provider and Medication. No hidden costs. No insurance required.",
              "Enhanced with Vitamin B-12 and Glycine.",
            ],
            code: "HF-TIRZ",
            star: "5",
            plans: [
              {
                title: "monthly supply",
                code: "1M",
                price: "$425",
              },
              {
                title: "3-month supply",
                code: "3M",
                price: "$399",
                originalPrice: "$425",
              },
            ],
          },
        ],
      },
      planSelection: {
        title: "Your Shipping Frequency",
        description: "How often do you want your treatment to be shipped?",
        oneMonthPlan: "monthly supply",
        threeMonthPlan: "3-month supply",
        note: "Note: The 3-month supply offers a discounted rate of",
        billed: "billed as a one-time payment of",
        continueJourney: "Continue your journey",
        back: "Back",
        month: "per month",
        plans: [
          {
            title: "monthly supply",
            code: "1M",
            price: "$296",
          },
          {
            title: "3-month supply",
            code: "3M",
          },
        ],
      },
      stepThree: {
        title: "Claim Your Free Supplement! (Optional)",
        title2: "Additional Suppliments",
        claimGift: "Claim Gift",
        products: [
          {
            title: "Burn",
            description:
              "Burn is a premium thermogenic fat burner designed to accelerate your metabolism, increase energy levels, and support your weight loss journey. Formulated with potent ingredients, Burn helps you achieve your fitness goals by enhancing fat burning and suppressing appetite. Unlock your body's full potential with Burn and experience a leaner, more energized you.",
            imgSrc: "/assets/burn_supplement.png",
            price: "$0",
            originalPrice: "$90",
            code: "BURN",
          },
        ],
        back: "Back",
        skip: "Skip",
      },
      stepFour: {
        calculateBMI: "Calculate your Body Mass Index (BMI)",
        calculateBMIDescription:
          "This helps us calculate your BMI. BMI is a factor we use to determine your weight care path, so it's important to be as accurate as possible.",
        pounds: "POUNDS",
        poundsPlaceholder: "e.g. 68",
        feet: "FEET",
        feetPlaceholder: "e.g. 5",
        inches: "INCHES",
        inchesPlaceholder: "e.g. 8",
        continueJourney: "Continue your journey",
        back: "Back",
      },
      stepFive: {
        title: "Congratulations! You’re Pre-Qualified!",
        subtitle:
          "Please provide the upcoming information to complete your pre-qualification.",
        continueJourney: "Continue Your Journey",
        back: "Back",
        beforeText: "BEFORE",
        afterText: "AFTER",
        inspiringTransformations: "Inspiring Transformations",
      },
      stepSix: {
        question1: {
          title: "Contact Details",
          firstName: "FIRST NAME",
          lastName: "LAST NAME",
          firstNamePlaceholder: "e.g., John",
          lastNamePlaceholder: "e.g., Doe",
          phone: "Phone",
          phonePlaceholder: "e.g., (123) 456-7890",
          email: "Email",
          emailPlaceholder: "e.g., johndoe@example.com",
          dob: "Date of Birth",
        },
        question2: {
          title: "What’s your shipping address?",
          streetAddress1: "STREET ADDRESS 1",
          streetAddress2: "STREET ADDRESS 2",
          streetAddressPlaceholder: "e.g., 123 Main St",
          city: "CITY",
          cityPlaceholder: "e.g., Los Angeles",
          zipCode: "ZIP CODE",
          zipCodePlaceholder: "e.g., 90001",
          state: "STATE",
          select: "Select...",
          isYour: "is your billing & shipping address are the same?",
        },
        question2point5: {
          title: "What’s your billing address?",
          streetAddress1: "STREET ADDRESS 1",
          streetAddress2: "STREET ADDRESS 2",
          streetAddressPlaceholder: "e.g., 123 Main St",
          city: "CITY",
          cityPlaceholder: "e.g., Los Angeles",
          zipCode: "ZIP CODE",
          zipCodePlaceholder: "e.g., 90001",
          state: "STATE",
          select: "Select...",
        },
        question3: {
          title: "What’s your date of birth?",
          month: "MONTH",
          day: "DAY",
          year: "YEAR",
        },
        question4: {
          title: "What’s your gender?",
          male: "Male",
          female: "Female",
          preferNotToSay: "Prefer not to answer",
        },
        back: "Back",
        continueJourney: "Continue Your Journey",
      },
      stepSeven: {
        yes: "Yes",
        no: "No",
        question1: {
          title: "Current Medications",
          label: "Are you currently taking any medications?",
          placeholder: "If yes, enter here. e.g. Metformin",
        },
        question2: {
          title: "Medication Allergies",
          label: "Do you have any allergies to medications?",
          placeholder: "If yes, enter here. e.g. Penicillin",
        },
        question3: {
          title: "Dietary Supplements",
          label:
            "Are you taking any prescription or over-the-counter diet aids?",
          placeholder: "If yes, enter here. e.g. Gardenia Cambodia, Berberine",
        },
        question4: {
          title: "Current Antibiotics",
          label: "Are you currently taking any antibiotics?",
          placeholder: "If yes, enter here. e.g. Amoxicillin",
        },
        question5: {
          title: "Weight Loss Medications",
          label: "Have you taken any weight loss medications before?",
          placeholder: "If yes, enter here. e.g. Semaglutide, Tirzepatide",
        },
        back: "Back",
        continueJourney: "Continue Your Journey",
      },
      stepEight: {
        title: "Health Conditions",
        description:
          'Please select at least one health condition. If none, select "None".',
        none: "None",
        highBloodPressure: "High Blood Pressure",
        preDiabetes: "Pre-Diabetes",
        type2Diabetes: "Type 2 Diabetes",
        hypothyroidism: "Hypothyroidism",
        crohnsDisease: "Crohn's Disease",
        elevatedTriglycerides: "Elevated Triglycerides",
        lupus: "Lupus",
        antibiotics: "Antibiotics",
        bariatricSurgery: "Bariatric Surgery",
        hypoglycemia: "Hypoglycemia",
        type1Diabetes: "Type 1 Diabetes",
        cancerTreatment: "Cancer Treatment",
        thyroidCancer: "Thyroid Cancer",
        breastfeeding: "Breastfeeding",
        pregnant: "Pregnant",
        pancreatitis:
          "Pancreatitis within the past 6 months, or a history of pancreatitis caused by taking a GLP-1",
        back: "Back",
        continueJourney: "Continue Your Journey",
      },
      stepNine: {
        title: "Stay Informed with SMS Notifications",
        description:
          "Would you like to receive SMS notifications about your program?",
        notify: "Yes, I agree to receive SMS notifications.",
        doNotNotify: "No, I prefer not to receive SMS notifications.",
        back: "Back",
        continueJourney: "Continue Your Journey",
      },
      stepTen: {
        title: "Your Order Summary",
        greeting: "Hi ",
        planDesc: "Review your monthly plan and the included services",
        oneMonthPlan: "monthly supply",
        threeMonthPlan: "3-month supply",
        orderSummary: "Order Summary",
        reviewText: "Review Your Monthly Plan and Included Services",
        totalSavings: "Total Savings",
        perYear: "/year",
        perMonth: "/month*",
        additionalSupplements: "Additional Supplements",
        noSupplementsSelected: "(No additional supplements selected)",
        addSupplements: "Add Supplements",
        whatsIncluded: "What's Included",
        providerEvaluation: "Provider Evaluation",
        medicationAdjustments: "Medication Adjustments",
        onGoingCheckIns: "On-Going Check-Ins",
        nutritionPlan: "Nutrition Plan",
        syringes: "Syringes",
        shipping: "Overnight Shipping",
        totalCost: "TOTAL COST",
        addonSectionTitle:
          "Would you like to add any additional medicines to your order?",
        availableAddon: "Available Add-ons",
        noAddonSelected: "(No Addon Selected)",
        addAddons: "Add Addons",
        addons: [
          {
            title: "Zofran 5mg",
            price: "$69.99",
            imgSrc: "/assets/zofran.jpg",
            description:
              "Enhance your weight loss journey with Zofran by preventing nausea often experienced with Semaglutide and Tirzepatide. Zofran helps you stay on track and potentially lose up to 10 pounds more effectively.",
            code: "HF-ZOFR",
          },
        ],
        noteFirst: "*This Plan requires a",
        noteSecond: "month commitment for effective results.",
        dueToday: "DUE TODAY",
        add: "Add",
        back: "Back",
        proceedToPayment: "Proceed to Payment",
        features: {
          feature1: "5mg/2ml Injection (Same as Ozempic & Wegovy)",
          feature2: "Weekly application - total of 12 applications",
        },
        inCart: "In cart",
        changeFrequency: "Change Frequency",
        shippingAddress: "Shipping Address",
        billingAddress: "Billing Address",
        edit: "Edit",
        save: "Save",
        cancel: "Cancel",
        pay: "PAY",
        yourTotal: "Your total order amount is",
        finalizePay: "Finalize Your Payment",
      },
      stepEleven: {
        title: "Schedule Appointment",
        message: "Click the button below to choose your appointment time.",
        scheduleAppointment: "Schedule Your Appointment",
      },
      stepTwelve: {
        title: "Schedule Your Appointment",
        chooseTime:
          "Please select a time to consult with our licensed provider",
        confirmAppointment: "Confirm Your Appointment",
        cancel: "Cancel",
        confirm: "Confirm",
        days: {
          sunday: "Sunday",
          monday: "Monday",
          tuesday: "Tuesday",
          wednesday: "Wednesday",
          thursday: "Thursday",
          friday: "Friday",
          saturday: "Saturday",
        },
      },
      appointmentConfirm: {
        title: "Appointment Confirmed!",
        confirmationMessage:
          "Thank you for scheduling your appointment! You're taking an exciting step on your weight loss journey. Our team will be in touch soon to provide further details and answer any questions you may have.",
        pending: "You have a pending appointment for",
        at: "at",
        on: "on",
        withNutrition: "with one of our Nutrition Specialists",
        nextSteps: "Next Steps",
        step1: "Complete Intake Forms",
        step2: "Complete Payment",
        step3: "Speak to your Provider",
        continueJourney: "Continue your journey",
        back: "Back",
      },
      thankYou: {
        title: "Thank You for Your Purchase!",
        message:
          "Your payment has been successfully processed, and a confirmation email has been sent to you.",
        appointmentDetails: "Your appointment details:",
        date: "Date",
        time: "Time",
        orderNumber: "Order Number",
        assistanceTitle: "Need Assistance?",
        assistanceMessage:
          "If you have any questions or need further assistance, feel free to reach out to us via WhatsApp or call us at 561-631-5134. You can also email us at help@healthfaregroup.com. We're here to help!",
        whatsappBtn: "Chat with Us on WhatsApp",
        doctorText: {
          title: "Need help? Chat with me",
          support: "Customer Support",
          online: "I'm Online",
        },
      },

      // Add translations for other steps...
    },
  },
  es: {
    translation: {
      appointmentReserved: "A consulta está reservada para",
      appointmentReserved: "La cita está reservada para",
      error: {
        textError: "Por favor, ingrese solo letras.",
        fillError: "Este campo no puede estar vacío.",
        agreementError: "Debes aceptar los términos y condiciones.",
        selectError: "Por favor, haga una selección.",
        emailError: "La dirección de correo electrónico no es válida.",
        stateError: "Por favor, seleccione su estado.",
        poundsError: "Por favor, ingrese su peso en libras.",
        feetError: "Por favor, ingrese su altura en pies.",
        inchesError: "Por favor, ingrese su altura en pulgadas.",
        firstNameError: "Por favor, ingrese su nombre.",
        lastNameError: "Por favor, ingrese su apellido.",
        streetAddressError:
          "Por favor, ingrese su dirección (por ejemplo, 123 Main Street).",
        cityError: "Por favor, ingrese su ciudad (por ejemplo, Los Ángeles).",
        zipCodeError:
          "Por favor, ingrese su código postal (por ejemplo, 90001).",
        stateMismatchError:
          "El estado debe coincidir con el seleccionado al principio del cuestionario.",
        monthFillError: "Por favor, ingrese su mes de nacimiento.",
        dayFillError: "Por favor, ingrese su día de nacimiento.",
        yearFillError: "Por favor, ingrese su año de nacimiento.",
        monthError: "Por favor, ingrese un mes válido (1-12).",
        dateError: "Por favor, ingrese un día válido (1-31).",
        yearError: "Por favor, ingrese un año válido (por ejemplo, 1990).",
        ageError:
          "Debe tener al menos 18 años para participar en el programa de pérdida de peso de HealthFare.",
        phoneFillError: "Por favor, ingrese su número de teléfono.",
        phoneError:
          "Por favor, ingrese un número de teléfono válido en el formato (000) 000-0000.",
        phoneDigitsError:
          "El número de teléfono debe tener al menos 10 dígitos.",
        emailRequiredError:
          "Por favor, ingrese su dirección de correo electrónico.",
        emailInvalidError:
          "Esta no es una dirección de correo electrónico válida. Por favor, ingrese una dirección de correo electrónico válida.",
        smsNotificationError:
          "Por favor, seleccione si prefiere recibir notificaciones por SMS.",
        disqualifyTitle: "LAMENTABLEMENTE, NO ERES ELEGIBLE.",
        disqualifyMsg:
          "No cumple con los requisitos para ser elegible para este programa. Por favor, contáctenos si necesita más ayuda.",
        currentMedicationsError:
          "Por favor, especifique si actualmente está tomando algún medicamento.",
        medicationAllergiesError:
          "Por favor, indique si tiene alguna alergia a medicamentos.",
        dietarySupplementsError:
          "Por favor, confirme si está tomando algún suplemento dietético recetado o de venta libre.",
        currentAntibioticsError:
          "Por favor, indique si actualmente está tomando algún antibiótico.",
        weightLossMedicationsError:
          "Por favor, mencione si ha tomado algún medicamento para la pérdida de peso antes.",
        healthConditionsError:
          "Por favor, seleccione al menos una condición de salud. Si no tiene ninguna, seleccione 'Ninguna'.",
      },
      loading: {
        msg1: "Calculando tu IMC...",
        msg2: "Casi listo...",
        msg3: "Solo un momento...",
        msg4: "Listo",
        before: "Antes",
        after: "Después",
        caption1: "Sara J. perdió 30 lbs en 3 meses con Semaglutida.",
        caption2: "Jessica M. perdió 52 lbs en 3 meses con Tirzepatida.",
      },
      testimonial: {
        realStories: "HISTORIAS REALES, RESULTADOS REALES",
        testimonials: [
          {
            rating: "5",
            source: "Google",
            text: "Después de luchar con mi peso durante años, finalmente encontré una solución que funciona. El programa Tirzepatide me ayudó a perder 25 libras en 9 semanas. El enfoque estructurado, combinado con el apoyo profesional y comprensivo, lo hizo tan manejable. Aprendí a tomar decisiones más saludables y a mantenerme activo. Ahora, estoy viviendo un estilo de vida más saludable y me siento fantástico. ¡Este programa superó mis expectativas y me dio las herramientas que necesitaba para tener éxito!",
            author: "ALEX",
          },
          {
            rating: "5",
            source: "Facebook",
            text: "Llevo 2 meses usando semaglutida y estoy emocionado de compartir que he perdido 26 libras o 11 kg. ¡Este medicamento realmente superó mis expectativas! Desde el principio, noté una disminución significativa en mi apetito, lo que hizo mucho más fácil controlar mis hábitos alimenticios. Afortunadamente, no experimenté ningún efecto secundario. El peso se fue reduciendo de manera constante y me siento mucho más saludable y con más energía.",
            author: "Brenda",
          },
        ],
      },

      notEligible: {
        title: "Lamentablemente, no eres elegible",
        message:
          "Tu IMC es inferior a 27. Este programa requiere un IMC de 27 o superior para participar. Mensaje: Gracias por tu interés. Según tu IMC, actualmente no calificas para este programa.",
        backButton: "Inicio",
      },
      review: {
        excellent: "Excelente",
        reviewsOn: "reseñas en",
        basedOn: "Basado en",
      },
      stepOne: {
        title: "¡VAMOS A EMPEZAR!",
        description:
          "Emprenda un viaje hacia una vida más saludable y feliz. Comience ahora y dé el primer paso hacia la transformación de su vida.",
        languagePrompt: "¿En qué idioma le gustaría comenzar?",
        chooseLocation: "Elija su ubicación",
        startJourney: "Comienza tu viaje",
        acknowledgement: "Reconozco el ",
        refundPolicy: "Política de Reembolso",
        termsAndConditions: "Términos y Condiciones",
        noticeOfPrivacyPractices: "Aviso de Prácticas de Privacidad",
        and: "y",
        consentToTelehealth: "Consentimiento para la Telemedicina",
      },
      stepTwo: {
        title: "¿QUÉ PLAN DE TRATAMIENTO SE ADAPTA A TUS NECESIDADES?",
        description:
          "Después de completar tu consulta de salud digital con uno de nuestros médicos titulados, ellos revisarán tu historial médico y toda la información clínica. Según lo que elijas, ellos aprobarán el plan de tratamiento adecuado para ti.",
        back: "Atrás",
        startLosingWeight: "Comienza a perder peso",
        month: "Mes",
        year: "año",
        totalSavings: "Ahorros totales",
        cards: [
          {
            title: "Semaglutide GLP-1",
            stock: "stock limitado",
            label: "Selección Popular",
            imgSrc: "/assets/med1.svg",
            price: "Desde solo $297 por mes",
            titleDesc:
              "Semaglutida, el ingrediente activo en Ozempic® y Wegovy®.",
            type: "Inyección de 5mg / mL",
            descriptions: ["Pierde hasta 10 libras por mes."],
            features: [
              "Incluye Proveedor y Medicación. Sin costos ocultos. No se requiere seguro.",
              "Mejorado con Vitamina B-12 y Glicina.",
            ],
            code: "HF-SEMA",
            star: "5",
            plans: [
              {
                title: "suministro mensual",
                code: "1M",
                price: "$297",
                type: "suscripción",
              },
              {
                title: "suministro de 3 meses",
                code: "3M",
                price: "$279",
                originalPrice: "$297",
                type: "una vez",
              },
            ],
          },
          {
            title: "Tirzepatide Dual GIP/GLP-1",
            label: "Opción Premium",
            imgSrc: "/assets/med1.svg",
            stock: "En Stock",
            price: "Desde solo $425 por mes",
            titleDesc:
              "Tirzepatida, el mismo ingrediente activo en Mounjaro® y Zepbound™",
            type: "Inyección de 10mg / mL",
            descriptions: ["Pierde hasta 16 libras por mes."],
            features: [
              "Incluye Proveedor y Medicación. Sin costos ocultos. No se requiere seguro.",
              "Mejorado con Vitamina B-12 y Glicina.",
            ],
            code: "HF-TIRZ",
            star: "5",
            plans: [
              {
                title: "suministro mensual",
                code: "1M",
                price: "$425",
              },
              {
                title: "suministro de 3 meses",
                code: "3M",
                price: "$399",
                originalPrice: "$425",
              },
            ],
          },
        ],
      },

      planSelection: {
        title: "Tu Frecuencia de Envío",
        description: "¿Con qué frecuencia deseas que se envíe tu tratamiento?",
        oneMonthPlan: "suministro mensual",
        threeMonthPlan: "suministro de 3 meses",
        note: "Nota: El Plan de 3 meses ofrece una tarifa con descuento de",
        billed: "facturada como un pago único de",
        continueJourney: "Continúa tu viaje",
        back: "Atrás",
        month: "por mes",
        plans: [
          {
            title: "suministro mensual",
            code: "1M",
            price: "$296",
          },
          {
            title: "suministro de 3 meses",
            code: "3M",
          },
        ],
      },

      stepThree: {
        title: "Reclama tu Suplemento Gratis! (Opcional)",
        title2: "Suplementos Adicionales",
        claimGift: "Reclamar Regalo",
        products: [
          {
            title: "Burn",
            description:
              "Burn es un quemador de grasa termogénico premium diseñado para acelerar tu metabolismo, aumentar los niveles de energía y apoyar tu proceso de pérdida de peso. Formulado con ingredientes potentes, Burn te ayuda a alcanzar tus objetivos de fitness al mejorar la quema de grasa y suprimir el apetito. Desbloquea todo el potencial de tu cuerpo con Burn y experimenta una versión más delgada y energizada de ti mismo.",
            imgSrc: "/assets/burn_supplement.png",
            price: "$0",
            originalPrice: "$90",
            code: "BURN",
          },
        ],
        back: "Volver",
        skip: "Omitir",
      },

      stepFour: {
        calculateBMI: "Calcule su Índice de Masa Corporal (IMC)",
        calculateBMIDescription:
          "Esto nos ayuda a calcular su IMC, un factor crucial que utilizamos para determinar su plan de cuidado de peso, por lo que es importante ser lo más preciso posible.",
        pounds: "LIBRAS",
        poundsPlaceholder: "por ejemplo, 68",
        feet: "PIES",
        feetPlaceholder: "por ejemplo, 5",
        inches: "PULGADAS",
        inchesPlaceholder: "por ejemplo, 8",
        continueJourney: "Continuar su viaje",
        back: "Volver",
      },
      stepFive: {
        title: "¡Felicidades! ¡Estás precalificado!",
        subtitle:
          "Proporcione la próxima información para completar su precalificación.",
        continueJourney: "Continuar su viaje",
        back: "Volver",
        beforeText: "ANTES",
        afterText: "DESPUÉS",
        inspiringTransformations: "Transformaciones inspiradoras",
      },
      stepSix: {
        question1: {
          title: "¿Cuál es tu nombre, número de teléfono y correo electrónico?",
          firstName: "NOMBRE",
          lastName: "APELLIDO",
          firstNamePlaceholder: "Por ejemplo, Juan",
          lastNamePlaceholder: "Por ejemplo, Pérez",
          phone: "Teléfono",
          phonePlaceholder: "por ejemplo, (123) 456-7890",
          email: "Correo electrónico",
          emailPlaceholder: "Por ejemplo, juanperez@example.com",
          dob: "Fecha de Nacimiento",
        },
        question2: {
          title: "¿CUÁL ES TU DIRECCIÓN DE ENVÍO?",
          streetAddress1: "DIRECCIÓN DE CALLE",
          streetAddress2: "COMPLEMENTO DE DIRECCIÓN",
          streetAddressPlaceholder: "Por ejemplo, Calle Principal 123",
          city: "CIUDAD",
          cityPlaceholder: "Por ejemplo, Ciudad de Mexico",
          zipCode: "CÓDIGO POSTAL",
          zipCodePlaceholder: "Por ejemplo, 12345",
          state: "ESTADO",
          select: "Seleccionar...",
          isYour: "¿Tu dirección de facturación y envío son la misma?",
        },
        question2point5: {
          title: "¿Cuál es tu dirección de facturación?",
          streetAddress1: "DIRECCIÓN DE CALLE",
          streetAddress2: "COMPLEMENTO DE DIRECCIÓN",
          streetAddressPlaceholder: "Por ejemplo, Calle Principal 123",
          city: "CIUDAD",
          cityPlaceholder: "Por ejemplo, Ciudad de Mexico",
          zipCode: "CÓDIGO POSTAL",
          zipCodePlaceholder: "Por ejemplo, 12345",
          state: "ESTADO",
          select: "Seleccionar...",
        },
        question3: {
          title: "¿Cuál es tu fecha de nacimiento?",
          month: "MES",
          day: "DÍA",
          year: "AÑO",
        },
        question4: {
          title: "¿Cuál es tu género?",
          male: "Masculino",
          female: "Femenino",
          preferNotToSay: "Prefiero no decir",
        },
        back: "Volver",
        continueJourney: "Continuar tu jornada",
      },
      stepSeven: {
        yes: "Sí",
        no: "No",
        question1: {
          title: "Medicamentos Actuales",
          label: "¿Estás tomando actualmente algún medicamento?",
          placeholder: "Si es así, ingrésalo aquí. Ejemplo: Metformina",
        },
        question2: {
          title: "Alergias a Medicamentos",
          label: "¿Tienes alguna alergia a medicamentos?",
          placeholder: "Si es así, ingrésalo aquí. Ejemplo: Penicilina",
        },
        question3: {
          title: "Suplementos Dietéticos",
          label:
            "¿Estás tomando ayudas dietéticas con receta o de venta libre?",
          placeholder:
            "Si es así, ingrésalo aquí. Ejemplo: Gardenia Cambodia, Berberina",
        },
        question4: {
          title: "Antibióticos Actuales",
          label: "¿Estás tomando actualmente algún antibiótico?",
          placeholder: "Si es así, ingrésalo aquí. Ejemplo: Amoxicilina",
        },
        question5: {
          title: "Medicamentos para la Pérdida de Peso",
          label: "¿Has tomado medicamentos para la pérdida de peso antes?",
          placeholder:
            "Si es así, ingrésalo aquí. Ejemplo: Semaglutida, Tirzepatida",
        },
        back: "Volver",
        continueJourney: "Continuar tu viaje",
      },
      stepEight: {
        title: "CONDICIONES DE SALUD",
        description: "Por favor, seleccione al menos una opción.",
        none: "Ninguna",
        highBloodPressure: "Presión Arterial Alta",
        preDiabetes: "Pre-Diabetes",
        type2Diabetes: "Diabetes Tipo 2",
        hypothyroidism: "Hipotiroidismo",
        crohnsDisease: "Enfermedad de Crohn",
        elevatedTriglycerides: "Triglicéridos Elevados",
        lupus: "Lupus",
        antibiotics: "Uso de antibióticos",
        bariatricSurgery: "Cirugía Bariátrica",
        hypoglycemia: "Hipoglucemia",
        type1Diabetes: "Diabetes Tipo 1",
        cancerTreatment: "Tratamiento de Cáncer",
        thyroidCancer: "Cáncer de Tiroides",
        breastfeeding: "Lactancia Materna",
        pregnant: "Embarazo",
        pancreatitis:
          "Pancreatitis en los últimos 6 meses, o historial de pancreatitis causada por la toma de un GLP-1",
        back: "Volver",
        continueJourney: "Continuar su Viaje",
      },
      stepNine: {
        title: "Manténgase Informado con Notificaciones SMS",
        description:
          "¿Le gustaría recibir notificaciones SMS sobre su programa?",
        notify: "Sí, acepto recibir notificaciones SMS.",
        doNotNotify: "No, prefiero no recibir notificaciones SMS.",
        back: "Volver",
        continueJourney: "Continuar su Viaje",
      },
      stepTen: {
        title: "Resumen de tu Pedido",
        greeting: "Hola ",
        planDesc: "Revisa tu plan mensual y los servicios incluidos",
        oneMonthPlan: "suministro mensual",
        threeMonthPlan: "Suministro de 3 meses",
        orderSummary: "Resumen del Pedido",
        reviewText: "Revisa tu Plan Mensual y Servicios Incluidos",
        totalSavings: "Ahorros Totales",
        perYear: "/año",
        perMonth: "/mes*",
        additionalSupplements: "Suplementos Adicionales",
        noSupplementsSelected: "(No se seleccionaron suplementos adicionales)",
        addSupplements: "Agregar Suplementos",
        whatsIncluded: "Qué Está Incluido",
        providerEvaluation: "Evaluación del Proveedor",
        medicationAdjustments: "Ajustes de Medicación",
        onGoingCheckIns: "Revisiones Continuas",
        nutritionPlan: "Plan de Nutrición",
        syringes: "Jeringas",
        shipping: "Envío Urgente",
        totalCost: "COSTO TOTAL",
        addonSectionTitle:
          "¿Te gustaría añadir algún medicamento adicional a tu pedido?",
        availableAddon: "Complementos Disponibles",
        noAddonSelected: "(Ningún Addon Seleccionado)",
        addAddons: "Añadir Addons",
        addons: [
          {
            title: "Zofran 5mg",
            price: "$69.99",
            imgSrc: "/assets/zofran.jpg",
            description:
              "Potencia tu viaje de pérdida de peso con Zofran, previniendo las náuseas frecuentemente experimentadas con Semaglutida y Tirzepatida. Zofran te ayuda a mantener el rumbo y posiblemente a perder hasta 10 libras de manera más efectiva.",
            code: "HF-ZOFR",
          },
        ],

        noteFirst: "*Este Plan requiere un",
        noteSecond: "compromiso mensual para obtener resultados efectivos.",
        dueToday: "A PAGAR HOY",
        add: "Agregar",
        back: "Volver",
        proceedToPayment: "Proceder al Pago",
        features: {
          feature1: "Inyección de 5mg/2ml (Igual que Ozempic y Wegovy)",
          feature2: "Aplicación semanal - un total de 12 aplicaciones",
        },
        inCart: "En el carrito",
        changeFrequency: "Cambiar Frecuencia",
        shippingAddress: "Dirección de Envío",
        billingAddress: "Dirección de Facturación",
        edit: "Editar",
        save: "Guardar",
        cancel: "Cancelar",
        pay: "PAGAR",
        yourTotal: "El total de su pedido es",
        finalizePay: "Finalizar su pago",
      },

      stepEleven: {
        title: "PROGRAMAR CITA",
        message:
          "Haz clic en el botón de abajo para elegir la hora de tu cita.",
        scheduleAppointment: "Programa tu cita",
      },
      stepTwelve: {
        title: "Programa tu cita",
        chooseTime:
          "Por favor, seleccione una hora para consultar con nuestro proveedor licenciado",
        confirmAppointment: "Confirma tu Cita",
        cancel: "Cancelar",
        confirm: "Confirmar",
        days: {
          sunday: "Domingo",
          monday: "Lunes",
          tuesday: "Martes",
          wednesday: "Miércoles",
          thursday: "Jueves",
          friday: "Viernes",
          saturday: "Sábado",
        },
      },
      appointmentConfirm: {
        title: "¡Cita Confirmada!",
        confirmationMessage:
          "¡Gracias por programar tu cita! Estás dando un paso emocionante en tu viaje de pérdida de peso. Nuestro equipo se pondrá en contacto pronto para proporcionarte más detalles y responder cualquier pregunta que puedas tener.",
        pending: "Tienes una cita pendiente para",
        at: "a las",
        on: "el",
        withNutrition: "con uno de nuestros Especialistas en Nutrición",
        nextSteps: "Próximos Pasos",
        step1: "Completar Formularios de Admisión",
        step2: "Completar Pago",
        step3: "Hablar con tu Proveedor",
        continueJourney: "Continúa tu viaje",
        back: "Volver",
      },
      thankYou: {
        title: "¡Gracias por tu compra!",
        message:
          "Tu pago ha sido procesado con éxito y se ha enviado un correo electrónico de confirmación.",
        appointmentDetails: "Los detalles de tu cita son los siguientes:",
        date: "Fecha",
        time: "Hora",
        orderNumber: "Número de Orden",
        assistanceTitle: "¿Necesitas ayuda?",
        assistanceMessage:
          "Si tienes alguna pregunta o necesitas más ayuda, no dudes en contactarnos a través de WhatsApp o llámanos al 561-631-5134. También puedes enviarnos un correo electrónico a help@healthfaregroup.com. ¡Estamos aquí para ayudarte!",
        whatsappBtn: "Chatea con nosotros en WhatsApp",
        doctorText: {
          title: "¿Necesitas ayuda? Chatea conmigo",
          support: "Atención al cliente",
          online: "Estoy en línea",
        },
      },

      // Add translations for other steps...
    },
  },
  pt: {
    translation: {
      appointmentReserved: "A consulta está reservada para",
      error: {
        textError: "Por favor, insira apenas letras.",
        fillError: "Este campo não pode ficar em branco.",
        agreementError: "Você deve concordar com os termos e condições.",
        selectError: "Por favor, faça uma seleção.",
        emailError: "O endereço de e-mail não é válido.",
        stateError: "Por favor, selecione seu estado.",
        poundsError: "Por favor, insira seu peso em libras.",
        feetError: "Por favor, insira sua altura em pés.",
        inchesError: "Por favor, insira sua altura em polegadas.",
        firstNameError: "Por favor, insira seu nome.",
        lastNameError: "Por favor, insira seu sobrenome.",
        streetAddressError:
          "Por favor, insira seu endereço (por exemplo, 123 Main Street).",
        cityError: "Por favor, insira sua cidade (por exemplo, Los Angeles).",
        zipCodeError:
          "Por favor, insira seu código postal (por exemplo, 90001).",
        stateMismatchError:
          "O estado deve coincidir com o selecionado no início do questionário.",
        monthFillError: "Por favor, insira seu mês de nascimento.",
        dayFillError: "Por favor, insira seu dia de nascimento.",
        yearFillError: "Por favor, insira seu ano de nascimento.",
        monthError: "Por favor, insira um mês válido (1-12).",
        dateError: "Por favor, insira um dia válido (1-31).",
        yearError: "Por favor, insira um ano válido (por exemplo, 1990).",
        ageError:
          "Você deve ter pelo menos 18 anos para participar do programa de perda de peso da HealthFare.",
        phoneFillError: "Por favor, insira seu número de telefone.",
        phoneError:
          "Por favor, insira um número de telefone válido no formato (000) 000-0000.",
        phoneDigitsError:
          "O número de telefone deve ter pelo menos 10 dígitos.",
        emailRequiredError: "Por favor, insira seu endereço de e-mail.",
        emailInvalidError:
          "Este não é um endereço de e-mail válido. Por favor, insira um endereço de e-mail válido.",
        smsNotificationError:
          "Por favor, selecione se prefere receber notificações por SMS.",
        disqualifyTitle: "INFELIZMENTE, VOCÊ NÃO É ELEGÍVEL.",
        disqualifyMsg:
          "Você não atende aos requisitos para ser elegível para este programa. Por favor, entre em contato conosco se precisar de mais assistência.",
        currentMedicationsError:
          "Por favor, especifique se você está tomando algum medicamento atualmente.",
        medicationAllergiesError:
          "Por favor, indique se você tem alguma alergia a medicamentos.",
        dietarySupplementsError:
          "Por favor, confirme se você está tomando algum suplemento dietético prescrito ou de venda livre.",
        currentAntibioticsError:
          "Por favor, indique se você está tomando algum antibiótico atualmente.",
        weightLossMedicationsError:
          "Por favor, mencione se você já tomou algum medicamento para perda de peso antes.",
        healthConditionsError:
          "Por favor, selecione pelo menos uma condição de saúde. Se não tiver nenhuma, selecione 'Nenhuma'.",
      },
      loading: {
        msg1: "Calculando seu IMC...",
        msg2: "Quase lá...",
        msg3: "Apenas um momento...",
        msg4: "Concluído",
        before: "Antes",
        after: "Depois",
        caption1: "Sara J. perdeu 30 lbs em 3 meses com Semaglutida.",
        caption2: "Jessica M. perdeu 52 lbs em 3 meses com Tirzepatida.",
      },
      testimonial: {
        realStories: "HISTÓRIAS REAIS, RESULTADOS REAIS",
        testimonials: [
          {
            rating: "5",
            source: "Google",
            text: "Depois de lutar com meu peso por anos, finalmente encontrei uma solução que funciona. O programa Tirzepatide me ajudou a perder 25 libras em 9 semanas. A abordagem estruturada, combinada com o apoio profissional e carinhoso, tornou tudo muito gerenciável. Aprendi a fazer escolhas mais saudáveis e a permanecer ativo. Agora, estou vivendo um estilo de vida mais saudável e me sentindo fantástico. Este programa superou minhas expectativas e me deu as ferramentas que eu precisava para ter sucesso!",
            author: "ALEX",
          },
          {
            rating: "5",
            source: "Facebook",
            text: "Estou usando semaglutida há 2 meses e estou muito feliz em compartilhar que perdi 26 libras ou 11 kg! Este medicamento realmente superou minhas expectativas. Desde o início, notei uma diminuição significativa no meu apetite, o que tornou muito mais fácil controlar meus hábitos alimentares. Felizmente, não tive nenhum efeito colateral. O peso diminuiu gradualmente e me sinto muito mais saudável e com mais energia.",
            author: "Brenda",
          },
        ],
      },

      notEligible: {
        title: "Infelizmente, Você Não é Elegível",
        message:
          "Seu IMC está abaixo de 27. Este programa requer um IMC de 27 ou superior para participação. Mensagem: Obrigado pelo seu interesse. Com base no seu IMC, você não se qualifica para este programa no momento.",
        backButton: "Início",
      },
      review: {
        excellent: "Excelente",
        reviewsOn: "avaliações em",
        basedOn: "Baseado em",
      },
      stepOne: {
        title: "VAMOS COMEÇAR!",
        description:
          "Embarque em uma jornada para uma vida mais saudável e feliz. Comece agora e dê o primeiro passo para transformar sua vida.",
        languagePrompt: "Qual idioma você gostaria de começar?",
        chooseLocation: "Escolha sua localização",
        startJourney: "Comece sua jornada",
        acknowledgement: "Reconheço a ",
        refundPolicy: "Política de Reembolso",
        termsAndConditions: "Termos e Condições",
        noticeOfPrivacyPractices: "Aviso de Práticas de Privacidade",
        and: "e",
        consentToTelehealth: "Consentimento para a Telemedicina",
      },
      stepTwo: {
        title: "QUAL PLANO DE TRATAMENTO ATENDE ÀS SUAS NECESSIDADES?",
        description:
          "Depois de completar sua consulta de saúde digital com um de nossos médicos licenciados, eles revisarão seu histórico médico e informações clínicas. Com base na sua seleção, eles aprovarão o plano de tratamento adequado para você.",
        back: "Voltar",
        startLosingWeight: "Comece a perder peso",
        month: "Mês",
        year: "ano",
        totalSavings: "Economia total",
        cards: [
          {
            title: "Semaglutida GLP-1",
            stock: "estoque limitado",
            label: "Escolha Popular",
            imgSrc: "/assets/med1.svg",
            price: "A partir de apenas $297 por mês",
            titleDesc:
              "Semaglutida, o ingrediente ativo em Ozempic® e Wegovy®.",
            type: "Injeção de 5mg / mL",
            descriptions: ["Perda de até 10 libras por mês."],
            features: [
              "Inclui Provedor e Medicação. Sem custos ocultos. Não é necessário seguro.",
              "Enriquecido com Vitamina B-12 e Glicina.",
            ],
            code: "HF-SEMA",
            star: "5",
            plans: [
              {
                title: "fornecimento mensal",
                code: "1M",
                price: "$297",
                type: "assinatura",
              },
              {
                title: "fornecimento de 3 meses",
                code: "3M",
                price: "$279",
                originalPrice: "$297",
                type: "única vez",
              },
            ],
          },
          {
            title: "Tirzepatida Dual GIP/GLP-1",
            label: "Opção Premium",
            imgSrc: "/assets/med1.svg",
            stock: "Em Estoque",
            price: "A partir de apenas $425 por mês",
            titleDesc:
              "Tirzepatida, o mesmo ingrediente ativo em Mounjaro® e Zepbound™",
            type: "Injeção de 10mg / mL",
            descriptions: ["Perda de até 16 libras por mês."],
            features: [
              "Inclui Provedor e Medicação. Sem custos ocultos. Não é necessário seguro.",
              "Enriquecido com Vitamina B-12 e Glicina.",
            ],
            code: "HF-TIRZ",
            star: "5",
            plans: [
              {
                title: "fornecimento mensal",
                code: "1M",
                price: "$425",
              },
              {
                title: "fornecimento de 3 meses",
                code: "3M",
                price: "$399",
                originalPrice: "$425",
              },
            ],
          },
        ],
      },

      planSelection: {
        title: "Sua Frequência de Envio",
        description:
          "Com que frequência você deseja que seu tratamento seja enviado?",
        oneMonthPlan: "suprimento mensal",
        threeMonthPlan: "suprimento de 3 meses",
        note: "Nota: O fornecimento de 3 meses oferece uma tarifa com desconto de",
        billed: "cobrado como um pagamento único de",
        continueJourney: "Continue sua jornada",
        back: "Voltar",
        month: "por mês",
        plans: [
          {
            title: "suprimento mensal",
            code: "1M",
            price: "$296",
          },
          {
            title: "suprimento de 3 meses",
            code: "3M",
          },
        ],
      },

      stepThree: {
        title: "Solicite seu Suplemento Grátis! (Opcional)",
        claimGift: "Solicitar presente",
        products: [
          {
            title: "Burn",
            description:
              "Burn é um queimador de gordura termogênico premium projetado para acelerar seu metabolismo, aumentar os níveis de energia e apoiar sua jornada de perda de peso. Formulado com ingredientes potentes, Burn ajuda você a alcançar seus objetivos de fitness melhorando a queima de gordura e suprimindo o apetite. Liberte todo o potencial do seu corpo com Burn e experimente uma versão mais magra e energizada de si mesmo.",
            imgSrc: "/assets/burn_supplement.png",
            price: "$0",
            originalPrice: "$90",
            code: "BURN",
          },
        ],
        back: "Voltar",
        skip: "Pular",
      },

      stepFour: {
        calculateBMI: "Calcule seu Índice de Massa Corporal (IMC)",
        calculateBMIDescription:
          "Isso nos ajuda a calcular seu IMC, um fator crucial na determinação do seu plano de cuidado com o peso. É essencial fornecer informações precisas para obter os melhores resultados.",
        pounds: "LIBRAS",
        poundsPlaceholder: "por exemplo, 68",
        feet: "Pés",
        feetPlaceholder: "por exemplo, 5",
        inches: "POLEGADAS",
        inchesPlaceholder: "por exemplo, 8",
        continueJourney: "Continue sua jornada",
        back: "Voltar",
      },
      stepFive: {
        title: "PARABÉNS! VOCÊ FOI PRÉ-QUALIFICADO!",
        subtitle:
          "Forneça as informações a seguir para concluir sua pré-qualificação.",
        continueJourney: "Continuar sua jornada",
        back: "Voltar",
        beforeText: "ANTES",
        afterText: "DEPOIS",
        inspiringTransformations: "Transformações inspiradoras",
      },
      stepSix: {
        question1: {
          title: "INFORMAÇÕES PESSOAIS",
          firstName: "NOME",
          lastName: "SOBRENOME",
          firstNamePlaceholder: "por exemplo, João",
          lastNamePlaceholder: "por exemplo, Silva",
          phone: "Telefone",
          phonePlaceholder: "por exemplo, (11) 98765-4321",
          email: "Email",
          emailPlaceholder: "por exemplo, joaosilva@example.com",
          dob: "Data de Nascimento",
        },
        question2: {
          title: "Qual é o seu endereço de entrega?",
          streetAddress: "ENDEREÇO",
          streetAddressPlaceholder: "por exemplo, Rua Principal 123",
          city: "CIDADE",
          cityPlaceholder: "por exemplo, São Paulo",
          zipCode: "CEP",
          zipCodePlaceholder: "por exemplo, 12345-678",
          state: "ESTADO",
          select: "Selecionar...",
          isYour: "O endereço de cobrança e de entrega são os mesmos?",
        },
        question2point5: {
          title: "Qual é o seu endereço de cobrança?",
          streetAddress1: "NOME DA RUA",
          streetAddress2: "COMPLEMENTO",
          streetAddressPlaceholder: "por exemplo, Rua Principal 123",
          city: "CIDADE",
          cityPlaceholder: "por exemplo, São Paulo",
          zipCode: "CEP",
          zipCodePlaceholder: "por exemplo, 12345-678",
          state: "ESTADO",
          select: "Selecionar...",
        },
        question3: {
          title: "Qual é a sua data de nascimento?",
          month: "MÊS",
          day: "DIA",
          year: "ANO",
        },
        question4: {
          title: "Qual é o seu gênero?",
          male: "Masculino",
          female: "Feminino",
          preferNotToSay: "Prefiro não dizer",
        },
        back: "Voltar",
        continueJourney: "Continuar sua jornada",
      },
      stepSeven: {
        yes: "Sim",
        no: "Não",
        question1: {
          title: "Medicamentos Atuais",
          label: "Você está atualmente tomando algum medicamento?",
          placeholder: "Se sim, informe aqui. Exemplo: Metformina",
        },
        question2: {
          title: "Alergias a Medicamentos",
          label: "Você tem alguma alergia a medicamentos?",
          placeholder: "Se sim, informe aqui. Exemplo: Penicilina",
        },
        question3: {
          title: "Suplementos Dietéticos",
          label:
            "Você está usando auxiliares dietéticos com prescrição ou de venda livre?",
          placeholder:
            "Se sim, informe aqui. Exemplo: Gardenia Cambodia, Berberina",
        },
        question4: {
          title: "Uso de Antibióticos",
          label: "Você está atualmente tomando algum antibiótico?",
          placeholder: "Se sim, informe aqui. Exemplo: Amoxicilina",
        },
        question5: {
          title: "Medicamentos para Perda de Peso",
          label: "Você já tomou algum medicamento para perda de peso antes?",
          placeholder:
            "Se sim, informe aqui. Exemplo: Semaglutida, Tirzepatida",
        },
        back: "Voltar",
        continueJourney: "Continuar sua jornada",
      },
      stepEight: {
        title: "CONDIÇÕES DE SAÚDE",
        description: "Por favor, selecione pelo menos uma das opções.",
        none: "Nenhuma",
        highBloodPressure: "Pressão Alta",
        preDiabetes: "Pré-Diabetes",
        type2Diabetes: "Diabetes Tipo 2",
        hypothyroidism: "Hipotireoidismo",
        crohnsDisease: "Doença de Crohn",
        elevatedTriglycerides: "Triglicerídeos Elevados",
        lupus: "Lúpus",
        antibiotics: "Uso de Antibióticos",
        bariatricSurgery: "Cirurgia Bariátrica",
        hypoglycemia: "Hipoglicemia",
        type1Diabetes: "Diabetes Tipo 1",
        cancerTreatment: "Tratamento de Câncer",
        thyroidCancer: "Câncer de Tireoide",
        breastfeeding: "Amamentação",
        pregnant: "Gravidez",
        pancreatitis:
          "Pancreatite nos últimos 6 meses, ou histórico de pancreatite causada pelo uso de um GLP-1",
        back: "Voltar",
        continueJourney: "Continuar sua Jornada",
      },
      stepNine: {
        title: "Fique Informado com Notificações SMS",
        description:
          "Você gostaria de receber notificações SMS sobre seu programa?",
        notify: "Sim, concordo em receber notificações SMS.",
        doNotNotify: "Não, prefiro não receber notificações SMS.",
        back: "Voltar",
        continueJourney: "Continuar sua Jornada",
      },
      stepTen: {
        title: "Resumo do seu Pedido",
        greeting: "Olá ",
        planDesc: "Revise seu plano mensal e os serviços incluídos",
        oneMonthPlan: "suprimento mensal",
        threeMonthPlan: "Fornecimento de 3 meses",
        orderSummary: "Resumo do Pedido",
        reviewText: "Revise seu Plano Mensal e Serviços Incluídos",
        totalSavings: "Economia Total",
        perYear: "/ano",
        perMonth: "/mês*",
        additionalSupplements: "Suplementos Adicionais",
        noSupplementsSelected: "(Nenhum suplemento adicional selecionado)",
        addSupplements: "Adicionar Suplementos",
        whatsIncluded: "O que Está Incluído",
        providerEvaluation: "Avaliação do Provedor",
        medicationAdjustments: "Ajustes de Medicação",
        onGoingCheckIns: "Acompanhamentos Contínuos",
        nutritionPlan: "Plano de Nutrição",
        syringes: "Seringas",
        shipping: "Envio Expresso",
        totalCost: "CUSTO TOTAL",
        addonSectionTitle:
          "¿Te gustaría añadir algún medicamento adicional a tu pedido?",
        availableAddon: "Complementos Disponíveis",
        noAddonSelected: "(Nenhum Addon Selecionado)",
        addAddons: "Adicionar Addons",
        addons: [
          {
            title: "Zofran 5mg",
            price: "$69.99",
            imgSrc: "/assets/zofran.jpg",
            description:
              "Aprimore sua jornada de perda de peso com Zofran, prevenindo as náuseas frequentemente experimentadas com Semaglutida e Tirzepatida. Zofran ajuda você a manter o foco e potencialmente perder até 10 libras de forma mais eficaz.",
            code: "HF-ZOFR",
          },
        ],

        noteFirst: "*Este Plano requer um",
        noteSecond: "compromisso mensal para obter resultados eficazes.",
        dueToday: "DEVIDO HOJE",
        add: "Adicionar",
        back: "Voltar",
        proceedToPayment: "Prosseguir para Pagamento",
        features: {
          feature1: "Injeção de 5mg/2ml (Igual ao Ozempic & Wegovy)",
          feature2: "Aplicação semanal - total de 12 aplicações",
        },
        inCart: "No carrinho",
        changeFrequency: "Alterar Frequência",
        shippingAddress: "Endereço de Envio",
        billingAddress: "Endereço de Cobrança",
        edit: "Editar",
        save: "Salvar",
        cancel: "Cancelar",
        pay: "PAGAR",
        yourTotal: "O total do seu pedido é",
        finalizePay: "Finalizar seu pagamento",
      },

      stepEleven: {
        title: "Agendar Consulta",
        message:
          "Clique no botão abaixo para escolher o seu horário de consulta.",
        scheduleAppointment: "Agende sua consulta",
      },
      stepTwelve: {
        title: "Agende sua consulta",
        chooseTime:
          "Por favor, selecione um horário para consultar com nosso provedor licenciado",
        confirmAppointment: "Confirme seu Agendamento",
        cancel: "Cancelar",
        confirm: "Confirmar",
        days: {
          sunday: "Domingo",
          monday: "Segunda-feira",
          tuesday: "Terça-feira",
          wednesday: "Quarta-feira",
          thursday: "Quinta-feira",
          friday: "Sexta-feira",
          saturday: "Sábado",
        },
      },
      appointmentConfirm: {
        title: "Consulta Confirmada!",
        confirmationMessage:
          "Obrigado por agendar sua consulta! Você está dando um passo emocionante em sua jornada de perda de peso. Nosso time entrará em contato em breve para fornecer mais detalhes e responder a quaisquer perguntas que você possa ter.",
        pending: "Você tem uma consulta pendente para",
        at: "às",
        on: "no dia",
        withNutrition: "com um dos nossos Especialistas em Nutrição",
        nextSteps: "Próximos Passos",
        step1: "Completar Formulários de Admissão",
        step2: "Completar Pagamento",
        step3: "Falar com seu Provedor",
        continueJourney: "Continue sua jornada",
        back: "Voltar",
      },
      thankYou: {
        title: "Obrigado pela sua compra!",
        message:
          "Seu pagamento foi processado com sucesso e um e-mail de confirmação foi enviado para você.",
        appointmentDetails: "Os detalhes da sua consulta são os seguintes:",
        date: "Data",
        time: "Hora",
        orderNumber: "Número do Pedido",
        assistanceTitle: "Precisa de ajuda?",
        assistanceMessage:
          "Se você tiver alguma dúvida ou precisar de mais assistência, sinta-se à vontade para entrar em contato conosco via WhatsApp ou ligue para 561-631-5134. Você também pode nos enviar um e-mail para help@healthfaregroup.com. Estamos aqui para ajudar!",
        whatsappBtn: "Converse conosco no WhatsApp",
        doctorText: {
          title: "Precisa de ajuda? Converse comigo",
          support: "Atendimento ao cliente",
          online: "Estou online",
        },
      },
      // Adicione traduções para outros passos, se necessário...
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en", // Idioma padrão
  fallbackLng: "en", // Idioma de fallback
  interpolation: {
    escapeValue: false, // React já faz escaping
  },
});

export default i18n;
