import { expect } from 'chai';

import { Client } from '@/index';

describe('node-argocd/application', () => {
  it('list', async () => {
    const acdc = new Client();
    const test = await acdc.application.list();
    expect(test).to.be.true;
  });
});
