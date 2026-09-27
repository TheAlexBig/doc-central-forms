import { createDraftStorage } from './DraftStorage';

export const CAR_SALE_AUTOSAVE_KEY = 'central-docs.car-sale-draft.v2';
const storage = createDraftStorage(CAR_SALE_AUTOSAVE_KEY);

export const readCarSaleDraft = storage.read;

export const writeCarSaleDraft = storage.write;

export const clearCarSaleDraft = storage.clear;
