import { useState } from 'react';

const scrollToTop = () =>
  window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

export default function useDocumentWorkflow({
  reviewStep,
  initialStep = 0,
  initialLastStep = 0,
  generating = false,
}) {
  const [activeStep, setActiveStep] = useState(initialStep);
  const [lastStep, setLastStep] = useState(initialLastStep);
  const [returnToReview, setReturnToReview] = useState(false);

  const goTo = (step, { unlock = false, scroll = true } = {}) => {
    if (unlock) setLastStep((current) => Math.max(current, step));
    setActiveStep(step);
    if (scroll) scrollToTop();
  };
  const next = () => {
    const target = returnToReview ? reviewStep : activeStep + 1;
    setReturnToReview(false);
    goTo(target, { unlock: true });
  };
  const back = () => goTo(Math.max(0, activeStep - 1), { scroll: false });
  const selectStep = (step) => {
    if (!generating && step <= lastStep) goTo(step);
  };
  const editStep = (step) => {
    setReturnToReview(true);
    selectStep(step);
  };
  const resetWorkflow = () => {
    setReturnToReview(false);
    setLastStep(0);
    goTo(0);
  };

  return {
    activeStep,
    lastStep,
    returnToReview,
    setActiveStep,
    setLastStep,
    setReturnToReview,
    next,
    back,
    selectStep,
    editStep,
    goTo,
    resetWorkflow,
  };
}
