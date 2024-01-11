import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Prompt from './prompt'

afterEach(cleanup)

// Sample data for testing
const mockNames = [
    'Eric',
    'Johaness',
    'Stephan',
    'David'
]

describe('asks for your name', () => {
    // Checks if everything is rendering correctly
    it('displays a question asking your name', () => {
        render(<Prompt />);
        const question = screen.getByTestId('name-question')
        expect(question).toBeInTheDocument()
    })
    it('displays a text box to input your name', () => {
        render(<Prompt />);
        const nameInput = screen.getByTestId('name-input')
        expect(nameInput).toBeInTheDocument()
    })
    it('displays a button to submit your name', () => {
        render(<Prompt />);
        const submit = screen.getByTestId('submit-name')
        expect(submit).toBeInTheDocument()
    })

    // Testing form functionality 
    it('displays greeting with name after submit', () => {
        render(<Prompt />)
        const question = screen.getByTestId('name-question')
        const nameInput = screen.getByTestId('name-input')
        const submit = screen.getByTestId('submit-name')

        mockNames.forEach(name => {
            userEvent.type(nameInput, name)
            userEvent.click(submit)
            expect(question).toHaveTextContent('Hello')
            expect(question).toHaveTextContent(name)
        })
    })
})