// Import React hooks and any other necessary libraries
"use client"
import React, { useState, useEffect } from 'react';
import { pipeline } from '@xenova/transformers';

// Define the component, marking it specifically for client-side execution
function Model() {
    const [render, setRender] = useState('');

    useEffect(() => {
        async function generateText() {
            try {
                // Create a text-generation pipeline (client-side fetch)
                const generator = await pipeline('text-generation', 'Xenova/gpt2');

                // Generate text
                const text = 'Hi, can you';
                const response = await generator(text);
                console.log('Response:', response);

                const output = response || response[0]; // Adjust based on the actual output structure
                const results = JSON.stringify(output)
                // Update the component state to render the generated text
                if (output) {
                    setRender(results);
                }
            } catch (error) {
                console.error('Error generating text:', error);
            }
        }

        generateText();
    }, []);

    return (
        
        <textarea value={render} readOnly />
    );
}

export default Model;