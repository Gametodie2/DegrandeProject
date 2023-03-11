// ============== NOT FOUND PAGE ==============
// Description: 404 page


// === Imports ===

// - Styles
import "./index.scss";

// === Not Found ===
export default function NotFound() {
    return (
        <div className="error">
            <h1>404</h1>
            <p className="nf">Not Found</p>
            <p className="return">Return <a href="/">Home</a></p>
        </div>
    );
}