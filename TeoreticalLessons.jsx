/*
    UseEffect Dependency Array Rules:
    
    1. Every state variable, prop, and context value used inside the effect must 
        be included in the dependency array.
    
    2. All "reactive" values should be included. That means any function or variable
        that reference any other reactive value.
    
    3. Dependencies choose themselves: Never ignore the exhaustive-deps ESLint warning.

    4. Do not use object or arrays as dependecies (objects are recreated on each render,
        and React sees new objects as different, {} !== {}).
*/
