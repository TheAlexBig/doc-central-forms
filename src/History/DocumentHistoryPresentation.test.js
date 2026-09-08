import { describe, expect, it } from 'vitest';
import { presentDocumentHistory } from './DocumentHistoryPresentation';

describe('document history presentation', () => {
  it('presents and indexes a mutual agreement', () => {
    const presentation = presentDocumentHistory({
      type: 'mutual',
      title: 'Mutuo - Luis Acreedor / Ana Deudora',
      buyerName: 'Ana Deudora',
      sellerName: 'Luis Acreedor',
      draft: {
        debtor: { nombre: 'Ana', apellido: 'Deudora', documento: '00000000-1' },
        creditor: {
          nombre: 'Luis',
          apellido: 'Acreedor',
          documento: '00000000-2',
        },
        terms: { amount: '750', paymentBank: 'Banco Prueba' },
        agent: { nombres: 'Nora', apellidos: 'Notaria' },
        preparer: { nombres: 'Pedro', apellidos: 'Asistente' },
      },
    });

    expect(presentation.parties).toBe('Ana Deudora / Luis Acreedor');
    expect(presentation.responsible.notary).toBe('Nora Notaria');
    expect(presentation.searchableText).toContain('banco prueba');
  });

  it('presents and indexes a marriage', () => {
    const presentation = presentDocumentHistory({
      type: 'marriage',
      draft: {
        partyOne: { nombre: 'Ana', apellido: 'López', documento: '1' },
        partyTwo: { nombre: 'Luis', apellido: 'Pérez', documento: '2' },
        agent: { nombres: 'Nora', apellidos: 'Notaria' },
        preparer: { nombres: 'Pedro', apellidos: 'Asistente' },
      },
    });

    expect(presentation.title).toBe('Matrimonio - Ana López / Luis Pérez');
    expect(presentation.parties).toBe('Ana López / Luis Pérez');
    expect(presentation.responsible.notary).toBe('Nora Notaria');
    expect(presentation.searchableText).toContain('ana lópez');
  });
});
