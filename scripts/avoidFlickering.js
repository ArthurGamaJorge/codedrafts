darkMode = localStorage.getItem("dark-mode"); 

if (darkMode === "disabled") {
    document.documentElement.style.setProperty('--light-shades', '#e8e8e8');
        document.documentElement.style.setProperty('--light-accent', '#e6b4b4');
        document.documentElement.style.setProperty('--dark-accent', '#360303');  
        document.documentElement.style.setProperty('--dark-shades', '#212121');
        document.documentElement.style.setProperty('--shades-contrast', '#292929');
} else {
    document.documentElement.style.setProperty('--light-shades', '#212121');
    document.documentElement.style.setProperty('--light-accent', '#360303');
    document.documentElement.style.setProperty('--dark-accent', '#e6b4b4');  
    document.documentElement.style.setProperty('--dark-shades', '#e8e8e8');
    document.documentElement.style.setProperty('--shades-contrast', '#d8d8d8');
}