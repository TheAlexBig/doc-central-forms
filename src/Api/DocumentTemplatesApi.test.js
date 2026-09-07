import { beforeEach, describe, expect, it, vi } from 'vitest';
import { localRequest } from './LocalApi';
import {
  listDocumentTemplates,
  saveDocumentTemplate,
  resetDocumentTemplate,
} from './DocumentTemplatesApi';

vi.mock('./LocalApi', () => ({ localRequest: vi.fn() }));

describe('document template API', () => {
  beforeEach(() => {
    localRequest.mockReset();
    localRequest.mockResolvedValue({
      json: async () => ({ name: 'contract.txt' }),
    });
  });

  it('keeps identical block names isolated by document type', async () => {
    await saveDocumentTemplate('mutual', 'contract.txt', 'Mutuo :debtor');
    await saveDocumentTemplate('car-sale', 'contract.txt', 'Venta :seller');
    expect(localRequest.mock.calls[0][0]).toBe(
      '/api/v1/templates/mutual/contract.txt'
    );
    expect(JSON.parse(localRequest.mock.calls[0][1].body)).toEqual({
      content: 'Mutuo :debtor',
    });
    expect(localRequest.mock.calls[1][0]).toBe(
      '/api/v1/templates/car-sale/contract.txt'
    );
  });

  it('loads and restores the selected document', async () => {
    await listDocumentTemplates('mutual');
    await resetDocumentTemplate('mutual', 'contract.txt');
    expect(localRequest.mock.calls[0][0]).toBe('/api/v1/templates/mutual');
    expect(localRequest.mock.calls[1].slice(0, 2)).toEqual([
      '/api/v1/templates/mutual/contract.txt/reset',
      { method: 'POST' },
    ]);
  });
});
