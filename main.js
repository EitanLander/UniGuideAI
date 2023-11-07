"use strict";

(() => {

    // Register submit event: 
    const gptForm = document.getElementById("gptForm");
    gptForm.addEventListener("submit", async (event) => {
        try {
            event.preventDefault();
            await handleUserRequest();
        } catch (err) {
            console.log(`Please Try Again`);
        }
    });

    // Handle current request: 
    async function handleUserRequest() {
        // Get page elements: 
        const ageBox = document.getElementById("ageBox");
        const q1 = document.getElementById("q1");
        const q2 = document.getElementById("q2");
        const q3 = document.getElementById("q3");
        const q4 = document.getElementById("q4");
        const q5 = document.getElementById("q5");
        const q6 = document.getElementById("q6");
        const q7 = document.getElementById("q7");
        const q8 = document.getElementById("q8");
        const q9 = document.getElementById("q9");
        const q10 = document.getElementById("q10");

        // Extract page values: 
        const age = ageBox.value;
        const question1 = q1.value;
        const question2 = q2.value;
        const question3 = q3.value;
        const question4 = q4.value;
        const question5 = q5.value;
        const question6 = q6.value;
        const question7 = q7.value;
        const question8 = q8.value;
        const question9 = q9.value;
        const question10 = q10.value;

        // Get questions from ChatGPT: 
        const questions = await getChatGptQuestions(age, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10);

        // Display Questions: 
        displayChatGPTData(questions);
    }

    // Get questions from ChatGPT:
    async function getChatGptQuestions(age, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10) {
        const prompt = createPrompt(age, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10);
        const completion = await getCompletion(prompt);
        return JSON.parse(completion);
    }

    // Create prompt:
    function createPrompt(age, question1, question2, question3, question4, question5, question6, question7, question8, question9, question10) {
        const prompt = `I Answer a few questions to get a better idea of what is the best subject: I am ${age} years old, Here is some information about me that will help you understand: What are your passions and hobbies? my answer is ${question1}, Can you identify a specific problem or challenge in the world that you feel strongly about addressing? my answer is ${question2} ,What subjects or activities do you find yourself naturally gravitating towards in your free time? my answer is ${question3}, Are there any books, movies, or documentaries that have left a lasting impact on you? my answer is ${question4}, When you daydream about your future, what kind of career or role do you envision yourself in? my answer is  ${question5}, Do you enjoy working independently or in a team setting? my answer is ${question6}, Are you more drawn to creative and artistic pursuits, or do you prefer analytical and logical challenges? my answer is ${question7}, What subjects did you excel in during high school? my answer is  ${question8}, Is there a particular skill or talent you possess that you would like to further develop through your education? my answer is ${question9}, Have you considered talking to professionals or experts in different fields to gain insights into their experiences and the nature of their work? my answer is ${question10}, Please check them carefully to understand what is the best subject for me to learn. To go to a university/college in Israel, based on the needed jobs and the current state of our country. calculate the questions and your answers and give me 2 subjects with percents and explanation why it fits me the most.
        the answer you answer me have to be in valid JSON format exactly like this without any other words :  [{"s": "subject 1", "p":"percentage of fit %" "e": "explanation 1"}, {"s": "subject 2", "p":"percentage of fit %" "e": "explanation 2"}]`;
        return prompt;
    }

    // Display top two subjects on the page:
function displayChatGPTData(questions) {
    const container = document.getElementById("container");
    let html = "";

    // Assuming 'questions' is an array with two subjects
    for (let i = 0; i < 2; i++) {
        const subject = questions[i];
        html += `
            <p class="subject">Subject ${i + 1}: ${subject['s']}</p>
            <p class="percentage">Percentage: ${subject['p']}</p>
            <p class="explanation">Explanation: ${subject['e']}</p>
        `;
    }

    container.innerHTML = html;
}



    async function getCompletion(prompt) {
        const apiKey = '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'; // Replace with your OpenAI API key
        const url = 'https://api.openai.com/v1/engines/text-davinci-003/completions';

        const requestBody = {
            prompt: prompt,
            max_tokens: 3500, // Completion max tokens
            // temperature: 0.7, // Adjust as per your requirements
        };

        // Fetch options: 
        const options = {
            method: 'POST', // Request method (GET/POST...)
            headers: { // Additional data
                'Content-Type': 'application/json', // Sending the data as JSON.
                'Authorization': `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestBody),
        };

        // Fetch response: 
        const response = await fetch(url, options);

        // Extract data as json: 
        const data = await response.json();

        // Extract completion: 
        const completion = data.choices[0].text;

        // Return completion: 
        return completion;
    }

})();