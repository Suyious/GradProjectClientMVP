import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CountDown, COUNTDOWN_DEAD, getTimeRemaining } from ".";

describe('Count-Down Timer', () => {

    describe('On passing NO props', () => {
        beforeEach(() => {
            render(<CountDown/>)
        })
        it('displays a dead timer', () => {
            expect(screen.getByText(COUNTDOWN_DEAD)).toBeInTheDocument()
        })
    })
    describe('On passing a date in the past as prop `to`', () => {
        beforeEach(() => {
            render(<CountDown to={new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000).toISOString()}/>)
        })
        it('displays a dead timer', () => {
            expect(screen.getByText(COUNTDOWN_DEAD)).toBeInTheDocument()
        })
    })
    describe('On passing a date in the future', () => {
        const DATE_FUTURE = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000).toISOString()
        beforeEach(() => {
            render(<CountDown to={DATE_FUTURE}/>)
        })
        it('displays ticking timer', () => {
            expect(screen.getByText(getTimeRemaining(DATE_FUTURE))).toBeInTheDocument()
        })
    })
})