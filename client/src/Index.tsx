import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = createRoot(document.getElementById('root')!);

if (!root) {
    console.error("Root element not found!");
} else {
    root.render(<App />);
}
