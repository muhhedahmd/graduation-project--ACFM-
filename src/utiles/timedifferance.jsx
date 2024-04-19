import { Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';

function TimeDisplay({ lastModifiedDate }) {
    const [timeDifference, setTimeDifference] = useState('');

    useEffect(() => {
        // Function to calculate time difference
        function calculateTimeDifference(lastModifiedDate) {
            const currentTime = new Date();
            const modifiedTime = new Date(lastModifiedDate);
            const differenceInSeconds = Math.floor((currentTime - modifiedTime) / 1000);

            if (differenceInSeconds < 60) {
                return `${differenceInSeconds} second${differenceInSeconds !== 1 ? 's' : ''} ago`;
            } else if (differenceInSeconds < 3600) {
                const minutes = Math.floor(differenceInSeconds / 60);
                return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
            } else if (differenceInSeconds < 86400) {
                const hours = Math.floor(differenceInSeconds / 3600);
                return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
            } else {
                const days = Math.floor(differenceInSeconds / 86400);
                return `${days} day${days !== 1 ? 's' : ''} ago`;
            }
        }

        // Initial calculation
        setTimeDifference(calculateTimeDifference(lastModifiedDate));

        // Update time difference every second
        const interval = setInterval(() => {
            setTimeDifference(calculateTimeDifference(lastModifiedDate));
        }, 1000);

        // Cleanup
        return () => clearInterval(interval);
    }, [lastModifiedDate]);

    return (
        <Typography variant="caption" component="p">
           Last Update {timeDifference}
        </Typography>
    );
}

export default TimeDisplay;
