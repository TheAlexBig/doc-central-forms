import { createDraftStorage } from './DraftStorage';

export const MARRIAGE_AUTOSAVE_KEY = 'central-docs.marriage-draft.v2';
const storage = createDraftStorage(MARRIAGE_AUTOSAVE_KEY);

export const readMarriageDraft = storage.read;

export const writeMarriageDraft = storage.write;

export const clearMarriageDraft = storage.clear;
