let keys = document.getElementsByClassName('key');
let keyboard = document.getElementsByClassName('keyboard')[0];
let capslock = document.getElementsByClassName('capslock_key')[0];
let shift = document.getElementsByClassName('shift_key');
let textarea = document.getElementsByTagName('textarea')[0];
let bottom_key = document.getElementsByClassName('bottom_key');
let space = document.getElementsByClassName('space_key')[0];
let tab = document.getElementsByClassName('tab_key')[0];
let backspace = document.getElementsByClassName('backspace_key')[0];
let enter_key = document.getElementsByClassName('enter_key')[0];
let spec_keys = document.getElementsByClassName('spec_key');

for (let i = 0; i < keys.length; i++) {
  keys[i].dataset.key = `Key${keys[i].innerText.toUpperCase()}`;
}
for (let i = 0; i < spec_keys.length; i++) {
  spec_keys[i].children[1].style.color = 'white';
  spec_keys[i].style['background-color'] = '#682ae9';
}

keyboard.addEventListener('mousedown', (event) => {
  let target = event.target;
  event.preventDefault();
  if (target.tagName == 'SPAN') {
    target.parentNode.classList.add('active');
    
    if (
      capslock.classList.contains('active') ||
      (shift[0].classList.contains('active') &&
        shift[1].classList.contains('active'))
    ) {
      textarea.value += target.parentNode.innerText[0];
    } else {
      textarea.value += target.parentNode.innerText[2];
    }
  } else if (target.classList.contains('space_key')) {
    textarea.value += ' ';
    target.classList.add('active');
  } else if (
    target.classList.contains('key') &&
    !target.classList.contains('spec_key') &&
    target.dataset.key !== 'KeyCAPSLOCK' &&
    target.dataset.key !== 'KeySHIFT' &&
    target.dataset.key !== 'KeyCTRL' &&
    target.dataset.key !== 'KeyALT' &&
    target.dataset.key !== 'KeyWIN' &&
    target.dataset.key !== 'KeyFN' &&
    target.dataset.key !== 'KeyENTER' &&
    target.dataset.key !== 'KeyBACKSPACE' &&
    target.dataset.key !== 'KeyTAB'
  ) {
    target.classList.add('active');

    if (
      capslock.classList.contains('active') ||
      (shift[0].classList.contains('active') &&
        shift[1].classList.contains('active'))
    ) {
      textarea.value += target.innerText.toUpperCase();
    } else {
      textarea.value += target.innerText.toLowerCase();
    }
  } else if (target.dataset.key === 'KeyBACKSPACE') {
    target.classList.add('active');
    textarea.value = textarea.value.slice(0, -1);
  }
   else if (target.dataset.key === 'KeyENTER') {
    target.classList.add('active');
    textarea.value += '\r\n'
  }
});

keyboard.addEventListener('mouseup', (event) => {
  event.preventDefault();
  let target = event.target;
  if (target.tagName == 'SPAN') {
    target.parentNode.classList.remove('active');
  } else if (
    target.classList.contains('key') &&
    target.dataset.key !== 'KeyCAPSLOCK' &&
    target.dataset.key !== 'KeySHIFT' &&
    target.dataset.key !== 'KeyCTRL' &&
    target.dataset.key !== 'KeyALT' &&
    target.dataset.key !== 'KeyWIN' &&
    target.dataset.key !== 'KeyFN' &&
    target.dataset.key !== 'KeyENTER' &&
    target.dataset.key !== 'KeyBACKSPACE' &&
    target.dataset.key !== 'KeyTAB'
  ) {
    target.classList.remove('active');
  } else if (target.dataset.key === 'KeyBACKSPACE') {
    target.classList.remove('active');
  } else if (target.dataset.key === 'KeyENTER') {
    target.classList.remove('active');
  }
});

keyboard.addEventListener('click', (event) => {
  let target = event.target;

  if (target.dataset.key == 'KeyCAPSLOCK' || target.dataset.key == 'KeySHIFT') {
    if (target.dataset.key == 'KeyCAPSLOCK') {
      capslock.classList.toggle('active');
    } else {
      shift[0].classList.toggle('active');
      shift[1].classList.toggle('active');
    }

    for (let i = 0; i < keys.length; i++) {
      if (
        (shift[0].classList.contains('active') ||
          shift[1].classList.contains('active') ||
          capslock.classList.contains('active')) &&
        keys[i].dataset.key !== 'KeySHIFT' &&
        keys[i].dataset.key !== 'KeyCAPSLOCK' &&
        keys[i].dataset.key !== 'KeyCTRL' &&
        keys[i].dataset.key !== 'KeyALT' &&
        keys[i].dataset.key !== 'KeyWIN' &&
        keys[i].dataset.key !== 'KeyFN' &&
        keys[i].dataset.key !== 'KeyENTER' &&
        keys[i].dataset.key !== 'KeyBACKSPACE' &&
        keys[i].dataset.key !== 'KeyTAB'
      ) {
        keys[i].style['text-transform'] = 'uppercase';
        if (keys[i].classList.contains('spec_key')) {
          keys[i].children[1].style.color = 'black';
          keys[i].children[0].style.color = 'white';
        }
      } else {
        keys[i].style['text-transform'] = 'none';
        if (keys[i].classList.contains('spec_key')) {
          keys[i].children[0].style.color = 'black';
          keys[i].children[1].style.color = 'white';
        }
      }
    }
  }
});

