# Registration Setup

Registration setup is done in ***hackportal.config.ts***  
There, you will find a json object that will hold all the registration questions that will displayed in the registration page.

## Default Registration Field object
```
    registrationFields: {
        generalQuestions: [

        ],
        schoolQuestions: [

        ],
        hackathonExperienceQuestions: [

        ],
        eventInfoQuestions: [

        ],
        sponsorInfoQuestions: [

        ],
    }
```
<br/>

## Question Topics
The registrationFields object is separated with 5 question topics: general, school , hackathon experience, event info,  and sponsor info question. Each question topic can include questions of all questions type objects of your choosing. 
<br/>

## Question Types
The config allows for several types of questions: text input, number input, checkbox, dropdown, text area, and datalist.
Question types are represented as arrays of specific questions and are held within an object.

### Sample question types with questions

```
    {
        textInputQuestions: [
            {
                question: 'First Name',
                id: 'firstName',
                name: 'firstName',
                required: true,
                initialValue: '',
            },
            {
                question: 'Last Name',
                id: 'lastName',
                name: 'lastName',
                required: true,
                initialValue: '',
            },
        ],
    },
    {
        numberInputQuestions: [
            {
                question: 'Age',
                required: true,
                id: 'age',
                name: 'age',
                min: '1',
                max: '100',
                pattern: '[0-9]+',
                initialValue: null,
            },
        ],
    }
```

Question type objects will be placed within each question topic array respectively. In each question type, add as many questions as you desire

## Question Types Info
Each question type requires specific data for it to be displayed properly  
<br/>
textInputQuestions
- question: "" //Question that will be displayed to registrant
- id: "" //id of field(value not as important)
- name: "" //string that will be the key in the database (what you see as question label when you view registrant data)
- required: true or false //determines if form requires user to input some answer
- initialValue: "" //initial value displayed before user inputs anything

numberInputQuestions
- question
- required
- id
- name
- min: 'number' //minimum allowed value
- max: 'number' //maximum allowed value
- pattern: '' //regex expression to signify what type of number ('[0-9]+' as default)
- initialValue //set this to null

checkboxQuestions:
- question
- required
- id
- name
- initialValue //array with desired initial values []
- options: 
```
[
    //option 1
    {
        title: "" // Text displayed on screen as option choice
        value: "" //Text that will be saved into database
    },
    //... add other options of same format
]
```

dropdownQuestions:
- question
- required
- id
- name
- initialValue: "" //initial value to be displayed
- options: 
```
[
    //option 1
    {
        title: "" // Text displayed on screen as option choice
        value: "" //Text that will be saved into database
    },
    //... add other options of same format
]
```

textAreaQuestions: 
- question
- id
- name
- required
- initialValue
- placeholder: "" //placeholder text when nothing is entered

datalist:
- question
- id
- name
- required
- datalist: "" //name of list to pull from
- initialValue

*Datalist require more code change within ***register.tsx***  
**Two datalists are given and already computed for you, just add under any question topic
```
    {
        datalistQuestions: [
            {
                question:
                'Which university do you attend?',
                id: 'university',
                name: 'university',
                required: true,
                datalist: 'schools',
                initialValue: '',
            },
            {
                question: 'What is your major?',
                id: 'major',
                name: 'major',
                required: true,
                datalist: 'majors',
                initialValue: '',
            },
        ],
    }
```

## Sample of Registration Field Object with questions
```
    registrationFields: {
        generalQuestions: [
            {
                textInputQuestions: [
                    {
                        question: 'First Name',
                        id: 'firstName',
                        name: 'firstName',
                        required: true,
                        initialValue: '',
                    },
                    {
                        question: 'Last Name',
                        id: 'lastName',
                        name: 'lastName',
                        required: true,
                        initialValue: '',
                    },
                    //... add more questions
                ],
            },
            //... add more question types
        ],
        schoolQuestions: [
            // ... add question types with questions
        ],
        hackathonExperienceQuestions: [
            {
                numberInputQuestions: [
                    {
                        question: 'How many hackathons have you attended before?',
                        required: true,
                        id: 'hackathonExperience',
                        name: 'hackathonExperience',
                        min: '0',
                        max: '100',
                        pattern: '[0-9]+',
                        initialValue: null,
                    },
                ],
            },
            {
                dropdownQuestions: [
                    {
                        question: 'Relative software-building experience:',
                        required: true,
                        id: 'softwareExperience',
                        name: 'softwareExperience',
                        initialValue: '',
                        options: [
                            {
                                title: 'Beginner',
                                value: 'Beginner',
                            },
                            {
                                title: 'Intermediate',
                                value: 'Intermediate',
                            },
                        ],
                    },
                ],
            },
        ],
        eventInfoQuestions: [
            // ... add question types with questions
        ],
        sponsorInfoQuestions: [
            // ... add question types with questions
        ],
    }