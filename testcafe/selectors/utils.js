/* eslint-disable import/prefer-default-export */
import { Selector, t } from 'testcafe';


export const selectOption = async (pdt, content) => {
  const parentDataTest = Selector(`div[data-test="${pdt}"]`);
  const optionEle = Selector('.airwallex-select__option').withText(content);
  await t
    .click(parentDataTest)
    .click(optionEle);
};
