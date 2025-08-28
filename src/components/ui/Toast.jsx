import React from 'react';
import { Toaster } from 'sonner';

const Toast = () => (
    <Toaster 
        position="top-center"
        richColors
        toastOptions={{
            classNames: {
                toast: 'p-4 font-semibold rounded-lg border-2 shadow-lg',
                title: 'text-sm',
                success: 'bg-green-100 dark:bg-green-900/50 border-green-300 dark:border-green-700 text-green-800 dark:text-green-200',
                error: 'bg-red-100 dark:bg-red-900/50 border-red-300 dark:border-red-700 text-red-800 dark:text-red-200',
            },
        }}
    />
);

export default Toast;