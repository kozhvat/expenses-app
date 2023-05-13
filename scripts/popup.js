const POPUP_OPENED_CLASSNAME = 'popup_open';
const POPUP_BODY_FIXED_CLASSNAME = 'popup-body_fixed';

const popupBodyNode = document.querySelector('body');
const popupNode = document.querySelector('[data-find="popup"]');
const popupContentNode = document.querySelector('[data-find="popup__content"]');
const popupBtnOpenNode = document.querySelector(
  '[data-find="button-open-change-limit"]'
);
const popupBtnCloseNode = document.querySelector(
  '[data-find="popup__close-btn"]'
);

//

//

//

//

popup();

popupNode.addEventListener('click', (event) => {
  const isClickOutsideContent = !event
    .composedPath()
    .includes(popupContentNode);

  if (isClickOutsideContent) {
    togglePopup();
  }
  clearLimitInput();
});

function popup() {
  popupBtnOpenNode.addEventListener('click', togglePopup);
  popupBtnCloseNode.addEventListener('click', togglePopup);
}

function togglePopup() {
  popupNode.classList.toggle(POPUP_OPENED_CLASSNAME);
  popupBodyNode.classList.toggle(POPUP_BODY_FIXED_CLASSNAME);
}
