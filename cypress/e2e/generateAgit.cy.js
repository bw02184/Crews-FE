describe('template spec', () => {
  it('generateAgit', () => {
    cy.login('123456@gmail.com', 'q1w2e3r4!');
    cy.get('.Navigation_btn_payment__eM1_S > a').click();
    cy.get('#name').clear('c');

    const faker = Math.ceil(Math.random(10) * 100) / 100;
    cy.get('#name').type(`CypressTest${faker}`);
    cy.get('.content > :nth-child(1) > :nth-child(1) > .rt-Box > button').click();
    cy.get('#address').then(($input) => {
      const inputElement = $input[0];
      Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(
        inputElement,
        '서울시 상암동 마포구',
      );
      inputElement.dispatchEvent(new Event('input', { bubbles: true }));
      inputElement.dispatchEvent(new Event('change', { bubbles: true }));
    });

    cy.get('#address')
      .invoke('removeAttr', 'readOnly')
      .then(($input) => {
        const apiResponse = { address: '서울시 상암동 마포구' };
        const formattedAddress = getAddressValue(apiResponse);

        const inputElement = $input[0];
        inputElement.value = formattedAddress;

        inputElement.dispatchEvent(new Event('input', { bubbles: true }));
        inputElement.dispatchEvent(new Event('change', { bubbles: true }));
      });

    cy.get('#address').should('have.value', '서울시 상암동 마포구');
    cy.get('#introduction').type('Cypress테스트 용도 입니다.');
    cy.get('.rt-Flex > :nth-child(4) > label').click();
    cy.get('.deep').click();
    cy.get('.content > :nth-child(1) > :nth-child(1) > .rt-Box > button').click();
    cy.get('.deep').click();
  });
});