window.addEventListener('keydown', (event) => {
  for (let i = 0; i < keys.length; i++) {
    if (event.code === keys[i].dataset.key) {
      keys[i].classList.add('active');
    }
  }
  for (let i = 0; i < spec_keys.length; i++) {
    if (event.code === spec_keys[i].dataset.code) {
      spec_keys[i].classList.add('clicked');
    }
  }

  switch (event.code) {
    case 'Tab':
      tab.classList.add('active');
      break;
    case 'Backspace':
      backspace.classList.add('active');
      break;
    case 'Enter':
      enter_key.classList.add('active');
      break;
    case 'CapsLock':
      capslock.classList.toggle('active');
      for (let i = 0; i < keys.length; i++) {
        if (
          keys[i].dataset.key !== 'KeySHIFT' &&
          keys[i].dataset.key !== 'KeyCAPSLOCK' &&
          keys[i].dataset.key !== 'KeyCTRL' &&
          keys[i].dataset.key !== 'KeyALT' &&
          keys[i].dataset.key !== 'KeyWIN' &&
          keys[i].dataset.key !== 'KeyFN' &&
          keys[i].dataset.key !== 'KeyENTER' &&
          keys[i].dataset.key !== 'KeyBACKSPACE' &&
          keys[i].dataset.key !== 'KeyTAB'
        ) {
          keys[i].style['text-transform'] = 'uppercase';
        }
      }
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      shift[0].classList.add('active');
      shift[1].classList.add('active');

      for (let i = 0; i < keys.length; i++) {
        if (
          keys[i].dataset.key !== 'KeySHIFT' &&
          keys[i].dataset.key !== 'KeyCAPSLOCK' &&
          keys[i].dataset.key !== 'KeyCTRL' &&
          keys[i].dataset.key !== 'KeyALT' &&
          keys[i].dataset.key !== 'KeyWIN' &&
          keys[i].dataset.key !== 'KeyFN' &&
          keys[i].dataset.key !== 'KeyENTER' &&
          keys[i].dataset.key !== 'KeyBACKSPACE' &&
          keys[i].dataset.key !== 'KeyTAB'
        ) {
          keys[i].style['text-transform'] = 'uppercase';
        }
      }

      for (let i = 0; i < spec_keys.length; i++) {
        spec_keys[i].children[0].style.color = 'white';
        spec_keys[i].children[1].style.color = 'black';
      }
      break;
    case 'ControlLeft':
      bottom_key[0].classList.add('active');
      break;
    case 'ControlRight':
      bottom_key[6].classList.add('active');
      break;
    case 'MetaLeft':
    case 'MetaRight':
      bottom_key[1].classList.add('active');
      bottom_key[4].classList.add('active');
      break;
    case 'AltLeft':
      bottom_key[2].classList.add('active');
      break;
    case 'AltRight':
      bottom_key[3].classList.add('active');
      break;
    case 'ContextMenu':
      bottom_key[5].classList.add('active');
      break;
    case 'Space':
      space.classList.add('active');
      break;
  }
});

window.addEventListener('keyup', (event) => {
  for (let i = 0; i < keys.length; i++) {
    if (event.code === keys[i].dataset.key) {
      keys[i].classList.remove('active');
    }
  }

  for (let i = 0; i < spec_keys.length; i++) {
    spec_keys[i].classList.remove('clicked');
  }

  switch (event.code) {
    case 'Tab':
      tab.classList.remove('active');
      break;
    case 'CapsLock':
      for (let i = 0; i < keys.length; i++) {
        if (!capslock.classList.contains('active')) {
          keys[i].style['text-transform'] = 'none';
        }
      }
      break;
    case 'Backspace':
      backspace.classList.remove('active');
      break;
    case 'Enter':
      enter_key.classList.remove('active');
      break;
    case 'ShiftLeft':
    case 'ShiftRight':
      shift[0].classList.remove('active');
      shift[1].classList.remove('active');
      for (let i = 0; i < keys.length; i++) {
        keys[i].style['text-transform'] = 'none';
      }

      for (let i = 0; i < spec_keys.length; i++) {
        spec_keys[i].children[0].style.color = 'black';
        spec_keys[i].children[1].style.color = 'white';
      }
      break;
    case 'ControlLeft':
      bottom_key[0].classList.remove('active');
      break;
    case 'ControlRight':
      bottom_key[6].classList.remove('active');
      break;
    case 'MetaLeft':
    case 'MetaRight':
      bottom_key[1].classList.remove('active');
      bottom_key[4].classList.remove('active');
      break;
    case 'AltLeft':
      bottom_key[2].classList.remove('active');
      break;
    case 'AltRight':
      bottom_key[3].classList.remove('active');
      break;
    case 'ContextMenu':
      bottom_key[5].classList.remove('active');
      break;
    case 'Space':
      space.classList.remove('active');
      break;
  }
});
