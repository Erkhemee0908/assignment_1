import List from './list'
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

beforeEach(cleanup)

describe('lists all previous names', () => {
    it('displays menu icon', () => {
        render(<List />)
        const button = screen.getByTestId('list-name-button')
        expect(button).toBeInTheDocument()
        expect(() => screen.getByTestId('name-list')).toThrow('Unable to find an element');

    })
    it('expands to list with names', () => {
        render(<List />)
        const button = screen.getByTestId('list-name-button')
        userEvent.click(button)
        const list = screen.getByTestId('name-list')
        expect(button).toBeInTheDocument()
        expect(list).toBeInTheDocument()

    })
})