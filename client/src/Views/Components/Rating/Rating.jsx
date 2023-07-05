import styles from "./Rating.module.css";

const Rating = (props) => {
    return (
        <div id={styles.container}>
            {
                [... new Array(5)].map((star, index) => {
                    return index < Math.round(props.score) ? <svg width="54px" height="54px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#1e90ff"><path d="M8.587 8.236l2.598-5.232a.911.911 0 011.63 0l2.598 5.232 5.808.844a.902.902 0 01.503 1.542l-4.202 4.07.992 5.75c.127.738-.653 1.3-1.32.952L12 18.678l-5.195 2.716c-.666.349-1.446-.214-1.319-.953l.992-5.75-4.202-4.07a.902.902 0 01.503-1.54l5.808-.845z" stroke="#1e90ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg> 
                    : <svg width="54px" height="54px" stroke-width="2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#1e90ff"><path d="M13.806 5l-.99-1.996a.911.911 0 00-1.631 0l-.496.998M15.011 7.427l.402.809 1.452.211M19.77 8.87l1.451.21a.902.902 0 01.503 1.542l-1.05 1.017M18.572 13.674l-1.05 1.018.248 1.437M18.266 19.004l.248 1.437c.127.739-.653 1.302-1.32.953l-1.298-.679M10.428 19.5L12 18.678l1.299.679M5.671 19.369l-.185 1.072c-.127.739.653 1.302 1.32.953l.847-.443M6.253 16l.225-1.308-.695-.673M3.699 12l-1.423-1.378a.902.902 0 01.503-1.542l1.11-.161M7 8.467l1.587-.231.804-1.618" stroke="#1e90ff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                })
            }
        </div>
    )
}

export default Rating;