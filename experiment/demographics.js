// Retrieve and save browser info ========================================================
var demographics_browser_info = {
    type: jsPsychBrowserCheck,
    data: {
        screen: "browser_info",
        date: new Date().toLocaleDateString("fr-FR"),
        time: new Date().toLocaleTimeString("fr-FR"),
    },
    on_finish: function () {
        data = jsPsych.data.get().filter({ screen: "browser_info" }).values()[0]
        jsPsych.data.addProperties({
            ["screen_height"]: data["height"],
            ["screen_width"]: data["width"],
        })
        for (var key in data) {
            if (
                [
                    "vsync_rate",
                    "os",
                    "mobile",
                    "browser",
                    "browser_version",
                ].includes(key)
            ) {
                jsPsych.data.addProperties({
                    [key]: data[key],
                })
            }
        }
        jsPsych.data.addProperties()
    },
}

// Participant ID ========================================================================
var demographics_participant_id = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: "Enter participant ID:",
            placeholder: "001",
            name: "Participant_ID",
        },
    ],
    data: {
        screen: "participant_id",
    },
    on_finish: function () {
        // Store `participant_id` so that it can be reused later
        jsPsych.data.addProperties({
            participant_id: jsPsych.data.get().last().values()[0]["response"][
                "Participant_ID"
            ],
        })
    },
}

// Consent form ========================================================================
var demographics_consent = {
    type: jsPsychHtmlButtonResponse,
    stimulus:
        // Logo
        "<img src='https://u-paris.fr/wp-content/uploads/2022/03/Universite_Paris-Cite-logo.jpeg' width='300px' align='right'/><br><br><br><br><br>" +
        // Title
        "<h1>Informed Consent</h1>" +
        "<p align='left'>In this study, you will be asked to complete [TODO].</p>" +
        "<p align='left'>Your participation in this research will be kept completely confidential. <b>Your responses are entirely anonymous</b>, and no IP address or any identifiers are collected.</p>" +
        "<p align='left'>Your participation contributes to scientific advancement. <b>By participating, you agree to follow the instructions and provide honest answers.</b> If you do not wish to participate this survey, simply close your browser.</p>" +
        // "<p>Please note that various checks will be performed to ensure the validity of the data.<br>We reserve the right to return your participation or prorate reimbursement should we detect non-valid responses (e.g., random pattern of answers, instructions not read, ...).</p>"
        "<p align='left'><br><sub><sup>If you have any questions about the project, please contact [TODO] This project has been reviewed and approved by the Ethics Comitee of the University of [TODO].</sup></sub></p>",

    choices: ["I read and consent"],
    data: { screen: "consent" },
}

// Demographic info ========================================================================
var demographics_multichoice = {
    type: jsPsychSurveyMultiChoice,
    preamble: "<b>Please answer the following questions:</b>",
    questions: [
        {
            prompt: "What is your sex?",
            options: ["Male", "Female"],
            name: "sex",
            required: true,
        },
        // {
        //     prompt: "Are you currently a student?",
        //     options: ["Yes", "No"],
        //     name: "student",
        // },
        // {
        //     prompt: "What is your highest completed education level?",
        //     options: [
        //         "University (doctorate)",
        //         "University (master) <sub><sup>or equivalent</sup></sub>",
        //         "University (bachelor) <sub><sup>or equivalent</sup></sub>",
        //         "High school",
        //         "Other",
        //     ],
        //     name: "education",
        // },
        // {
        //     prompt: "English level",
        //     options: ["native", "fluent", "intermediate", "beginner"],
        //     name: "english",
        // },
    ],
    data: {
        screen: "demographics_1",
    },
}

var demographics_freetext = {
    type: jsPsychSurveyText,
    questions: [
        {
            prompt: "Please enter your age (in years)",
            placeholder: "e.g., '31'",
            name: "age",
        },
        {
            prompt: "Please enter your ethnicity",
            placeholder: "e.g., Caucasian",
            name: "ethnicity",
        },
    ],
    data: {
        screen: "demographics_2",
    },
}

var demographics_info = {
    timeline: [demographics_multichoice, demographics_freetext],
}
