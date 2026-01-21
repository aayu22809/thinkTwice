import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Simulation from '../Simulation';

const mockScenarioScam = {
    id: 'test_scam',
    type: 'scam',
    isScam: true,
    title: 'Test Scam Scenario',
    initialStep: 'start',
    steps: {
        start: {
            content: { type: 'info', text: 'Start of scam' },
            options: [
                { label: 'Bad Choice', next: 'fail_step', outcome: 'fail' },
                { label: 'Neutral Choice', next: 'neutral_step', outcome: 'neutral' }
            ]
        },
        fail_step: {
            isEnd: true,
            success: false,
            message: 'Failed',
            feedback: 'You failed.'
        },
        neutral_step: {
            content: { type: 'info', text: 'Neutral step' },
            options: []
        }
    }
};

const mockScenarioLegit = {
    id: 'test_legit',
    type: 'legit',
    isScam: false,
    title: 'Test Legit Scenario',
    initialStep: 'start',
    steps: {
        start: {
            content: { type: 'info', text: 'Start of legit' },
            options: [
                { label: 'Good Choice', next: 'success_step', outcome: 'safe' }
            ]
        },
        success_step: {
            isEnd: true,
            success: true,
            message: 'Success',
            feedback: 'You succeeded.'
        }
    }
};

describe('Simulation Component', () => {
    beforeEach(() => {
        vi.useFakeTimers();
        localStorage.clear();
    });

    afterEach(() => {
        vi.useRealTimers();
        localStorage.clear();
    });

    it('renders initial step correctly', () => {
        render(<Simulation scenario={mockScenarioScam} onEnd={() => { }} />);
        expect(screen.getByText('Test Scam Scenario')).toBeInTheDocument();
        expect(screen.getByText('Start of scam')).toBeInTheDocument();
        expect(screen.getByText('Bad Choice')).toBeInTheDocument();
    });

    it('handles branching correctly', () => {
        render(<Simulation scenario={mockScenarioScam} onEnd={() => { }} />);
        fireEvent.click(screen.getByText('Neutral Choice'));
        expect(screen.getByText('Neutral step')).toBeInTheDocument();
    });

    it('triggers failure end state', () => {
        const onEnd = vi.fn();
        render(<Simulation scenario={mockScenarioScam} onEnd={onEnd} />);
        fireEvent.click(screen.getByText('Bad Choice'));
        expect(onEnd).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            message: 'Failed'
        }));
    });

    it('handles Escape on Scam scenario (Win)', () => {
        const onEnd = vi.fn();
        render(<Simulation scenario={mockScenarioScam} onEnd={onEnd} />);
        fireEvent.click(screen.getByText(/Escape now/i));
        expect(onEnd).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            message: 'You correctly identified a scam!'
        }));
    });

    it('handles Escape on Legit scenario (Show Modal)', () => {
        const onEnd = vi.fn();
        render(<Simulation scenario={mockScenarioLegit} onEnd={onEnd} />);
        fireEvent.click(screen.getByText(/Escape now/i));
        // Should show modal, not end immediately
        expect(screen.getByText('Wait!')).toBeInTheDocument();
        expect(onEnd).not.toHaveBeenCalled();

        // Click "Leave Anyway"
        fireEvent.click(screen.getByText('Leave Anyway (Safe)'));
        expect(onEnd).toHaveBeenCalledWith(expect.objectContaining({
            success: true,
            message: 'Safe choice, but this was actually legitimate.'
        }));
    });

    it('shows timeout view when timer expires', () => {
        render(<Simulation scenario={mockScenarioScam} onEnd={() => { }} />);

        // Fast forward time
        act(() => {
            vi.advanceTimersByTime(91000); // 91 seconds
        });

        expect(screen.getByText('TIME UP')).toBeInTheDocument();
    });

    it('handles Retry from timeout', () => {
        render(<Simulation scenario={mockScenarioScam} onEnd={() => { }} />);

        act(() => {
            vi.advanceTimersByTime(91000);
        });

        expect(screen.getByText('TIME UP')).toBeInTheDocument();

        fireEvent.click(screen.getByText('Retry Step'));

        expect(screen.queryByText('TIME UP')).not.toBeInTheDocument();
        expect(screen.getByText('Start of scam')).toBeInTheDocument();
    });
});
