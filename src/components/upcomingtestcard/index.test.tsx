import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router} from "react-router-dom";
import { describe, it } from "vitest";
import { TestCard } from ".";

describe('Upcoming Test Card', () => {
    describe('On No Props or Children Being Passed', () => {
        beforeEach(() => {
            render(<TestCard/>, { wrapper: Router})
        })
        it('renders a card with `Untitled Test` as title', () => {
            expect(screen.getByText(/Untitled Test/i)).toBeInTheDocument()  
        })
        it('renders a card with `Unspecified` as created_at and author and `No description` as description', () => {
            expect(screen.getAllByText(/Unspecified/i)).toHaveLength(2)
            expect(screen.getByText(/No Description/i)).toBeInTheDocument()
        })
    })
    describe('On Passing sample Mock Test', () => {
        const sample_test = {
            id: 1,
            author: "John Does",
            name: "Sample Mock Test", 
            description: "The Sample Mock Test for Testing",
            created_at: new Date(),
            starts_at: new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 60 * 1000),
            duration: "02:00:00",
        } 
        beforeEach(() => {
            render(<TestCard test={sample_test}/>, { wrapper: Router})
        })
        it('renders a card with the title of the Mock Test', () => {
            expect(screen.getByText(sample_test.name)).toBeInTheDocument()
        })
        it('renders a card also showing description and author of the Mock Test ', () => {
            expect(screen.getByText(sample_test.description)).toBeInTheDocument()
            expect(screen.getByText(sample_test.author)).toBeInTheDocument()
        })
    })
})