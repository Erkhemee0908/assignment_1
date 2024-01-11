import { useState } from "react"

export default function Prompt(props: any) {


    // useState hook to get user input
    const [name, setName] = useState('')
    const [displayName, setDisplayName] = useState('')

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        // Giving displayName hook the value 
        setDisplayName(name)
        const request = { name }

        // Clearing text field
        setName('')
        try {
            // POST call to server
            const res = await fetch('http://localhost:8080/names', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request)
            })
            if (!res.ok) {
                const message = `An error has occured: ${res.status} - ${res.statusText}`;
                throw new Error(message);
            }
            const result = {
                status: res.status,
            };
            // using props to toggle useState hook to
            // trigger an update in the List component
            props.toggleUpdate()
        } catch (err) {
            console.error(e)
        }
    }
    return (
        <section>
            {
                // if displayName hook is empty it will ask for your name
                // when it recieves a value it will toggle to greeting you
                displayName ?
                    <h2 data-testid="name-question">Hello, {displayName}</h2>
                    :
                    <h2 data-testid="name-question">Hello, what's your name?</h2>
            }
            <form onSubmit={handleSubmit}>
                <input
                    type="name"
                    required
                    data-testid="name-input"
                    maxLength={25}
                    // using useState hook to read the value from text input
                    value={name}
                    onChange={(e) => { setName(e.target.value) }}
                />
                <button
                    data-testid="submit-name"
                >
                    ➡️
                </button>
            </form>
        </section>
    )
}