// Import React hooks and necessary libraries, with TypeScript types
"use client"
import React, { useEffect, useState } from 'react';
import { pipeline, TextGenerationOutput, TextGenerationSingle } from '@xenova/transformers';

// Define the component, marking it specifically for client-side execution
function Model() {
    const [inputText, setInputText] = useState<string>('');
    const [generatedText, setGeneratedText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');
    const [isPressed, setIsPressed] = useState(false);


    useEffect(() => {
        window.addEventListener("keypress", function (e) {
            setIsPressed(true)
        })
    })
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInputText(event.target.value);
    };


    const handleOnKeyUp = async (event: React.KeyboardEvent<HTMLInputElement>,) => {
        event.preventDefault();
        if (!inputText.trim()) {
            setError('Please enter some text to generate.');
            return;
        }
        if (isPressed) {
            setError('');
            setIsLoading(true);
            try {
                // Create a text-generation pipeline (client-side fetch)
                const generator = await pipeline('text-generation', 'Xenova/gpt2');
                const response = await generator(inputText);
                console.log('Response:', response);

                const output : TextGenerationSingle = response[0] as TextGenerationSingle; // Adjust based on the actual output structure
                console.log(typeof (output))
                console.log(output.generated_text)
                setGeneratedText(JSON.stringify(output.generated_text));
            } catch (error) {
                console.error('Error generating text:', error);
                setError('Failed to generate text. Please try again.');
            }
            setIsLoading(false);
        }
    };
    

    return (
        <>
            <form>
                <input type="text" value={inputText} onChange={handleInputChange} onKeyUp={handleOnKeyUp} placeholder="Enter text" />
                <button type="submit" disabled={isLoading}>{isLoading ? 'Generating...' : 'Generate'}</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <textarea value={generatedText} readOnly />
        </>
    );
}

export default Model;
