import { useEffect } from "react";
import { ROUTE_PATHS } from "../Components/Routes/Path";

// Assuming ROUTE_PATHS is imported here

const usePathSuggestions = ({inpVal , setInpVal , LinksState , setLinksState}) => {


    useEffect(() => {
        if (!inpVal) {
            // If input value is empty, set linksState to null to clear suggestions
            setLinksState(()=>null);
            return;
        }

        const filteredLinks = Object.keys(ROUTE_PATHS).filter((item) => {
            // Use regex to match input value against route paths
            const regex = new RegExp(inpVal, "i"); // "i" flag for case-insensitive matching
            return regex.test(ROUTE_PATHS[item]);
        });

        // Set the filtered links as the linksState
        setLinksState(()=>filteredLinks);
    }, [inpVal, setLinksState]);

    // Function to handle when clicking on a suggestion
    const handleSuggestionClick = (suggestion) => {
        // Set the input value to the clicked suggestion
        setInpVal(suggestion);
        // Clear suggestions
        setLinksState(()=>null);
    };

    // Return necessary values and functions as an object
    return {
        input: inpVal,
        setInput: setInpVal,
        suggestions: LinksState,
        handleSuggestionClick
    };
};

export default usePathSuggestions;
